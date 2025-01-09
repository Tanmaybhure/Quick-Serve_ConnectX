import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ServiceSignin = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/signup-service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          password,
          serviceType,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Signup successful!");
        setErrorMessage("");
        navigate("/servicelogin");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Signup failed.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white min-h-screen flex justify-center items-center">
      <div className="bg-opacity-90 bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-8 text-teal-400">Sign Up</h2>

        {errorMessage && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-500 text-white p-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSignup} className="flex flex-wrap space-x-6">
          <div className="flex-1 space-y-6">
            <div>
              <label
                className="block text-sm font-medium mb-2 text-gray-300"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400 text-white placeholder-gray-400"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2 text-gray-300"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400 text-white placeholder-gray-400"
                placeholder="Enter your first name"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2 text-gray-300"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400 text-white placeholder-gray-400"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <label
                className="block text-sm font-medium mb-2 text-gray-300"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400 text-white placeholder-gray-400"
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2 text-gray-300"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400 text-white placeholder-gray-400"
                placeholder="Confirm your password"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2 text-gray-300"
                htmlFor="serviceType"
              >
                Service Type
              </label>
              <select
                id="serviceType"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full p-3 rounded-lg bg-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400 text-white placeholder-gray-400"
                required
              >
                <option value="">Select your service type</option>
                <option value="doctor">Doctor</option>
                <option value="carpenter">Carpenter</option>
                <option value="plumber">Plumber</option>
                <option value="mechanics">Mechanics</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              type="submit"
              className="flex-1 py-3 bg-teal-500 hover:bg-teal-600 text-black font-bold rounded-lg transition shadow-lg"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => navigate("/servicelogin")}
              className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition shadow-lg"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceSignin;
