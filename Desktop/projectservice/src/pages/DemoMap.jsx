import React, { useState } from 'react';
import { Map, Marker } from 'react-map-gl';

const DemoMap = () => {
  const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  // State to store the selected latitude and longitude
  const [selectedLocation, setSelectedLocation] = useState(null);

  if (!mapboxAccessToken) {
    return <div>Mapbox access token is missing or invalid.</div>;
  }

  // Handle the map click event to capture the latitude and longitude
  const handleMapClick = (event) => {
    const { lngLat } = event;
    const { lat, lng } = lngLat;
    setSelectedLocation({ lat, lng });
  };

  // Handle the submit action to send the selected latitude and longitude to the backend
  const handleSubmit = async () => {
    if (selectedLocation) {
      try {
        const response = await fetch('http://localhost:8080/api/service-provider-location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }),
        });

        const data = await response.json();
        console.log('Location saved:', data);
        alert('Location saved successfully!');
      } catch (error) {
        console.error('Error sending location to backend:', error);
        alert('Failed to save location');
      }
    } else {
      alert('Please select a location on the map first!');
    }
  };

  return (
    <div>
      <Map
        initialViewState={{
          longitude: 72.8437387217702,  // Longitude of Mumbai
          latitude: 19.12826639470724,   // Latitude of Mumbai
          zoom: 15,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapboxAccessToken={mapboxAccessToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onClick={handleMapClick} // Adding the onClick handler
        onError={(error) => {
          console.error("Map error:", error);
        }}
      >
        {/* Place the marker on the map if a location is selected */}
        {selectedLocation && (
          <Marker latitude={selectedLocation.lat} longitude={selectedLocation.lng}>
            {/* Custom Marker: Red Circle */}
            <div style={{
              backgroundColor: 'green',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: '2px solid white',  // Optional, for a better marker look
            }} />
          </Marker>
        )}
      </Map>

      {/* Button to submit selected location */}
      <div className="absolute top-10 left-10 bg-white p-4 rounded shadow">
        <button
          onClick={handleSubmit}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full shadow-xl transition"
        >
          Submit Location
        </button>
      </div>

      {/* Display the selected latitude and longitude */}
      {/* {selectedLocation && (
        <div className="absolute top-20 left-10 bg-white p-4 rounded shadow">
          <p><strong>Latitude:</strong> {selectedLocation.lat}</p>
          <p><strong>Longitude:</strong> {selectedLocation.lng}</p>
        </div>
      )} */}
    </div>
  );
};

export default DemoMap;
