import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Building2, ChevronDown, Phone } from 'lucide-react';
import AnimatedLogo from '../components/ui/AnimatedLogo';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [isLogin, setIsLogin] = useState(location.pathname !== '/signup');
  const [role, setRole] = useState('citizen');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(role);
  };

  return (
    <div className="auth-page">
      <motion.div
        className="auth-left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="auth-left-content">
          <div className="auth-left-text" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '40px' }}>
            <motion.img 
              src="/logo.png" 
              alt="TrustVolv Logo" 
              className="theme-match-logo"
              style={{ width: '100%', maxWidth: '960px', objectFit: 'contain', marginBottom: '-80px', filter: 'drop-shadow(0px 12px 24px rgba(0,0,0,0.08))' }}
              animate={{
                y: [0, -12, 0],
                scale: [1, 1.03, 1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <h2 style={{marginTop: '0px', textAlign: 'center'}}>Connecting Communities<br />in Crisis</h2>
            <p style={{ textAlign: 'center' }}>Real-time coordination between citizens, volunteers, and response organizations.</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="auth-right"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="auth-form-container">
          <div className="tab-toggle">
            <button className={`tab-btn ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Login</button>
            <button className={`tab-btn ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Sign Up</button>
          </div>

          <div className="form-header-with-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <AnimatedLogo size={32} />
            <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon" />
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Select Role</label>
              <div className="input-with-icon">
                <Building2 size={16} className="input-icon" />
                <select className="form-select" value={role} onChange={e => setRole(e.target.value)}>
                  <option value="citizen">Citizen (Report emergencies)</option>
                  <option value="volunteer">Volunteer (Assist & respond)</option>
                  <option value="organization">Organization (Manage dispatch)</option>
                </select>
                <ChevronDown size={16} className="select-arrow" />
              </div>
            </div>

            {isLogin && (
              <div className="form-row">
                <label className="checkbox-label">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>
            )}

            {!isLogin && (
              <label className="checkbox-label" style={{ marginBottom: 20 }}>
                <input type="checkbox" className="form-checkbox" />
                <span>I agree to the <a href="#" className="forgot-link">Terms & Conditions</a></span>
              </label>
            )}

            <motion.button
              type="submit"
              className="btn-gradient"
              style={{ width: '100%', marginBottom: 20 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </motion.button>

            <div className="auth-divider">
              <span>or continue with</span>
            </div>

            <div className="social-buttons">
              <button type="button" className="btn-outline social-btn">
                <Phone size={16} />
                Phone
              </button>
              <button type="button" className="btn-outline social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </button>
            </div>
          </form>

          <p className="auth-switch">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button className="switch-link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
