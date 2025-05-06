import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Ambulance,
  Pill,
  Stethoscope,
  TestTube,
  Phone,
  Search,
} from "lucide-react";

const FILTER_OPTIONS = [
  { type: "hospital", label: "Hospitals", Icon: Ambulance },
  { type: "pharmacy", label: "Pharmacies", Icon: Pill },
  { type: "clinic", label: "Clinics", Icon: Stethoscope },
  { type: "laboratory", label: "Laboratories", Icon: TestTube },
];

const MAPBOX_TOKEN = "pk.eyJ1Ijoia21jLWhvc3BpdGFsIiwiYSI6ImNtYWNpdG1jcTAzNDQyanNndnRqMHNjZ3YifQ.dRY5mBdlCvq-VcFakoa1HQ";

// Simple in-memory cache
const cache = {};

// Timeout wrapper
const fetchWithTimeout = (url, opts = {}, timeout = 8000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  return fetch(url, { ...opts, signal: controller.signal })
    .finally(() => clearTimeout(id));
};

// Nominatim fetch with custom User-Agent and timeout
const nominatimFetch = async (url) => {
  const headers = { "User-Agent": "NearbySuggestionsApp/1.0 (doctorkays.kmc.clinic@gmail.com)" };
  const response = await fetchWithTimeout(url, { headers });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
};

const NearbySuggestions = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("hospital");
  const [counts, setCounts] = useState({});
  const [customQuery, setCustomQuery] = useState("");
  const countsQueue = useRef([]);

  // Get user coords
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => setLocation({ latitude, longitude }),
      () => {
        setError("Unable to retrieve location.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  // Reverse geocode
  useEffect(() => {
    if (!location) return;
    const fetchAddress = async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}`;
        const data = await nominatimFetch(url);
        const isUK = data.address?.country === "United Kingdom";
        if (isUK) {
          const ipData = await fetchWithTimeout("https://ipapi.co/json/", {}, 8000).then(r => r.json());
          setAddress({ state: ipData.region || "", country: ipData.country_name || "" });
        } else {
          setAddress({ state: data.address?.state || data.address?.county || "", country: data.address?.country || "" });
        }
      } catch (e) {
        console.warn("Reverse geocode failed, falling back to IP.", e);
        try {
          const ipData = await fetchWithTimeout("https://ipapi.co/json/", {}, 8000).then(r => r.json());
          setAddress({ state: ipData.region || "", country: ipData.country_name || "" });
        } catch (ipErr) {
          setError("Unable to determine address.");
        }
      }
    };
    fetchAddress();
  }, [location]);

  // Calculate distance (Haversine)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  // Fetch counts with rate limiting
  useEffect(() => {
    if (!(location && address)) return;
    let delay = 0;
    FILTER_OPTIONS.forEach(({ type }) => {
      countsQueue.current.push(type);
      setTimeout(async () => {
        try {
          const viewbox = `${location.longitude - 0.1},${location.latitude - 0.1},${location.longitude + 0.1},${location.latitude + 0.1}`;
          const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            `${type} in ${address.state}, ${address.country}`
          )}&viewbox=${viewbox}&bounded=1&limit=50`;
          const data = await nominatimFetch(url).catch(() => []);
          setCounts(prev => ({ ...prev, [type]: Array.isArray(data) ? data.length : 0 }));
        } catch {}
      }, delay);
      delay += 1100;
    });
  }, [location, address]);

  // Fetch places (filter or custom)
  useEffect(() => {
    if (!(location && address)) return;
    setLoading(true);
    const queryKey = customQuery.trim() || `${selectedType} in ${address.state}, ${address.country}`;
    const viewbox = `${location.longitude - 0.1},${location.latitude - 0.1},${location.longitude + 0.1},${location.latitude + 0.1}`;
    const cacheKey = `${queryKey}|${viewbox}`;

    const fetchPlaces = async () => {
      try {
        let data;
        if (cache[cacheKey]) {
          data = cache[cacheKey];
        } else {
          const url = `https://nominatim.openstreetmap.org/search?format=json&extratags=1&q=${encodeURIComponent(
            queryKey
          )}&viewbox=${viewbox}&bounded=1&limit=50`;
          data = await nominatimFetch(url).catch(() => []);
          cache[cacheKey] = data;
        }
        const enriched = Array.isArray(data)
          ? data.map(p => ({
              ...p,
              distance: calculateDistance(
                location.latitude,
                location.longitude,
                parseFloat(p.lat),
                parseFloat(p.lon)
              ),
              phone: p.extratags?.phone || p.extratags?.["contact:phone"] || p.extratags?.["contact:telephone"] || null,
            }))
          : [];
        enriched.sort((a, b) => a.distance - b.distance);
        setPlaces(enriched);
      } catch {
        setError("Error fetching places.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, [location, address, selectedType, customQuery]);

  return (
    <div className="p-6 mt-5 rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-bold mb-4 text-black">Nearby Healthcare Providers</h2>
      <div className="mb-4 p-2 rounded text-white bg-gray-500 font-light text-sm w-fit">
        {address ? `You are in ${address.state}, ${address.country}` : "Fetching your address..."}
      </div>

      {/* Custom Search */}
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Search custom place..."
          className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none"
          value={customQuery}
          onChange={e => setCustomQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && setSelectedType("")}
        />
        <button
          onClick={() => setSelectedType("")}
          className="flex items-center justify-center bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {FILTER_OPTIONS.map(({ type, label, Icon }) => (
          <div
            key={type}
            onClick={() => { setSelectedType(type); setCustomQuery(""); }}
            className={`flex flex-col items-center p-4 rounded-xl cursor-pointer transition-shadow duration-200 ${
              selectedType === type && !customQuery ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:shadow'
            }`}
          >
            <Icon className="w-6 h-6 mb-2" />
            <span className="font-medium text-sm">{label}</span>
            <span className="mt-1 text-xs">{counts[type] ?? 0} listings</span>
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p className="text-gray-600">Loading nearby providers...</p>
      ) : places.length > 0 ? (
        <ul className="space-y-4">
          {places.map((place, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-4 border border-gray-200 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              {/* Image Preview */}
              <img
                src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+555555(${place.lon},${place.lat})/${place.lon},${place.lat},15,0/200x100?access_token=${MAPBOX_TOKEN}`}
                alt="Map Preview"
                className="w-full md:w-48 h-24 object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
              />

              {/* Text Info */}
              <div className="flex-grow">
                <p className="font-medium text-gray-800">{place.display_name}</p>
                <p className="text-sm text-gray-500">Distance: {place.distance.toFixed(2)} km</p>
                {place.phone && <p className="text-sm text-gray-600 mt-1">📞 {place.phone}</p>}
              </div>

              {/* Action Buttons */}
              <div className="flex mt-3 md:mt-0 md:ml-4 space-x-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-purple-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-purple-700 transition-transform transform hover:scale-105"
                >View</a>
                {place.phone && (
                  <a
                    href={`tel:${place.phone}`}
                    className="flex items-center bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition-transform transform hover:scale-105"
                  >
                    <Phone className="w-4 h-4 mr-1" />Call
                  </a>
                )}
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
