import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

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

      const data = await response.json(); // Handle the response

      if (response.ok) {
        setSuccessMessage("Login successful!");
        setErrorMessage("");
        // Save the token to localStorage or state
        localStorage.setItem("token", data.token);
        navigate("/servicePage"); // Redirect after successful login
      } else {
        setErrorMessage(data.message || "Login failed.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white min-h-screen flex justify-center items-center">
      <div className="bg-opacity-90 bg-gray-800 p-8 rounded-lg w-full max-w-sm shadow-2xl">
        <h2 className="text-4xl font-bold text-center mb-8 text-teal-400">Login</h2>

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

        <form onSubmit={handleLogin} className="space-y-6">
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

          <div className="flex justify-between items-center">
            <a
              href="/forgot-password"
              className="text-sm text-teal-400 hover:underline"
            >
              Forgot Password?
            </a>
            <a
              href="/signup"
              className="text-sm text-teal-400 hover:underline"
            >
              Sign Up
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-black font-bold rounded-lg transition shadow-lg"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
