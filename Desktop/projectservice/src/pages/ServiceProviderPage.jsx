import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const ServiceProviderPage = () => {
  const { service } = useParams(); // Get the service type from the URL
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const email = localStorage.getItem("userEmail")
  useEffect(() => {
    // Fetch service providers from the backend
    const fetchProviders = async () => {
      console.log("customer: "+email);
      try {
        const response = await fetch(
          `http://localhost:8080/api/service-providers?service=${service}`,
          { method: "GET", credentials: "include" }
        );
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

    // Initialize WebSocket connection using SockJS
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"), // SockJS WebSocket endpoint
      connectHeaders: {
        "user-email": email, // 🔥 Customer's email sent in the header
      },
      debug: (msg) => console.log("STOMP Debug:", msg),
      onConnect: () => {
        console.log("STOMP connection established");
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers["message"]);
        console.error("Additional details:", frame.body);
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error:", error);
      },
      onWebSocketClose: () => {
        console.log("WebSocket connection closed");
      },
    });

    client.activate();
    setStompClient(client);

    // Cleanup WebSocket connection when the component unmounts
    return () => {
      client.deactivate();
    };
  }, [service]);

  const handleContactClick = (provider) => {
    setSelectedProvider(provider);
    setShowPopup(true);
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    if (stompClient && stompClient.connected) {
      const payload = {
        providerEmail: selectedProvider.email, // Provider's email
        message, // Message content
      };
      console.log(payload);
      stompClient.publish({
        destination: "/app/send-message",
        body: JSON.stringify(payload),
      });

      console.log(`Message sent to ${selectedProvider.email}:`, message);

      // Close the popup and reset the message
      setShowPopup(false);
      setMessage("");
    } else {
      alert("STOMP connection is not open. Please try again later.");
    }
  };

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
          {Array.isArray(providers) &&
            providers.map((provider, index) => (
              <Marker
                key={index}
                longitude={provider.longitude}
                latitude={provider.latitude}
                anchor="bottom"
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
                <div className="mt-4">
                  <button
                    className="bg-yellow-500 text-gray-800 py-2 px-4 rounded-md font-semibold shadow-md hover:bg-yellow-400 transition-all duration-300"
                    onClick={() => handleContactClick(provider)}
                  >
                    Contact Provider
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Popup Window */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">
              Send a message to {selectedProvider.fname} {selectedProvider.lname}
            </h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows="4"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="bg-yellow-500 text-gray-800 py-2 px-4 rounded-md font-semibold shadow-md hover:bg-yellow-400"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceProviderPage;
