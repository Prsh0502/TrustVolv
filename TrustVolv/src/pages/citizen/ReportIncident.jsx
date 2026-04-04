import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, MapPin, AlertTriangle, ChevronDown, 
  UploadCloud, UserX, Phone
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

export default function ReportIncident() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({ 
    title: '',
    category: 'Accident', 
    description: '', 
    location: '', 
    severity: 'Medium',
    phone: '',
    anonymous: false,
    media: null 
  });

  const categories = [
    'Accident', 'Fire', 'Flood', 'Medical Emergency', 
    'Public Safety', 'Road Blockage', 'Infrastructure Issue', 'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.description) {
      addToast('Error', 'Please fill in all required fields.', 'error');
      return;
    }
    addToast('Incident Reported Successfully', 'Emergency services have been notified and volunteers are being alerted.', 'success');
    setFormData({ 
      title: '', category: 'Accident', description: '', 
      location: '', severity: 'Medium', phone: '', anonymous: false, media: null 
    });
  };

  const handleToggle = (key) => setFormData({ ...formData, [key]: !formData[key] });

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <h1>Report an Incident</h1>
          <p>Submit details for immediate emergency response or community help.</p>
        </div>
      </div>

      <motion.div 
        className="card form-card" 
        style={{ maxWidth: '800px', margin: '0 auto', padding: '32px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <form onSubmit={handleSubmit} className="rr-form">
          <div className="form-group mb-4">
            <label className="form-label">Incident Title *</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Major collision on Highway 42" 
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid-2 mb-4">
            <div className="form-group">
              <label className="form-label">Category *</label>
              <div className="select-wrapper">
                <select 
                  className="form-select" 
                  value={formData.category} 
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={14} className="select-icon" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Severity Level</label>
              <div className="severity-selector">
                {['Low', 'Medium', 'High', 'Critical'].map(level => (
                  <button 
                    type="button" 
                    key={level}
                    className={`severity-btn ${formData.severity === level ? 'active ' + level.toLowerCase() : ''}`}
                    onClick={() => setFormData({...formData, severity: level})}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group mb-4">
            <label className="form-label">Exact Location *</label>
            <div className="location-input-group">
              <MapPin size={18} className="input-icon" />
              <input 
                type="text" 
                className="form-input with-icon" 
                placeholder="Enter nearby landmark or address" 
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
              />
              <button 
                type="button" 
                className="btn btn-secondary gps-btn" 
                onClick={() => {
                  setFormData({...formData, location: 'GPS Coords: 19.123, 72.456'});
                  addToast('Location Acquired', 'Current GPS coordinates attached to report', 'info');
                }}
              >
                Use GPS
              </button>
            </div>
          </div>

          <div className="form-group mb-4">
            <label className="form-label">Description & Details *</label>
            <textarea 
              className="form-input textarea-tall" 
              placeholder="Describe the number of people involved, visible dangers, etc."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Privacy & Contact Row */}
          <div className="grid-2 mb-4" style={{ alignItems: 'center' }}>
            <div className="form-group mb-0">
               <label className="form-label">Contact Number (Optional)</label>
               <div className="location-input-group">
                 <Phone size={18} className="input-icon" />
                 <input 
                   type="text" 
                   className="form-input with-icon" 
                   placeholder="e.g. +91 99999 00000" 
                   value={formData.phone}
                   onChange={e => setFormData({ ...formData, phone: e.target.value })}
                 />
               </div>
            </div>
            
            <div className="setting-row" style={{ borderBottom: 'none', padding: '16px 0 0 0' }}>
               <div className="setting-info" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div className="setting-iconBox"><UserX size={18} /></div>
                  <div>
                     <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)' }}>Report Anonymously</h4>
                     <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-tertiary)' }}>Hide identity from responders</p>
                  </div>
               </div>
               <div className={`custom-toggle ${formData.anonymous ? 'active' : ''}`} onClick={() => handleToggle('anonymous')}>
                  <div className="toggle-slider"></div>
               </div>
            </div>
          </div>

          <div className="form-group mb-4">
            <label className="form-label">Photo / Video Evidence</label>
            <div className="media-upload-zone hover-effect">
              <UploadCloud size={36} className="upload-icon" />
              <h4>Drag & drop media here</h4>
              <p>Supports Image (JPG, PNG) and Video (MP4) up to 50MB</p>
              <input type="file" className="file-input-hidden" multiple accept="image/*,video/*" />
            </div>
          </div>

          <motion.button 
            type="submit" 
            className="btn btn-primary submit-btn" 
            style={{ width: '100%', padding: '16px' }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            Submit Incident Report
          </motion.button>
        </form>
      </motion.div>
    </>
  );
}
