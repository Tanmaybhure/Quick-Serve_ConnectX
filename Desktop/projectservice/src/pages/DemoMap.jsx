import React from 'react';
import Map from 'react-map-gl';

const DemoMap = () => {
  const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  if (!mapboxAccessToken) {
    return <div>Mapbox access token is missing or invalid.</div>;
  }

  return (
    <Map
      initialViewState={{
        longitude: 72.85731,  // Longitude of Mumbai
        latitude: 19.12872,   // Latitude of Mumbai
        zoom: 15, 
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapboxAccessToken={mapboxAccessToken}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onError={(error) => {
        console.error("Map error:", error);
      }}
    />
  );
};

export default DemoMap;
