import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Sun, Moon, User, LogIn } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isLanding = location.pathname === '/';
  const isAuth = ['/login', '/signup'].includes(location.pathname);
  const isDashboard = location.pathname.startsWith('/citizen') ||
    location.pathname.startsWith('/volunteer') ||
    location.pathname.startsWith('/organization');

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-left">
        <NavLink to="/" className="navbar-logo-container">
          <img src="/logo.png" alt="TrustVolv" className="navbar-logo-img theme-match-logo" />
          <span className="navbar-logo">TrustVolv</span>
        </NavLink>

        {isLanding && (
          <motion.div
            className="navbar-links"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <a href="#features" className="navbar-link">Features</a>
            <a href="#how-it-works" className="navbar-link">How It Works</a>
            <a href="#organizations" className="navbar-link">Organizations</a>
            <a href="#contact" className="navbar-link">Contact</a>
          </motion.div>
        )}
      </div>

      <div className="navbar-right">
        <motion.button
          className="theme-toggle"
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <AnimatePresence mode="wait">
            {theme === 'dark' ? (
              <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
                <Sun size={18} />
              </motion.div>
            ) : (
              <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.25 }}>
                <Moon size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {isDashboard && (
          <button className="nav-icon-btn">
            <Bell size={18} />
            <span className="badge"></span>
          </button>
        )}

        {isLanding && (
          <>
            <NavLink to="/login">
              <motion.button className="btn-outline btn-sm" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <LogIn size={14} /> Login
              </motion.button>
            </NavLink>
            <NavLink to="/signup">
              <motion.button className="btn-primary btn-sm" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                Get Started
              </motion.button>
            </NavLink>
          </>
        )}

        {isDashboard && (
          <button className="nav-icon-btn">
            <User size={18} />
          </button>
        )}
      </div>
    </nav>
  );
}
