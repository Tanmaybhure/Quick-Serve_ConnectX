import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs"; // Import the STOMP client
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ServiceProviderDashBoardPage = () => {
  const [userData, setUserData] = useState(null);
  const [notifications, setNotifications] = useState([]); // Store notifications properly
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmailsp");

  useEffect(() => {
    if (!email) {
      navigate("/login");
      return;
    }

    // Fetch user data
    const fetchUserData = async () => {
      try {
        console.log("Sp: " + email);
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

    // Initialize WebSocket connection using SockJS
    const stompClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      connectHeaders: {
        "user-email": email, // 🔥 Service provider's email sent in the header
      },
      debug: (msg) => console.log("STOMP Debug:", msg),
      onConnect: () => {
        console.log("WebSocket connected");

        // Subscribe to user-specific notifications
        stompClient.subscribe(`/user/${email}/queue/notifications`, (message) => {
          console.log("message received: ", message.body);

          // ✅ Properly parse and store message
          try {
            const notification = JSON.parse(message.body);
            setNotifications((prev) => [...prev, notification]);

            // ✅ Show toast alert with proper message
            toast.info(`New service request from ${notification.customerName}: ${notification.message}`);
          } catch (error) {
            console.error("Error parsing notification message:", error);
          }
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error:", frame.headers["message"]);
        console.error("Additional details:", frame.body);
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error:", error);
      },
      onWebSocketClose: () => {
        console.log("WebSocket connection closed");
      },
    });

    stompClient.activate();

    // Cleanup WebSocket connection on component unmount
    return () => {
      stompClient.deactivate();
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserData(null);
    navigate("/login");
  };

  const handleAccept = (notificationId) => {
    fetch(`http://localhost:8080/api/accept-request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notificationId }),
    })
      .then(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
        toast.success("Request accepted successfully");
      })
      .catch((error) => {
        console.error("Error accepting request:", error);
        toast.error("Failed to accept request");
      });
  };

  const handleReject = (notificationId) => {
    fetch(`http://localhost:8080/api/reject-request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notificationId }),
    })
      .then(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
        toast.error("Request rejected successfully");
      })
      .catch((error) => {
        console.error("Error rejecting request:", error);
        toast.error("Failed to reject request");
      });
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black min-h-screen text-white">
      <ToastContainer />
      <nav className="flex justify-between items-center bg-opacity-90 bg-gray-800 p-6 shadow-lg">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
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
  {/* Notifications Section */}
  {notifications.length > 0 && (
    <section className="mb-12">
      <h3 className="text-2xl font-semibold text-teal-400 mb-4">New Notifications</h3>
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-600">
            <p className="text-lg font-bold text-teal-400">
              {notification.customerName} (<span className="text-yellow-400">{notification.customerEmail}</span>) wants to contact you.
            </p>
            <p className="text-gray-300 font-semibold mt-2">Message:</p>
            <p className="text-gray-300 italic">"{notification.message}"</p>
            
            {/* Buttons for Accept/Reject */}
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all"
                onClick={() => handleAccept(notification.id)}
              >
                ✅ Accept
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all"
                onClick={() => handleReject(notification.id)}
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

    </div>
  );
};

export default ServiceProviderDashBoardPage;
