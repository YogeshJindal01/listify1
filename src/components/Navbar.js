import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate=useNavigate();
  const handlelogout=()=>{
    navigate("/")
  };
  
  return (
    <nav className=" bg-sky-950 sticky top-0 text-white px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <a href="/" className="text-2xl font-bold">
          Listify
        </a>
        <button
          onClick={handlelogout}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Logout
        </button>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button id="nav-toggle" className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
