// 
import React from "react";
import { Link } from "react-router-dom";
import {Map,Marker} from "react-map-gl";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 text-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-opacity-90 bg-black p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-teal-400">Service Finder</h1>
          <ul className="flex space-x-6 text-lg">
            <li>
              <a href="#about" className="hover:text-teal-300 transition">
                About
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-teal-300 transition">
                Features
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-teal-300 transition">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-teal-300 transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Map Section */}
      <div className="h-96 shadow-lg">
        <Map
          initialViewState={{
            longitude: 72.8777, // Longitude of Mumbai
            latitude: 19.076, // Latitude of Mumbai
            zoom: 12.5, // Adjust the zoom level for better view
          }}
          style={{ width: "100%", height: "80%" }}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v10">
        </Map>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-700 shadow-lg">
        <h2 className="text-5xl font-extrabold mb-6 text-white drop-shadow-md">
          Welcome to <span className="text-teal-300">Service Finder</span>
        </h2>
        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl">
          Connecting you with the best service providers near you. Discover
          quality, convenience, and trust.
        </p>
        <div className="flex space-x-6">
        <Link to="/login">
            <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full shadow-xl transition">
              Join as Customer
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full shadow-xl transition">
              Join as Service Provider
            </button>
          </Link>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="container mx-auto py-12 px-6">
        <div className="bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-4xl font-bold mb-4 text-teal-400">About Us</h3>
          <p className="text-gray-300">
            We are dedicated to connecting you with reliable service providers
            for all your needs. From everyday repairs to specialized
            professionals, we've got you covered with speed and trust.
          </p>
        </div>
        
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto py-12 px-6">
        <div className="bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-4xl font-bold mb-6 text-teal-400">Features</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-3">
            <li>Real-time location-based search</li>
            <li>Integrated payment system for seamless transactions</li>
            <li>Rating and review system for trust and reliability</li>
            <li>User-friendly and responsive design</li>
          </ul>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto py-12 px-6">
        <div className="bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-4xl font-bold mb-6 text-teal-400">Services</h3>
          <p className="text-gray-300 mb-8">
            Explore our range of services tailored for your convenience. From
            healthcare to home repairs, we ensure you get the best help around.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-indigo-800 to-teal-700 p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold text-white">Plumber</h4>
            </div>
            <div className="bg-gradient-to-br from-indigo-800 to-teal-700 p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold text-white">Doctor</h4>
            </div>
            <div className="bg-gradient-to-br from-indigo-800 to-teal-700 p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold text-white">Carpenter</h4>
            </div>
            <div className="bg-gradient-to-br from-indigo-800 to-teal-700 p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold text-white">Mechanic</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto py-12 px-6">
        <div className="bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-4xl font-bold mb-6 text-teal-400">Contact Us</h3>
          <p className="text-gray-300 mb-4">Have questions? We're here to help!</p>
          <p className="text-gray-300">
            Email:{" "}
            <a
              href="mailto:support@servicefinder.com"
              className="text-yellow-400 hover:underline"
            >
              support@servicefinder.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
