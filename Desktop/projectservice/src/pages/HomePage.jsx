import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Service Finder</h1>
          <ul className="flex space-x-6">
            <li>
              <a href="#about" className="hover:text-yellow-500">About</a>
            </li>
            <li>
              <a href="#features" className="hover:text-yellow-500">Features</a>
            </li>
            <li>
              <a href="#services" className="hover:text-yellow-500">Services</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-yellow-500">Contact Us</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-20">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Welcome to Service Finder
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Connect with the best service providers near you!
        </p>
        <div className="flex space-x-4">
        <Link to="/login">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Join as Customer
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Join as Service Provider
            </button>
          </Link>
        </div>
      </div>

      {/* Sections */}
      <section id="about" className="container mx-auto py-12">
        <h3 className="text-3xl font-bold mb-4">About Us</h3>
        <p className="text-gray-300">
          We help you find the nearest and most reliable service providers, from plumbers to doctors and everything in between.
        </p>
      </section>

      <section id="features" className="container mx-auto py-12">
        <h3 className="text-3xl font-bold mb-4">Features</h3>
        <ul className="list-disc list-inside text-gray-300">
          <li>Real-time location-based search</li>
          <li>Integrated payment system</li>
          <li>Rating and review system</li>
          <li>Easy-to-use interface</li>
        </ul>
      </section>

      <section id="services" className="container mx-auto py-12">
        <h3 className="text-3xl font-bold mb-4">Services</h3>
        <p className="text-gray-300">
          Explore a wide range of services, including home repairs, healthcare, and more.
        </p>
      </section>

      <section id="contact" className="container mx-auto py-12">
        <h3 className="text-3xl font-bold mb-4">Contact Us</h3>
        <p className="text-gray-300">Email us at: support@servicefinder.com</p>
      </section>
    </div>
  );
};

export default HomePage;
