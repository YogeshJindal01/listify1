import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/users/register", {
        username,
        password,
      });
      navigate("/login");
    } catch (error) {
      setError("Registration failed. Try a different username.");
    }
  };

  const handleclick=()=>{
    navigate("/login")
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="absolute top-10 left-12">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
          Listify
        </h1>
      </div>
      <div className="absolute top-40 left-32 mt-2 text-lg text-gray-300 max-w-md leading-relaxed">
  <p>
    Welcome to Listify, your ultimate task management companion. 
    Designed to simplify your daily routine, It empowers you to 
    effortlessly organize, track, and complete your goals.
  </p>
  <br />
  <p>
    Whether you're managing work deadlines, personal projects, or study plans, 
    Listify provides a sleek and intuitive platform to keep you on top of everything.
  </p>
  <br />
  <p>
    Embrace productivity with ease and discover the joy of staying organized with 
    <span className="font-bold text-purple-400"> Listify</span>. Let’s make task management simple, stylish, and effective.
  </p>
</div>

      <div style={{ position: 'relative', left: '320px' }} className="relative w-full max-w-lg p-10 space-y-8 bg-gray-800 shadow-2xl rounded-2xl border border-gray-700 transform transition duration-500 hover:scale-105">
        {/* Decorative Gradient Border */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-10 blur-xl"></div>

        <h2 className="text-4xl font-bold text-center text-gray-100">
          Register an Account
        </h2>
        <p className="text-sm text-center text-gray-400">
          Create a new account to explore amazing features.
        </p>
        <form onSubmit={handleRegister} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 text-gray-300 transition duration-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 text-gray-300 transition duration-300"
          />
          <button
            type="submit"
            className="w-full py-3 font-semibold text-gray-100 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-md hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transform transition duration-300 ease-in-out hover:scale-105"
          >
            Register
          </button>
          <span
              onClick={handleclick}
              className="block text-center text-l text-gray-400 hover:text-purple-500 cursor-pointer transition duration-300 mt-4"
            >
            Already have an Account? Click Here
          </span>

        </form>
        {error && (
          <p className="text-sm text-center text-red-500 mt-4 animate-pulse">
            {error}
          </p>
        )}
      </div>

      {/* Floating Animation */}
      <style>
        {`
          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Register;
