import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings, Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ items, title, subtitle, user }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  return (
    <motion.aside
      className="sidebar"
      initial={{ x: -220, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="sidebar-header">
        <Link to="/about" className="sidebar-brand" style={{ textDecoration: 'none', color: 'inherit' }}>
          {title || 'TrustVolv'}
        </Link>
        <div className="sidebar-subtitle">{subtitle || 'Command Center'}</div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {items.map((item, index) => {
          if (item.section) {
            return <div key={item.section} className="sidebar-section-label">{item.section}</div>;
          }
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.3 }}
            >
              <Link to={item.path} className={`sidebar-link ${isActive ? 'active' : ''}`}>
                <Icon size={18} />
                {item.label}
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="sidebar-bottom">
        <button className="sidebar-link" onClick={toggleTheme} style={{ width: '100%', marginBottom: '8px' }}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        
        <button className="sidebar-link" onClick={logout} style={{ width: '100%', color: 'var(--accent-red)' }}>
          <LogOut size={18} />
          Log Out
        </button>

        {user && (
          <div className="sidebar-user" style={{ marginTop: '12px' }}>
            <div className="sidebar-avatar">{user.initials}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user.name}</div>
              <div className="sidebar-user-role">{user.role}</div>
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
