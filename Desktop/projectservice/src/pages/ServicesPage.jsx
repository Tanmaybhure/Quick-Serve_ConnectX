import React from "react";
import { Link } from "react-router-dom";

const services = [
  { name: "Plumber", profession: "Plumbing", link: "/service-provider/plumber" },
  { name: "Doctor", profession: "Healthcare", link: "/service-provider/doctor" },
  { name: "Carpenter", profession: "Woodwork", link: "/service-provider/carpenter" },
  { name: "Mechanic", profession: "Automobile Repair", link: "/service-provider/mechanic" },
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-800 to-black text-white">
      {/* Navbar */}
      <nav className="bg-gray-900 p-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-yellow-400 tracking-wider">Service Finder</h1>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-extrabold text-center text-yellow-500 mb-16">
          Explore Our Services
        </h2>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link to={`/service-provider/${service.name.toLowerCase()}`} key={index}>
              <div className="group relative bg-gray-800 p-6 rounded-lg shadow-xl cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-gray-700">
                {/* Icon */}
                <div className="text-yellow-400 text-4xl mb-4 group-hover:rotate-12 transform transition-transform">
                  {service.icon}
                </div>
                {/* Service Info */}
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-400 text-lg">{service.profession}</p>
                {/* Decorative Border */}
                <div className="absolute inset-0 border-2 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="bg-gray-900 p-6 mt-12 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Service Finder. All Rights Reserved.
        </p>
      </footer> */}
    </div>
  );
};

export default ServicesPage;
