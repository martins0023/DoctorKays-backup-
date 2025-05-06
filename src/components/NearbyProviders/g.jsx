import React, { useState, useEffect } from "react";
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
      <button
        onClick={locateUser}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Find Nearby Providers
      </button>

      <div className="mb-4">
        <label className="block mb-1">Or enter city/ZIP:</label>
        <input
          value={manualLoc}
          onChange={e => setManualLoc(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {loading && <p>Loading…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && places.length === 0 && <p>No results</p>}

      <ul className="space-y-4">
        {places.map((place, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{place.display_name}</p>
              <p className="text-sm text-gray-600">
                {place.distance.toFixed(2)} km away
              </p>
              {place.phone && (
                <p className="text-sm">📞 {place.phone}</p>
              )}
            </div>
            <div className="space-x-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 text-white px-3 py-1 rounded"
              >
                View
              </a>
              {place.phone && (
                <a
                  href={`tel:${place.phone}`}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  <Phone className="w-4 h-4 inline-block" /> Call
                </a>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
