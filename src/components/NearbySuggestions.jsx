import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NearbySuggestions = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null); // To store state and country info
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("hospital");

  // Get user's location using Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("User's Coordinates:", { latitude, longitude });
          setLocation({ latitude, longitude });
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Unable to retrieve your location.");
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  // Reverse geocode to get state and country info
  useEffect(() => {
    const getAddress = async (lat, lon) => {
      try {
        const reverseUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
        const res = await fetch(reverseUrl);
        const data = await res.json();
        console.log("Reverse geocode data:", data);
        if (data && data.address) {
          // Check if the returned country is unexpectedly UK
          if (data.address.country === "United Kingdom") {
            // Fallback: Use ip-based geolocation via ipapi
            console.log("Fallback: using IP-based location");
            const ipRes = await fetch("https://ipapi.co/json/");
            const ipData = await ipRes.json();
            setAddress({
              state: ipData.region || "",
              country: ipData.country_name || "",
            });
          } else {
            setAddress({
              state: data.address.state || data.address.county || "",
              country: data.address.country || "",
            });
          }
        }
      } catch (err) {
        console.error("Reverse geocode error:", err);
      }
    };

    if (location) {
      const { latitude, longitude } = location;
      getAddress(latitude, longitude);
    }
  }, [location]);

  // Haversine formula to calculate distance between coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Fetch places using a query that includes state and country info
  useEffect(() => {
    if (location && address) {
      const fetchPlaces = async () => {
        try {
          const { latitude, longitude } = location;
          // Use a viewbox offset to limit the search area
          const offset = 0.1;
          const viewbox = `${longitude - offset},${latitude - offset},${longitude + offset},${latitude + offset}`;
          // Build a specific query, e.g., "hospital in [State], [Country]"
          const query = `${selectedType} in ${address.state}, ${address.country}`;
          const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&viewbox=${viewbox}&bounded=1`;
          console.log("Fetching places from:", url);
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log("Raw data received:", data);
          if (Array.isArray(data) && data.length > 0) {
            const enrichedPlaces = data.map((place) => ({
              ...place,
              distance: calculateDistance(
                latitude,
                longitude,
                parseFloat(place.lat),
                parseFloat(place.lon)
              ),
            }));
            enrichedPlaces.sort((a, b) => a.distance - b.distance);
            setPlaces(enrichedPlaces);
          } else {
            setPlaces([]);
          }
        } catch (err) {
          console.error("Error fetching places:", err);
          setError("Error fetching places.");
        } finally {
          setLoading(false);
        }
      };
      fetchPlaces();
    }
  }, [location, address, selectedType]);

  return (
    <div className="p-6 rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Nearby Healthcare Providers</h2>

      {/* Display user location info */}
      <div className="mb-4 p-2 border rounded bg-gray-100">
        {address
          ? `You are in ${address.state}, ${address.country}`
          : "Fetching your address..."}
      </div>

      <div className="mb-4">
        <label htmlFor="placeType" className="mr-2 font-medium">
          Search for:
        </label>
        <select
          id="placeType"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border border-gray-700 rounded-3xl px-4 py-2 text-gray-700"
        >
          <option value="hospital">Hospitals</option>
          <option value="pharmacy">Pharmacies</option>
          <option value="clinic">Clinics</option>
          <option value="laboratory">Laboratories</option>
        </select>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-gray-600">Loading nearby providers...</p>
      ) : places.length > 0 ? (
        <ul className="space-y-4">
          {places.map((place, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-4 border border-gray-700 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{place.display_name}</p>
                <p className="text-sm text-gray-500">
                  Distance: {place.distance.toFixed(2)} km
                </p>
                <div className="mt-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-800 transition-transform transform hover:scale-105"
                  >
                    View on Map
                  </a>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No healthcare providers found nearby...</p>
      )}
    </div>
  );
};

export default NearbySuggestions;
