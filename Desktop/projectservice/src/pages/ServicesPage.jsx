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
    <div className="bg-gray-800 text-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-900 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Service Finder</h1>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-12">
          Our Services
        </h2>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <Link to={service.link} key={index}>
              <div className="bg-gray-700 p-8 rounded-lg shadow-lg cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-gray-600">
                <h3 className="text-2xl font-bold text-white mb-4">{service.name}</h3>
                <p className="text-gray-300 text-lg">{service.profession}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
