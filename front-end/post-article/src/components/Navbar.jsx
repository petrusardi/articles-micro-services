import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link to="/">All Posts</Link>
        </div>
        <div className="space-x-4">
          <Link to="/add-new" className="text-white hover:text-gray-400">
            Add New
          </Link>
          <Link to="/preview" className="text-white hover:text-gray-400">
            Preview
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
