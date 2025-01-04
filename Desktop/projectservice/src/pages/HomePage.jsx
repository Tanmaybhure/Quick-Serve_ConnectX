import React from "react";
import { Link } from "react-router-dom";
import Map from 'react-map-gl';

const HomePage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">

      {/* Navbar */}
      <nav className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-yellow-500">Service Finder</h1>
          <ul className="flex space-x-6">
            <li>
              <a href="#about" className="hover:text-yellow-400 transition">
                About
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-yellow-400 transition">
                Features
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-yellow-400 transition">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-yellow-400 transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Map Section */}
      <div className="h-96">
        <Map
          initialViewState={{
            longitude: 72.8777,  // Longitude of Mumbai
            latitude: 19.0760,   // Latitude of Mumbai
            zoom: 10,            // Adjust the zoom level for better view
          }}
          style={{ width: "100%", height: "100%" }}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        />
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-20 bg-gray-800 shadow-lg">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-yellow-500">
          Welcome to Service Finder
        </h2>
        <p className="text-lg md:text-xl mb-8 text-gray-300">
          Connecting you with the best service providers near you!
        </p>
        <div className="flex space-x-4">
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full shadow-lg">
              Join as Customer
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full shadow-lg">
              Join as Service Provider
            </button>
          </Link>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="container mx-auto py-12 px-6">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-3xl font-bold mb-4 text-yellow-500">About Us</h3>
          <p className="text-gray-300">
            We are committed to helping you find the nearest and most reliable
            service providers, ranging from plumbers to doctors and everything
            in between. Our platform ensures quick and efficient solutions to
            your everyday problems.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto py-12 px-6">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-3xl font-bold mb-4 text-yellow-500">Features</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Real-time location-based search</li>
            <li>Integrated payment system for seamless transactions</li>
            <li>Rating and review system for trust and reliability</li>
            <li>User-friendly and responsive design</li>
          </ul>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto py-12 px-6">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-3xl font-bold mb-4 text-yellow-500">Services</h3>
          <p className="text-gray-300 mb-4">
            Discover a wide range of services tailored to your needs. From home
            repairs to healthcare, our network of trusted professionals is here
            to help.
          </p>
          <div className="flex flex-wrap gap-6">
            <div className="bg-gray-700 p-6 rounded-lg shadow-md w-48 text-center">
              <h4 className="text-xl font-bold text-yellow-400">Plumber</h4>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md w-48 text-center">
              <h4 className="text-xl font-bold text-yellow-400">Doctor</h4>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md w-48 text-center">
              <h4 className="text-xl font-bold text-yellow-400">Carpenter</h4>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md w-48 text-center">
              <h4 className="text-xl font-bold text-yellow-400">Mechanic</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto py-12 px-6">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-3xl font-bold mb-4 text-yellow-500">Contact Us</h3>
          <p className="text-gray-300 mb-2">Have questions? We're here to help!</p>
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
