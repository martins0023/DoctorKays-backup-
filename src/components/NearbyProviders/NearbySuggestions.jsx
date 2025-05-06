import React, { useState, useEffect } from "react";
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

const FILTER_OPTIONS = [
  { type: "hospital", label: "Hospitals", Icon: Ambulance },
  { type: "pharmacy", label: "Pharmacies", Icon: Pill },
  { type: "clinic", label: "Clinics", Icon: Stethoscope },
  { type: "laboratory", label: "Laboratories", Icon: TestTube },
];

const MAPBOX_TOKEN = "pk.eyJ1Ijoia21jLWhvc3BpdGFsIiwiYSI6ImNtYWNpdG1jcTAzNDQyanNndnRqMHNjZ3YifQ.dRY5mBdlCvq-VcFakoa1HQ";

// Simple in-memory cache
const cache = {};


export default function NearbySuggestions() {
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState(null);
  const [manualLoc, setManualLoc] = useState("");
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("hospital");

  // Kick off both browser geolocation and IP-based lookup in parallel
  const locateUser = () => {
    setLoading(true);
    setError("");
    let got = false;

    // 1. Browser geolocation (may fail under VPN) :contentReference[oaicite:5]{index=5}
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          if (!got) {
            got = true;
            setCoords({ lat: coords.latitude, lon: coords.longitude });
          }
        },
        () => {}, // failure is okay
        { enableHighAccuracy: true, timeout: 7000 }
      );
    }

    // 2. IP-based fallback (always runs) :contentReference[oaicite:6]{index=6}
    fetch("https://ipapi.co/json/")
      .then(r => r.json())
      .then((data) => {
        if (!got) {
          got = true;
          setCoords({ lat: data.latitude, lon: data.longitude });
          setAddress({ state: data.region, country: data.country_name });
        }
      })
      .catch(() => {
        // network failure
      });
  };

  // Reverse-geocode whenever coords are known
  useEffect(() => {
    if (!coords || address) return;
    // Nominatim reverse lookup with User-Agent header
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lon}`, {
      headers: { "User-Agent": "NearbyApp/1.0 (contact@doctorkays.com)" },
    })
      .then(r => r.json())
      .then(data => {
        setAddress({
          state: data.address.state || data.address.county,
          country: data.address.country,
        });
      })
      .catch(() => {
        // if that fails, leave IP address
      });
  }, [coords, address]);

  // Fetch places once we have either coords+address or manualLoc
  useEffect(() => {
    const query = manualLoc
      ? manualLoc
      : coords && address
      ? `${selectedType} in ${address.state}, ${address.country}`
      : null;

    if (!query) return;

    // Simple rate limit of 1 rps
    const timer = setTimeout(() => {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&extratags=1&limit=50&q=${encodeURIComponent(query)}`, {
        headers: { "User-Agent": "NearbyApp/1.0 (contact@doctorkays.com)" },
      })
        .then(r => r.json())
        .then(data =>
          setPlaces(
            data
              .map(p => ({
                ...p,
                distance: haversine(coords, p),
                phone: p.extratags?.phone || p.extratags?.["contact:phone"] || null,
              }))
              .sort((a, b) => a.distance - b.distance)
          )
        )
        .catch(() => setError("Failed to fetch places"))
        .finally(() => setLoading(false));
    }, 1000);

    return () => clearTimeout(timer);
  }, [coords, address, manualLoc, selectedType]);

  // Haversine formula
  const haversine = (user, p) => {
    const R = 6371;
    const dLat = ((p.lat - user.lat) * Math.PI) / 180;
    const dLon = ((p.lon - user.lon) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((user.lat * Math.PI) / 180) *
        Math.cos((p.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-black">
        Nearby Healthcare Providers
      </h2>
      <div className="mb-4 p-2 rounded text-white bg-gray-500 font-light text-sm w-fit">
        {address
          ? `You are in ${address.state}, ${address.country}`
          : "Click 'Find Nearby' to locate you"}
      </div>

      {/* Find Nearby */}
      <div className="mb-4 flex">
        <button
          onClick={locateUser}
          className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          <MapPin className="w-5 h-5 animate-pulse" />
          <span>Find Nearby</span>
        </button>
      </div>

      <div className="mb-4">
        <input
          value={manualLoc}
          onChange={e => setManualLoc(e.target.value)}
          className="w-full border px-3 py-2 rounded-full"
          placeholder="Or enter a city, ZIP code... "
        />
      </div>

      {loading && <p>Loading…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && places.length === 0 && <p>No results</p>}

      <ul className="space-y-4">
        {places.map((place, i) => (
          <motion.li
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
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
            <p className="font-medium text-gray-800">
              {place.display_name}
            </p>
            <p className="text-sm text-gray-500">
              Distance: {place.distance.toFixed(2)} km
            </p>
            {place.phone && (
              <p className="text-sm text-gray-600 mt-1">📞 {place.phone}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex mt-3 md:mt-0 md:ml-4 space-x-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-purple-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-purple-700 transition-transform transform hover:scale-105"
            >
              View
            </a>
            {place.phone && (
              <a
                href={`tel:${place.phone}`}
                className="flex items-center bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition-transform transform hover:scale-105"
              >
                <Phone className="w-4 h-4 mr-1" />
                Call
              </a>
            )}
          </div>
        </motion.li>
        ))}
      </ul>
    </div>
  );
}
