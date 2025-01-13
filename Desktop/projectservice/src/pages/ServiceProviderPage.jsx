import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Map from "react-map-gl";

// Sample data for service providers
const serviceProviders = {
  plumber: [
    { name: "John Plumber", address: "123 Main St, City", rating: 4.5, distance: "2.5 km" },
    { name: "Emily Plumber", address: "456 Elm St, City", rating: 4.2, distance: "3.0 km" },
  ],
  doctor: [
    { name: "Dr. Smith", address: "123 Medical Ave, City", rating: 5.0, distance: "1.0 km" },
    { name: "Dr. Green", address: "456 Health Blvd, City", rating: 4.8, distance: "2.0 km" },
  ],
  carpenter: [
    { name: "Mike Carpenter", address: "123 Wood St, City", rating: 4.7, distance: "3.5 km" },
    { name: "Sarah Carpenter", address: "456 Timber Lane, City", rating: 4.3, distance: "4.0 km" },
  ],
  mechanic: [
    { name: "Tom Mechanic", address: "123 Auto Ave, City", rating: 4.6, distance: "2.8 km" },
    { name: "Anna Mechanic", address: "456 Garage St, City", rating: 4.4, distance: "3.2 km" },
  ],
};

const ServiceProviderPage = () => {
  const { service } = useParams(); // Get the service type from the URL
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check session on component mount
  useEffect(() => {
    fetch("http://localhost:8080/api/session-check", {
      method: "GET",
      credentials: "include", // Ensures cookies are sent with the request
    })
      .then(response => response.json())
      .then(data => {
        if (data.loggedIn) {
          setIsLoggedIn(true);
          // Populate the service providers based on the service type
          setProviders(serviceProviders[service] || []);
        } else {
          navigate("/login"); // Redirect to login if not logged in
        }
      })
      .catch(error => {
        console.error("Error checking session:", error);
        navigate("/login");
      });
  }, [service, navigate]);

  if (!isLoggedIn) {
    return <div>Loading...</div>; // Or you can show a loading spinner here
  }

  return (
    <div className="bg-gray-800 text-white min-h-screen flex">
      {/* Left Half of the Page (Map Section) */}
      <div className="w-1/2 h-screen">
        <Map
          initialViewState={{
            longitude: 72.8777,  // Longitude of Mumbai
            latitude: 19.0760,   // Latitude of Mumbai
            zoom: 12,            // Adjust the zoom level to show a larger area
          }}
          style={{ width: "100%", height: "100%" }}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        />
      </div>

      {/* Right Half of the Page (Service Provider Cards) */}
      <div className="w-1/2 px-6 py-12 overflow-y-auto">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-12">
          {"Near-By " + service.charAt(0).toUpperCase() + service.slice(1)} Providers
        </h2>

        {/* Service Provider Cards */}
        <div className="space-y-8">
          {providers.map((provider, index) => (
            <div
              key={index}
              className="bg-gray-700 p-6 rounded-lg shadow-lg cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-gray-600"
            >
              <h3 className="text-2xl font-bold text-white mb-4">{provider.name}</h3>
              <p className="text-gray-300">{provider.address}</p>
              <p className="text-yellow-500">Rating: {provider.rating} ★</p>
              <p className="text-gray-400">Distance: {provider.distance}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderPage;
