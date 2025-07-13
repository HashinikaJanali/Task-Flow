import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaCheck, FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './register.css';
import googleLogo from '../../assets/google1.png'; 
import appleLogo from '../../assets/apple.png';

export default function Register() {
  const [form, setForm] = useState({ 
    username: '', 
    email: '', 
    password: '',
    agreeTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = 'Full name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }
    if (!form.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password
        })
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setErrors({ server: data.msg || 'Registration failed' });
      }
    } catch (err) {
      setErrors({ server: 'Server error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <video className="bg-video" autoPlay muted loop playsInline src="/splash.mp4" />
      <div className="video-overlay">
        <div className="overlay-content">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Join TaskFlow Today
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            Register now to unlock powerful task management features
          </motion.p>
          <div className="features">
            {[
              "Intuitive task organization",
              "Real-time collaboration",
              "Smart productivity analytics",
              "Cross-platform sync"
            ].map((feature, index) => (
              <motion.div className="feature-item" key={feature} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + index * 0.1 }}>
                <div className="feature-icon-container">
                  <FaArrowRight className="feature-icon" />
                </div>
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="form-section">
        <motion.div className="register-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <div className="register-header">
            <motion.h1 className="logo" whileHover={{ scale: 1.05 }}>TaskFlow</motion.h1>
            <h2>Create Account</h2>
            <p>Get started with your free account</p>
          </div>

          <AnimatePresence>
            {errors.server && (
              <motion.div className="error-message" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                {errors.server}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                value={form.username}
                onChange={handleChange}
                className={errors.username ? 'error' : ''}
              />
              {errors.username && <span className="input-error">{errors.username}</span>}
            </div>

            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="input-error">{errors.email}</span>}
            </div>

            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && <span className="input-error">{errors.password}</span>}
            </div>

            <div className="terms-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={form.agreeTerms}
                  onChange={handleChange}
                />
                <span className="checkmark">
                  {form.agreeTerms && <FaCheck className="check-icon" />}
                </span>
                I agree to the <a href="/terms" className="terms-link">Terms</a> and <a href="/privacy" className="terms-link">Privacy Policy</a>
              </label>
              {errors.agreeTerms && <span className="input-error terms-error">{errors.agreeTerms}</span>}
            </div>

            <motion.button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                'Sign Up'
              )}
            </motion.button>
          </form>

          <div className="divider"><span>Or sign up with</span></div>

          <div className="social-login">
            <motion.button className="social-btn google" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <img src={googleLogo} alt="Google" />
              Google
            </motion.button>
            <motion.button className="social-btn apple" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <img src={appleLogo} alt="Apple" />
              Apple
            </motion.button>
          </div>

          <div className="login-link">
            Already have an account? <a href="/login" className="login-link-text">Log in</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
