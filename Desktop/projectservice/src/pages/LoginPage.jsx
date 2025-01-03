import React from "react";

const LoginPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
      <div className="bg-opacity-50 bg-navy-900 p-8 rounded-lg w-full max-w-sm shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>

        <form>
          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 rounded-lg bg-transparent border border-gray-700 text-white focus:outline-none focus:border-yellow-500"
              placeholder="Enter your email"
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
              className="w-full p-3 rounded-lg bg-transparent border border-gray-700 text-white focus:outline-none focus:border-yellow-500"
              placeholder="Enter your password"
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
