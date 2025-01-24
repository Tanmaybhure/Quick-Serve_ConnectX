import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashBoardPage = () => {
  const [userData, setUserData] = useState(null);
  const [serviceHistory, setServiceHistory] = useState([]);
  const [profileOptionsVisible, setProfileOptionsVisible] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    // Retrieve the email from localStorage
    const email = localStorage.getItem("userEmail");
    if (!email) {
      navigate("/login"); // Redirect to login if no email is found
      return;
    }

    // Fetch user data and service history using the email
    const fetchData = async () => {
      try {
        const userResponse = await fetch(`http://localhost:8080/api/user-details?email=${email}`, {
          method: "GET",
          credentials: "include",
        });
        const user = await userResponse.json();
        console.log(user);
        setUserData(user);

        const historyResponse = await fetch(`http://localhost:8080/api/service-history?email=${email}`, {
          method: "GET",
          credentials: "include",
        });
        const history = await historyResponse.json();
        setServiceHistory(history);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    // Clear localStorage and redirect to login
    localStorage.removeItem("userEmail");
    setUserData(null);
    navigate("/login");
  };

  const handleProfileClick = () => {
    setProfileOptionsVisible(!profileOptionsVisible);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black min-h-screen text-white">
      <nav className="flex justify-between items-center bg-opacity-90 bg-gray-800 p-6 shadow-lg">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={handleProfileClick}
          />
          <div>
            <h1 className="text-xl font-bold text-teal-400">{userData?.fname+" "+userData?.lname || "Loading..."}</h1>
            <p className="text-sm text-gray-300">{userData?.service || "Loading..."}</p>
          </div>
        </div>

        {profileOptionsVisible && (
          <div className="absolute top-20 right-6 bg-gray-800 p-4 rounded-md shadow-lg w-48">
            <ul>
              <li className="mb-3 cursor-pointer hover:text-teal-400">Edit Profile</li>
              <li
                className="cursor-pointer hover:text-teal-400"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Personal Card Section */}
        <section className="mb-12">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-teal-500">
            <h2 className="text-3xl font-bold text-teal-400 mb-6">Personal Details</h2>
            {userData ? (
              <div className="space-y-4">
                <p className="text-lg font-semibold text-white">
                  <span className="text-teal-400">Name:</span> {userData?.fname+" "+userData?.lname}
                </p>
                <p className="text-lg font-semibold text-white">
                  <span className="text-teal-400">Email:</span> {userData.email}
                </p>
                <p className="text-lg font-semibold text-white">
                  <span className="text-teal-400">Service:</span> {userData.service}
                </p>
              </div>
            ) : (
              <p className="text-gray-300">Loading user details...</p>
            )}
          </div>
        </section>

        {/* Service History Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-teal-400 mb-4">Service History</h3>
          <div className="space-y-4">
            {serviceHistory.length > 0 ? (
              serviceHistory.map((history, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-600"
                >
                  <p className="text-lg font-bold text-teal-400">{history.title}</p>
                  <p className="text-gray-300">{history.description}</p>
                  <p className="text-gray-400 text-sm">{history.date}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-300">No service history available.</p>
            )}
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-teal-400 mb-4">Contact Us</h3>
          <p className="text-gray-300">Email: support@servicefinder.com</p>
          <p className="text-gray-300">Phone: +123 456 7890</p>
        </section>
      </div>
    </div>
  );
};

export default DashBoardPage;
