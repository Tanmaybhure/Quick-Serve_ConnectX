import React, { useState, useEffect } from 'react';
import { Map, useMap } from 'react-map-gl';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const DemoMap = () => {
  const navigate = useNavigate();
  const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const location= useLocation();
  const { email } = location.state || {};
  // State to store the center latitude and longitude
  const [centerLocation, setCenterLocation] = useState({
    lat: 19.12826639470724, // Initial latitude of Mumbai
    lng: 72.8437387217702,  // Initial longitude of Mumbai
  });

  if (!mapboxAccessToken) {
    return <div>Mapbox access token is missing or invalid.</div>;
  }

  // Update the center location when the map moves
  const handleMapMove = ({ viewState }) => {
    const { latitude, longitude } = viewState;
    setCenterLocation({ lat: latitude, lng: longitude });
  };

  // Handle the submit action to send the center latitude and longitude to the backend
  const handleSubmit = async () => {
    if (centerLocation) {
      try {
        const response = await fetch('http://localhost:8080/api/service-provider-location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            latitude: centerLocation.lat,
            longitude: centerLocation.lng,
          }),
        });

        const data = await response.json();
        console.log('Location saved:', data);
        alert('Location saved successfully!');
        navigate("/servicelogin")
      } catch (error) {
        console.error('Error sending location to backend:', error);
        alert('Failed to save location');
      }
    }
  };

  return (
    <div>
      <Map
        initialViewState={{
          longitude: centerLocation.lng,
          latitude: centerLocation.lat,
          zoom: 15,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapboxAccessToken={mapboxAccessToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onMove={handleMapMove} // Updating the center location on move
        onError={(error) => {
          console.error("Map error:", error);
        }}
      >
        {/* Center pin: A custom marker at the center of the map */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -100%)', // Adjust for pin positioning
            backgroundColor: 'green',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            border: '2px solid white',
            pointerEvents: 'none', // Prevent interaction with the pin
          }}
        />
      </Map>

      {/* Button to submit the center location */}
      <div className="absolute top-10 left-10 bg-white p-4 rounded shadow">
        <button
          onClick={handleSubmit}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full shadow-xl transition"
        >
          Submit Location
        </button>
      </div>
    </div>
  );
};

export default DemoMap;
