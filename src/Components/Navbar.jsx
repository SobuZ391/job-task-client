import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white font-bold text-xl">
          My Store
        </Link>
        <div>
          <Link to="/login" className="text-white mx-2">
            Login
          </Link>
          <Link to="/register" className="text-white mx-2">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
