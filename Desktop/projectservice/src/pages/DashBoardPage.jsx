import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Flag } from "lucide-react";

const ServiceProviderPage = () => {
  const [userData, setUserData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [amount, setAmount] = useState("");
  const [finalPopup, setFinalPopup] = useState(null);


  const navigate = useNavigate();
  const email = localStorage.getItem("userEmailsp");

  useEffect(() => {
    if (!email) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/user-details?email=${email}`,
          { method: "GET", credentials: "include" }
        );
        const user = await response.json();
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    // Initialize WebSocket connection
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      connectHeaders: { "user-email": email },
      debug: (msg) => console.log("STOMP Debug:", msg),
      onConnect: () => {
        console.log("WebSocket connected");

        client.subscribe(`/user/${email}/queue/notifications`, (message) => {
          console.log("Message received:", message.body);
          try {
            const notification = JSON.parse(message.body);
            setNotifications((prev) => [...prev, notification]);
            toast.info(`New service request from ${notification.customerName}: ${notification.message}`);
          } catch (error) {
            console.error("Error parsing notification:", error);
          }
        });
      },
      onStompError: (frame) => console.error("Broker error:", frame.headers["message"]),
      onWebSocketError: (error) => console.error("WebSocket error:", error),
      onWebSocketClose: () => console.log("WebSocket closed"),
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userEmailsp");
    setUserData(null);
    navigate("/login");
  };

  const handleAccept = (notification) => {
    setSelectedNotification(notification);
    setShowPopup(true); // Show popup for entering charges
  };

  const sendCharges = () => {
    if (!amount || !selectedNotification) return;

    const message = {
      receiverEmail: selectedNotification.customerEmail,
      amount: amount,
      status: "ACCEPTED",
    };

    stompClient?.publish({
      destination: "/app/service-response",
      body: JSON.stringify(message),
    });

    setNotifications((prev) => prev.filter((n) => n.id !== selectedNotification.id));
    setShowPopup(false);
    setAmount("");
    toast.success(`Accepted request from ${selectedNotification.customerName}. Sent charges: ₹${amount}`);
  };

  const handleReject = (notification) => {
    const message = {
      receiverEmail: notification.customerEmail,
      status: "REJECTED",
    };

    stompClient?.publish({
      destination: "/app/service-response",
      body: JSON.stringify(message),
    });

    setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
    toast.error(`Rejected request from ${notification.customerName}`);    
  };

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      connectHeaders: { "user-email": email },
      debug: (msg) => console.log("STOMP Debug:", msg),
      onConnect: () => {
        client.subscribe(`/user/${email}/queue/customer-response`, (message) => {
          const response = JSON.parse(message.body);
          if (response.status === "CONFIRMED") {
            setFinalPopup(response);
          }
        });
      },
    });
    client.activate();
    setStompClient(client);
    return () => client.deactivate();
  }, []);
  

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black min-h-screen text-white">
      <ToastContainer />
      <nav className="flex justify-between items-center bg-opacity-90 bg-gray-800 p-6 shadow-lg">
        <div className="flex items-center space-x-4">
          <img src="https://via.placeholder.com/40" alt="Profile" className="w-10 h-10 rounded-full cursor-pointer" />
          <div>
            <h1 className="text-xl font-bold text-teal-400">
              {userData?.fname + " " + userData?.lname || "Loading..."}
            </h1>
            <p className="text-sm text-gray-300">{userData?.service || "Loading..."}</p>
          </div>
        </div>
        <button className="bg-red-500 text-white py-2 px-4 rounded-md" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {notifications.length > 0 && (
          <section className="mb-12">
            <h3 className="text-2xl font-semibold text-teal-400 mb-4">New Notifications</h3>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-600">
                  <p className="text-lg font-bold text-teal-400">
                    {notification.customerName} (<span className="text-yellow-400">{notification.customerEmail}</span>)
                    wants to contact you.
                  </p>
                  <p className="text-gray-300 font-semibold mt-2">Message:</p>
                  <p className="text-gray-300 italic">"{notification.message}"</p>

                  <div className="flex space-x-4 mt-4">
                    <button
                      className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all"
                      onClick={() => handleAccept(notification)}
                    >
                      ✅ Accept
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all"
                      onClick={() => handleReject(notification)}
                    >
                      ❌ Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl text-white mb-4">Enter Service Charges</h3>
            <input
              type="number"
              className="w-full p-2 border rounded-md text-black"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
            <div className="flex justify-between mt-4">
              <button className="bg-green-500 px-4 py-2 rounded-md" onClick={sendCharges}>
                Send
              </button>
              <button className="bg-gray-500 px-4 py-2 rounded-md" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {finalPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">
              Customer has accepted your service offer of ₹{finalPopup.amount}
            </h2>
            <div className="flex justify-end">
              <button 
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                onClick={() => setFinalPopup(null)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
)}


    </div>
  );
};

export default ServiceProviderPage;
