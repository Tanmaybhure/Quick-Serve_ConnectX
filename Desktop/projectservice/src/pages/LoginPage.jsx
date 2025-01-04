import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); 
  console.log("login page");
  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Login successful!");
        setErrorMessage("");
        console.log("Login Response:", data);
        navigate("/servicePage");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Login failed.");
        setSuccessMessage("");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred. Please try again.");
      setSuccessMessage("");
      navigate("/login");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
      <div className="bg-opacity-50 bg-navy-900 p-8 rounded-lg w-full max-w-sm shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>

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

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-transparent border border-gray-700 text-white focus:outline-none focus:border-yellow-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-transparent border border-gray-700 text-white focus:outline-none focus:border-yellow-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Forgot Password and Signup Links */}
          <div className="flex justify-between items-center mb-6">
            <a
              href="/forgot-password"
              className="text-sm text-yellow-500 hover:underline"
            >
              Forgot Password?
            </a>
            <a
              href="/signup"
              className="text-sm text-yellow-500 hover:underline"
            >
              Sign Up
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 focus:outline-none"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
