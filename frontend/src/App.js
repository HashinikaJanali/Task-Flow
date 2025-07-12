import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Log';
import Register from './pages/Register/register';
import Dashboard from './pages/Dashboard/dashboard';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for token on initial load
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;