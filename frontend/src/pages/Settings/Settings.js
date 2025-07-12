import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaBell, FaPalette, FaTrash, FaSave, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import API from '../../api';
import './Settings.css';

export default function Settings({ user, onUpdateUser, darkMode, setDarkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    notifications: true,
    theme: 'light'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        notifications: user.notifications !== false,
        theme: user.theme || 'light'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');
    
    try {
      const response = await API.put('/users/me', {
        name: formData.name,
        email: formData.email,
        notifications: formData.notifications,
        theme: formData.theme
      });
      
      // Update parent component with the full user object
      onUpdateUser(response.data.user);
      
      // Handle theme change if needed
      if (formData.theme === 'dark') {
        setDarkMode(true);
      } else if (formData.theme === 'light') {
        setDarkMode(false);
      }
      
      setSuccessMessage('Settings saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 
                      err.response?.data?.error || 
                      'Failed to save settings. Please try again.';
      setError(errorMsg);
      console.error('Settings update error:', err.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }
    
    try {
      await API.delete('/users/me');
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete account. Please try again.');
    }
  };

  return (
    <motion.div 
      className="settings-container glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2>Account Settings</h2>
      
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-group">
          <div className="input-container">
            <div className="input-icon">
              <FaUser />
            </div>
            <div className="input-wrapper">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <div className="input-icon">
              <FaEnvelope />
            </div>
            <div className="input-wrapper">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group checkbox-group">
          <div className="input-container">
            <div className="input-icon">
              <FaBell />
            </div>
            <div className="input-wrapper">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Enable Notifications
              </label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <div className="input-icon">
              <FaPalette />
            </div>
            <div className="input-wrapper">
              <label>Theme</label>
              <select
                name="theme"
                value={formData.theme}
                onChange={handleChange}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <FaExclamationTriangle className="error-icon" /> 
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="success-message">
            <span>{successMessage}</span>
          </div>
        )}

        <motion.button 
          type="submit" 
          className="save-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            <>
              <FaSave className="btn-icon" /> Save Changes
            </>
          )}
        </motion.button>
      </form>

      <div className="danger-zone">
        <h3><FaExclamationTriangle className="warning-icon" /> Danger Zone</h3>
        <p>These actions are irreversible. Please proceed with caution.</p>
        
        <motion.button 
          className="delete-account-btn"
          onClick={handleDeleteAccount}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaTrash className="btn-icon" /> Delete Account
        </motion.button>
      </div>
    </motion.div>
  );
}