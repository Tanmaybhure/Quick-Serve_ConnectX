import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css'; 

const ServiceProviderPage = () => {
  const { service } = useParams(); // Get the service type from the URL
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userLatitude= localStorage.getItem("userLatitude")
  const userLongitude= localStorage.getItem("userLongitude")
  localStorage.removeItem("userLatitude")
  localStorage.removeItem("userLongitude")
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/service-providers?service=${service}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (Array.isArray(data)) {
          setProviders(data);
        } else {
          console.error("Fetched data is not an array", data);
        }
      } catch (error) {
        console.error("Error fetching service providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [service]);

  if (loading) {
    return <div className="text-center text-white">Loading service providers...</div>;
  }

  return (
    <div className="bg-gray-800 text-white min-h-screen flex">
      {/* Left Half: Map Section */}
      <div className="w-1/2 h-screen">
        <Map
          initialViewState={{
            longitude: 73.9115008,
            latitude: 18.5499648,
            zoom: 15,
          }}
          style={{ width: "100%", height: "100%" }}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Marker
            longitude={73.911}
            latitude={18.549}
            anchor="center"
          >
            <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "blue",
                  borderRadius: "50%", // Makes it a circle
                }}
              />
          </Marker>
          {/* Custom Red Dot Marker */}
          {Array.isArray(providers) && providers.map((provider, index) => (
            <Marker
                key={index}
                longitude={provider.longitude}
                latitude={provider.latitude}
                anchor="bottom" // Ensures the marker stays at its location relative to the map
              >
                <div className="text-lg text-blue-500">📍</div> 
              </Marker>
          ))}
        </Map>
      </div>

      {/* Right Half: Service Provider Cards */}
      <div className="w-1/2 px-6 py-12 overflow-y-auto">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-12">
          {"Nearby " + service.charAt(0).toUpperCase() + service.slice(1)} Providers
        </h2>

        <div className="space-y-8">
          {Array.isArray(providers) &&
            providers.map((provider, index) => (
              
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-2xl transform transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold text-yellow-500">First Name:</span> {provider.fname}
                </p>
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold text-yellow-500">Last Name:</span> {provider.lname}
                </p>
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold text-yellow-500">Email:</span> {provider.email}
                </p>
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold text-yellow-500">Service:</span> {provider.service}
                </p>
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold text-yellow-500">Distance:</span> {provider.distance}
                </p>
                <div className="mt-4">
                  <button className="bg-yellow-500 text-gray-800 py-2 px-4 rounded-md font-semibold shadow-md hover:bg-yellow-400 transition-all duration-300">
                    Contact Provider
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderPage;
