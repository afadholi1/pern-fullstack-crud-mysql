import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="font-bold text-2xl text-blue-600">
        <Link
          to="/"
          className="font-bold text-2xl text-blue-600 tracking-tight"
        >
          JBTV <span className="text-gray-400 font-light">Admin</span>
        </Link>
      </div>
      <div className="space-x-6 font-medium text-gray-600">
        <Link to="/" className="hover:text-blue-500 transition">
          Product List
        </Link>
        <Link
          to="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Product
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
