import React, { useState, useEffect } from "react";

const NearbySuggestions = () => {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  // Get user location on component mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (err) => {
        setError("Unable to retrieve your location.");
        console.error(err);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // Fetch nearby places once location is available
  useEffect(() => {
    if (location) {
      const fetchPlaces = async () => {
        try {
          const { latitude, longitude } = location;
          const radius = 5000; // in meters
          const type = "pharmacy"; // you can change or loop through types (clinic, laboratory)
          const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
          const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;
          
          // Note: Due to CORS restrictions, you might need a server-side proxy or use a library that supports JSONP.
          const response = await fetch(url);
          const data = await response.json();
          setPlaces(data.results);
        } catch (err) {
          console.error("Error fetching places:", err);
          setError("Error fetching places.");
        }
      };

      fetchPlaces();
    }
  }, [location]);

  return (
    <div className="p-6 bg-gray-100 rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Nearby Healthcare Providers</h2>
      {error && <p className="text-red-500">{error}</p>}
      {places.length > 0 ? (
        <ul>
          {places.map((place) => (
            <li key={place.place_id} className="mb-3">
              <p className="font-medium">{place.name}</p>
              <p className="text-sm text-gray-600">{place.vicinity}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Loading nearby providers...</p>
      )}
    </div>
  );
};

export default NearbySuggestions;
