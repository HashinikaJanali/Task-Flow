// Login.jsx
import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import './Log.css';
import googleLogo from '../../assets/google1.png'; 
import appleLogo from '../../assets/apple.png';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await API.post('/users/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      {/* Fullscreen video background */}
      <video
        className="bg-video"
        autoPlay
        muted
        loop
        playsInline
        src="/splash.mp4"
        type="video/mp4"
      >
        Your browser does not support the video tag.
      </video>

      {/* Overlay with text features */}
      <div className="video-overlay">
        <div className="overlay-content">
          <h2>Welcome Back to TaskFlow</h2>
          <p>Log in to continue managing your tasks efficiently</p>
          <div className="features">
            {[
              "Quick access to your dashboard",
              "Sync across all your devices",
              "Secure and private",
              "Get personalized insights"
            ].map(feature => (
              <div className="feature-item" key={feature}>
                <div className="feature-icon-container">
                  <FaArrowRight className="feature-icon" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced login form */}
      <div className="form-section">
        <div className="login-card">
          <div className="login-header">
            <h1 className="logo">TaskFlow</h1>
            <h2>Log In</h2>
            <p>Welcome back! Please enter your details</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="forgot-password">
              <a href="/forgot-password" className="forgot-password-link">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Logging In...
                </>
              ) : (
                'Log In'
              )}
            </button>
          </form>

          <div className="divider">
            <span>Or continue with</span>
          </div>

          <div className="social-login">
            <button className="social-btn google">
              <img src={googleLogo} alt="Google" />
              Google
            </button>
            <button className="social-btn apple">
              <img src={appleLogo} alt="Apple" />
              Apple
            </button>
          </div>

          <div className="register-link">
            Don't have an account? <a href="/register" className="register-link-text">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}