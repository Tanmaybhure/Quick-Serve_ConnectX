import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DashBoardPage = () => {
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume user is logged in
  const [profileOptionsVisible, setProfileOptionsVisible] = useState(false);

  // Timer function to countdown from 10 minutes
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleProfileClick = () => {
    setProfileOptionsVisible(!profileOptionsVisible);
  };

  return (
    <div className="bg-gray-800 min-h-screen text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-gray-900 p-6">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/40" // Placeholder for profile logo
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={handleProfileClick}
          />
          <div>
            <h1 className="text-xl font-bold">John Doe</h1>
            <p className="text-sm text-gray-400">Plumber</p>
          </div>
        </div>

        {/* Profile Options Dropdown */}
        {profileOptionsVisible && (
          <div className="absolute top-20 right-6 bg-gray-900 p-4 rounded-md shadow-lg w-48">
            <ul>
              <li className="mb-3 cursor-pointer hover:text-yellow-500">Edit Profile</li>
              <li
                className="cursor-pointer hover:text-yellow-500"
                onClick={() => setIsLoggedIn(false)}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

        {/* History */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">History</h3>
          <div className="space-y-4">
            <div className="bg-gray-700 p-4 rounded-lg shadow-md">
              <p className="text-lg font-bold">Service History 1</p>
              <p className="text-gray-400">Details of the service request...</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg shadow-md">
              <p className="text-lg font-bold">Service History 2</p>
              <p className="text-gray-400">Details of the service request...</p>
            </div>
          </div>
        </section>

        {/* Contact Us */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400">Email: support@servicefinder.com</p>
          <p className="text-gray-400">Phone: +123 456 7890</p>
        </section>

        {/* Service Request Cards */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg border border-gray-600">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-bold text-white">Customer Name</h4>
                <div className="flex items-center space-x-2">
                  <div className="text-green-500">✔️</div>
                  <div className="text-red-500">❌</div>
                </div>
              </div>
              <p className="text-gray-300">Address: 123 Some St, City</p>
              <p className="text-gray-300">Phone: +987654321</p>
              <p className="text-gray-300 mb-4">Message: Need plumbing assistance</p>

              <div className="flex justify-between items-center">
                <div className="text-gray-400">Time Remaining: {formatTime(timer)}</div>
                <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600">
                  Accept
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashBoardPage;
