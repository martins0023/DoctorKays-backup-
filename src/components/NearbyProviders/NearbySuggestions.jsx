// File: components/NearbySuggestions.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Ambulance,
  Pill,
  Stethoscope,
  TestTube,
  Phone,
  Search,
  MapPin,
} from "lucide-react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

const FILTER_OPTIONS = [
  { type: "hospital", label: "Hospitals", Icon: Ambulance },
  { type: "pharmacy", label: "Pharmacies", Icon: Pill },
  { type: "clinic", label: "Clinics", Icon: Stethoscope },
  { type: "laboratory", label: "Laboratories", Icon: TestTube },
];

const cache = {};
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const containerStyle = { width: "100%", height: "400px" };

export default function NearbySuggestions() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [fullAddress, setFullAddress] = useState("");      // << new
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("hospital");
  const [counts, setCounts] = useState({});
  const [customQuery, setCustomQuery] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapRef = useRef(null);
  const placesServiceRef = useRef(null);
  const autocompleteRef = useRef(null);

  const findNearby = () => {
    setError("");
    setLoading(true);
    let resolved = false;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          if (!resolved) {
            resolved = true;
            setLocation({ lat: coords.latitude, lng: coords.longitude });
          }
        },
        () => {},
        { enableHighAccuracy: true, timeout: 7000 }
      );
    }
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        if (!resolved) {
          resolved = true;
          setLocation({ lat: data.latitude, lng: data.longitude });
        }
      })
      .catch(() => {
        if (!resolved) {
          setError("Unable to determine location.");
          setLoading(false);
        }
      });
  };

  // Reverse‐geocode to get full formatted_address + a quick region/country for filter hints
  useEffect(() => {
    if (!location || mapLoaded === false) return;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        setFullAddress(results[0].formatted_address);           // << new
        const comps = results[0].address_components;
        const state = comps.find(c => c.types.includes("administrative_area_level_1"))?.long_name;
        const country = comps.find(c => c.types.includes("country"))?.long_name;
        setAddress({ state: state || "", country: country || "" });
      }
    });
  }, [location, mapLoaded]);

  const handleMapLoad = useCallback((map) => {
    mapRef.current = map;
    placesServiceRef.current = new window.google.maps.places.PlacesService(map);
    setMapLoaded(true);
  }, []);

  const handleAutocompleteLoad = (ac) => {
    autocompleteRef.current = ac;
  };

  const handlePlaceSelect = () => {
    const ac = autocompleteRef.current;
    if (!ac) return;
    const place = ac.getPlace();
    if (place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setLocation({ lat, lng });
      if (mapRef.current) {
        mapRef.current.setCenter({ lat, lng });
        mapRef.current.setZoom(14);
      }
    }
  };

  useEffect(() => {
    if (!location || !placesServiceRef.current || !mapLoaded) return;
    setLoading(true);
    setError("");

    const queryKey = customQuery.trim() || selectedType;
    const cacheKey = `${queryKey}|${location.lat},${location.lng}`;
    if (cache[cacheKey]) {
      setPlaces(cache[cacheKey]);
      setLoading(false);
      return;
    }

    const request = {
      location: new window.google.maps.LatLng(location.lat, location.lng),
      radius: 5000,
      keyword: customQuery || undefined,
      type: customQuery ? undefined : selectedType,
    };

    placesServiceRef.current.nearbySearch(request, (results, status) => {
      if (
        status ===
          window.google.maps.places.PlacesServiceStatus.OK &&
        results
      ) {
        // fetch photos + details
        const detailPromises = results.map((r) =>
          new Promise((resolve) => {
            placesServiceRef.current.getDetails(
              {
                placeId: r.place_id,
                fields: [
                  "name",
                  "formatted_address",
                  "formatted_phone_number",
                  "rating",
                  "opening_hours",
                  "website",
                  "geometry",
                  "photos",                           // << added
                ],
              },
              (detailedPlace, detailStatus) => {
                // distance calc (Haversine) omitted for brevity
                const toRad = x => (x * Math.PI) / 180;
                const R = 6371;
                const dLat = toRad(detailedPlace.geometry.location.lat() - location.lat);
                const dLon = toRad(detailedPlace.geometry.location.lng() - location.lng);
                const a = Math.sin(dLat/2)**2 +
                          Math.cos(toRad(location.lat)) *
                          Math.cos(toRad(detailedPlace.geometry.location.lat())) *
                          Math.sin(dLon/2)**2;
                const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

                resolve({
                  ...r,
                  ...detailedPlace,
                  distance,
                  distanceText: `${distance.toFixed(2)} km`,
                });
              }
            );
          })
        );

        Promise.all(detailPromises).then((enriched) => {
          enriched.sort((a, b) => a.distance - b.distance);
          cache[cacheKey] = enriched;
          setPlaces(enriched);

          const newCounts = {};
          FILTER_OPTIONS.forEach(({ type }) => {
            newCounts[type] = results.filter(r => r.types.includes(type)).length;
          });
          setCounts(newCounts);
          setLoading(false);
        });
      } else {
        setError("No places found nearby.");
        setPlaces([]);
        setLoading(false);
      }
    });
  }, [location, selectedType, customQuery, mapLoaded]);

  const estimateTravelTime = (distKm) => {
    const hrs = distKm / 30;
    if (hrs < 1/60) return "less than a minute";
    if (hrs < 1) return `${Math.round(hrs*60)} min`;
    return `${Math.floor(hrs)} hr ${Math.round((hrs%1)*60)} min`;
  };

  return (
    <div className="p-6 rounded-lg shadow-sm bg-white font-sans">
      <h2 className="text-2xl font-bold mb-4 text-black">
        Nearby Healthcare Providers
      </h2>

      {/* show the full street+city+region address now */}
      <div className="mb-4 p-2 rounded text-white bg-gray-500 font-light text-sm w-fit">
        {fullAddress || "Click 'Find Nearby' to locate you"}
      </div>

      <div className="mb-4 flex">
        <button
          onClick={findNearby}
          className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <MapPin className="w-5 h-5 animate-pulse" />
          <span>Find Nearby</span>
        </button>
      </div>

      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
        <div className="mb-4 flex flex-col sm:flex-row w-full sm:gap-0 gap-2">
          <Autocomplete
            onLoad={handleAutocompleteLoad}
            onPlaceChanged={handlePlaceSelect}
            options={{
              types: ["establishment"],
              componentRestrictions: {
                country: address?.country?.toLowerCase(),
              },
            }}
          >
            <input
              type="text"
              placeholder="Search for hospitals, clinics, pharmacies..."
              className="w-full sm:flex-grow border text-black border-gray-300 rounded-2xl sm:rounded-l-lg sm:rounded-r-none px-4 py-2 focus:outline-none"
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              onKeyDown={(e) => e.key==="Enter" && setSelectedType("")}
            />
          </Autocomplete>
          <button
            onClick={() => setSelectedType("")}
            className="w-full sm:w-auto flex items-center justify-center bg-gradient-to-l from-fuchsia-900 to-purple-500 text-white px-4 py-2 rounded-2xl sm:rounded-r-lg sm:rounded-l-none hover:bg-purple-700 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {FILTER_OPTIONS.map(({ type, label, Icon }) => (
            <div
              key={type}
              onClick={() => { setSelectedType(type); setCustomQuery(""); }}
              className={`flex flex-col items-center p-4 rounded-xl cursor-pointer transition-shadow duration-200 ${
                selectedType===type && !customQuery
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:shadow-lg"
              }`}
            >
              <Icon className="w-6 h-6 mb-2" />
              <span className="font-medium text-sm">{label}</span>
              {/* <span className="mt-1 text-xs">{counts[type] ?? 0} listings</span> */}
            </div>
          ))}
        </div>

        {/* map */}
        {location && (
          <div className="w-full h-80 mb-6 rounded-lg overflow-hidden">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={location}
              zoom={14}
              onLoad={handleMapLoad}
            >
              <Marker position={location} icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                }}
              />
              {places.map((place, idx) => (
                <Marker
                  key={idx}
                  position={{
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                  }}
                  title={place.name}
                />
              ))}
            </GoogleMap>
          </div>
        )}

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? (
          <p className="text-gray-600">Loading nearby providers…</p>
        ) : places.length ? (
          <ul className="space-y-4">
            {places.map((place, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-4 border border-gray-200 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                {/* real place photo if available, else fallback to static map */}
                <div className="w-full md:w-48 h-24 rounded-lg mb-4 md:mb-0 md:mr-4 overflow-hidden">
                  {place.photos?.length ? (
                    <img
                      src={place.photos[0].getUrl({ maxWidth: 200, maxHeight: 100 })}
                      alt={place.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={`https://maps.googleapis.com/maps/api/staticmap?center=${place.geometry.location.lat()},${place.geometry.location.lng()}&zoom=15&size=200x100&markers=color:red%7C${place.geometry.location.lat()},${place.geometry.location.lng()}&key=${GOOGLE_MAPS_API_KEY}`}
                      alt="Map Preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* info */}
                <div className="flex-grow">
                  <p className="font-medium text-gray-800">{place.name}</p>
                  <p className="text-sm text-gray-500">
                    {place.formatted_address || place.vicinity}
                  </p>
                  <div className="flex flex-col mt-1">
                    <p className="text-sm text-gray-600">
                      <strong>Distance:</strong> {place.distanceText}{" "}
                      <span className="ml-2 text-gray-500">
                        (Est. {estimateTravelTime(place.distance)})
                      </span>
                    </p>
                    {place.rating && (
                      <p className="text-sm text-gray-600">
                        <strong>Rating:</strong> {place.rating} ⭐
                      </p>
                    )}
                    {place.formatted_phone_number && (
                      <p className="text-sm text-gray-600">
                        <strong>Phone:</strong> {place.formatted_phone_number}
                      </p>
                    )}
                    {place.opening_hours && (
                      <p className="text-sm text-gray-600">
                        <strong>Status:</strong>{" "}
                        {place.opening_hours.open_now ? "Open now" : "Closed"}
                      </p>
                    )}
                  </div>
                </div>

                {/* actions */}
                <div className="flex mt-3 md:mt-0 md:ml-4 space-x-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat()},${place.geometry.location.lng()}&query_place_id=${place.place_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-purple-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-purple-700 transition-transform transform hover:scale-105"
                  >
                    View
                  </a>
                  {place.formatted_phone_number && (
                    <a
                      href={`tel:${place.formatted_phone_number}`}
                      className="flex items-center bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition-transform transform hover:scale-105"
                    >
                      <Phone className="w-4 h-4 mr-1" /> Call
                    </a>
                  )}
                  {place.website && (
                    <a
                      href={place.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-transform transform hover:scale-105"
                    >
                      Website
                    </a>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No healthcare providers found nearby...</p>
        )}
      </LoadScript>
    </div>
  );
}
