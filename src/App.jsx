import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MainPage from './components/MainPage';
import './index.css'; // Adjust the path if needed
import Navbar from './components/Navbar';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userCredentials, setUserCredentials] = useState({ username: '', password: '' });

  return (
    <div>
      {/* <Navbar></Navbar> */}
      {/* <h1 className='text-3xl font-bold underline'>hello ji</h1> */}
    {/* // <Router> */}
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} setUserCredentials={setUserCredentials} />}
        />
        <Route path="/" element={<Register />} />
        <Route
          path="/main"
          element={
            isAuthenticated ? (
              <MainPage username={userCredentials.username} password={userCredentials.password} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    {/* // </Router> */}
    </div>
  );
};

export default App;
