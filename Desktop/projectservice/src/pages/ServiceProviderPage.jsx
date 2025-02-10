import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const CustomerPage = () => {
  const { service } = useParams();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [responsePopup, setResponsePopup] = useState(null);
  const [finalPopup, setFinalPopup] = useState(null);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/service-providers?service=${service}`,
          { method: "GET", credentials: "include" }
        );
        const data = await response.json();
        if (Array.isArray(data)) setProviders(data);
      } catch (error) {
        console.error("Error fetching service providers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      connectHeaders: { "user-email": email },
      debug: (msg) => console.log("STOMP Debug:", msg),
      onConnect: () => {
        client.subscribe(`/user/${email}/queue/service-response`, (message) => {
          const response = JSON.parse(message.body);
          if (response.status === "ACCEPTED") {
            setResponsePopup(response);
          }
        });
      },
    });
    client.activate();
    setStompClient(client);
    return () => client.deactivate();
  }, [service]);

  const handleContactClick = (provider) => {
    setSelectedProvider(provider);
    setShowPopup(true);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return alert("Please enter a message.");
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: "/app/send-message",
        body: JSON.stringify({ providerEmail: selectedProvider.email, message }),
      });
      setShowPopup(false);
      setMessage("");
    } else {
      alert("STOMP connection is not open. Please try again later.");
    }
  };

  const handleCustomerResponse = (accepted) => {
    if (accepted) {
      stompClient.publish({
        destination: "/app/customer-response",
        body: JSON.stringify({ providerEmail: responsePopup.providerEmail, status: "CONFIRMED" }),
      });
    }
    setResponsePopup(null);
  };
  
    

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      connectHeaders: { "user-email": email },
      debug: (msg) => console.log("STOMP Debug:", msg),
      onConnect: () => {
        client.subscribe(`/user/${email}/queue/service-response`, (message) => {
          const response = JSON.parse(message.body);
          if (response.status === "ACCEPTED") {
            setResponsePopup(response);
          }
        });
      },
    });
    client.activate();
    setStompClient(client);
    return () => client.deactivate();
  }, []);
  
  

  return (
    <div className="bg-gray-800 text-white min-h-screen flex">
      <div className="w-1/2 h-screen">
        <Map
          initialViewState={{ longitude: 73.9115, latitude: 18.5499, zoom: 15 }}
          style={{ width: "100%", height: "100%" }}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {providers.map((provider, index) => (
            <Marker key={index} longitude={provider.longitude} latitude={provider.latitude} anchor="bottom">
              <div className="text-lg text-blue-500">📍</div>
            </Marker>
          ))}
        </Map>
      </div>
      <div className="w-1/2 px-6 py-12 overflow-y-auto">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-12">
          Nearby {service.charAt(0).toUpperCase() + service.slice(1)} Providers
        </h2>
        <div className="space-y-8">
          {providers.map((provider, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-blue-700 cursor-pointer">
              <p className="text-gray-300 mb-2"><span className="font-semibold text-yellow-500">First Name:</span> {provider.fname}</p>
              <p className="text-gray-300 mb-2"><span className="font-semibold text-yellow-500">Last Name:</span> {provider.lname}</p>
              <p className="text-gray-300 mb-2"><span className="font-semibold text-yellow-500">Email:</span> {provider.email}</p>
              <button className="bg-yellow-500 text-gray-800 py-2 px-4 rounded-md mt-4" onClick={() => handleContactClick(provider)}>Contact Provider</button>
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Send a message to {selectedProvider?.fname}</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows="4"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex justify-end space-x-4">
              <button className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400" onClick={() => setShowPopup(false)}>Cancel</button>
              <button className="bg-yellow-500 text-gray-800 py-2 px-4 rounded-md font-semibold shadow-md hover:bg-yellow-400" onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
      {responsePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">
              Service accepted from {responsePopup.providerName} with amount ₹{responsePopup.amount}
            </h2>
            <div className="flex justify-end space-x-4">
              <button 
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                onClick={() => handleCustomerResponse(true)}
              >
                Accept
              </button>
              <button 
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                onClick={() => handleCustomerResponse(false)}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;
