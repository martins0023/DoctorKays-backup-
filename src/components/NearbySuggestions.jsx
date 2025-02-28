import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const NearbySuggestions = () => {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("hospital");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User's Location:", { latitude, longitude });
        setLocation({ latitude, longitude });
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError("Unable to retrieve your location.");
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (location) {
      const fetchPlaces = async () => {
        try {
          const { latitude, longitude } = location;
          const url = `https://nominatim.openstreetmap.org/search?format=json&q=${selectedType}&lat=${latitude}&lon=${longitude}&radius=5000`;

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
  }, [location, selectedType]);

  return (
    <div className="p-6  rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Nearby Healthcare Providers</h2>

      <div className="mb-4">
        <label htmlFor="placeType" className="mr-2 font-medium">
          Search for:
        </label>
        <select
          id="placeType"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border rounded-3xl px-4 py-2  text-gray-700"
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
              className="p-4 border border-gray-700 rounded-lg shadow-sm flex justify-between items-center "
            >
              <div>
                <p className="font-medium ">{place.display_name}</p>
                <p className="text-sm text-gray-500">
                  Distance: {place.distance.toFixed(2)} km
                </p>
                <div className="mt-3">
                  <motion.a
                    href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" bg-purple-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-800 transition-transform transform hover:scale-105"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    View on Map
                  </motion.a>
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
