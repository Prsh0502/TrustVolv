import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Bell, Shield, Phone, Moon, Globe, 
  ChevronRight, Save, ShieldAlert, Plus
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import { useTheme } from '../../context/ThemeContext';

export default function CitizenSettings() {
  const { addToast } = useToast();
  const { theme, toggleTheme } = useTheme();

  const [settings, setSettings] = useState({
    notifications: true,
    smsAlerts: true,
    anonymousReporting: false,
    locationTracking: true,
    language: 'English'
  });

  const handleSave = () => {
    addToast('Settings Saved', 'Your preferences have been updated successfully.', 'success');
  };

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <h1>Settings & Preferences</h1>
          <p>Customize your TrustVolv safety experience</p>
        </div>
        <div className="top-bar-right">
          <button className="btn btn-primary" onClick={handleSave}>
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>

      <div className="grid-60-40" style={{ gap: '24px' }}>
        {/* Left Column: Toggles and Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <motion.div className="card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h3 className="section-title" style={{ fontSize: '18px', marginBottom: '20px' }}>
              <User size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }}/> Account Profile
            </h3>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" defaultValue="Sneha Kumar" />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input type="text" className="form-input" defaultValue="+91 98765 43210" />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" defaultValue="sneha.k@example.com" />
              </div>
            </div>
          </motion.div>

          <motion.div className="card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="section-title" style={{ fontSize: '18px', marginBottom: '20px' }}>
              <Bell size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }}/> Notification Preferences
            </h3>
            
            <div className="setting-row">
              <div className="setting-info">
                <h4>Push Notifications</h4>
                <p>Receive live alerts and updates on your phone</p>
              </div>
              <div className={`custom-toggle ${settings.notifications ? 'active' : ''}`} onClick={() => handleToggle('notifications')}>
                <div className="toggle-slider"></div>
              </div>
            </div>

            <div className="setting-row">
              <div className="setting-info">
                <h4>SMS Emergency Alerts</h4>
                <p>Crucial for severe local emergencies when data is off</p>
              </div>
              <div className={`custom-toggle ${settings.smsAlerts ? 'active' : ''}`} onClick={() => handleToggle('smsAlerts')}>
                <div className="toggle-slider"></div>
              </div>
            </div>
          </motion.div>

          <motion.div className="card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h3 className="section-title" style={{ fontSize: '18px', marginBottom: '20px' }}>
              <Shield size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }}/> Privacy & Security
            </h3>
            
            <div className="setting-row">
              <div className="setting-info">
                <h4>Anonymous Mode</h4>
                <p>Automatically hide your identity when submitting reports</p>
              </div>
              <div className={`custom-toggle ${settings.anonymousReporting ? 'active' : ''}`} onClick={() => handleToggle('anonymousReporting')}>
                <div className="toggle-slider"></div>
              </div>
            </div>

            <div className="setting-row">
              <div className="setting-info">
                <h4>Precise Location Tracking</h4>
                <p>Allows faster dispatch during SOS activations</p>
              </div>
              <div className={`custom-toggle ${settings.locationTracking ? 'active' : ''}`} onClick={() => handleToggle('locationTracking')}>
                <div className="toggle-slider"></div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Emergency Contacts and App Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <motion.div className="card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="section-title" style={{ fontSize: '18px', margin: 0 }}>
                <Phone size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }}/> Emergency Contacts
              </h3>
              <button className="btn-icon" title="Add Contact" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                <Plus size={16} />
              </button>
            </div>
            
            <div className="contact-list">
              <div className="contact-item">
                <div className="contact-avatar">RK</div>
                <div className="contact-details">
                  <h4>Rajesh Kumar</h4>
                  <p>Father • +91 91234 56789</p>
                </div>
                <ChevronRight size={16} color="var(--text-tertiary)" />
              </div>

              <div className="contact-item">
                <div className="contact-avatar">AM</div>
                <div className="contact-details">
                  <h4>Anjali Mehta</h4>
                  <p>Sister • +91 99887 77665</p>
                </div>
                <ChevronRight size={16} color="var(--text-tertiary)" />
              </div>
            </div>
            <div style={{ marginTop: '16px', padding: '12px', background: 'var(--accent-orange-soft)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-orange)' }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-orange)', fontSize: '13px', margin: 0 }}>
                <ShieldAlert size={16} /> These contacts will be automatically notified if you trigger an SOS.
              </p>
            </div>
          </motion.div>

          <motion.div className="card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <h3 className="section-title" style={{ fontSize: '18px', marginBottom: '20px' }}>App Settings</h3>
            
            <div className="setting-row">
              <div className="setting-info" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="setting-iconBox"><Globe size={18} /></div>
                <div>
                  <h4>Language</h4>
                  <p>Current: {settings.language}</p>
                </div>
              </div>
              <select className="form-select" style={{ width: 'auto', padding: '6px 12px' }} value={settings.language} onChange={(e) => setSettings({...settings, language: e.target.value})}>
                <option>English</option>
                <option>Hindi</option>
                <option>Marathi</option>
              </select>
            </div>

            <div className="setting-row" style={{ borderBottom: 'none' }}>
              <div className="setting-info" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="setting-iconBox"><Moon size={18} /></div>
                <div>
                  <h4>Appearance</h4>
                  <p>Toggle Light / Dark mode</p>
                </div>
              </div>
              <button className="btn btn-outline btn-sm" onClick={toggleTheme}>
                Switch Mode
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    </>
  );
}
