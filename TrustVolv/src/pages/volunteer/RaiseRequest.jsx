import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, MapPin, AlertTriangle, ChevronDown, CheckCircle2, 
  Clock, XCircle, Search, UploadCloud, Map, Megaphone, ShieldAlert,
  Droplets, Wrench, MoreHorizontal, MessageSquare
} from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import './RaiseRequest.css';

const MOCK_REQUESTS = [
  {
    id: 1,
    title: 'Severe Water Pipe Burst',
    category: 'Water Leakage',
    location: 'Main Street Intersection, Sector 4',
    severity: 'High',
    status: 'Under Review',
    postedBy: 'Alex Kumar',
    time: '2 hours ago',
    supportNeeded: 'Municipality Needed',
    image: 'https://tse1.mm.bing.net/th/id/OIP.VbAhULsjcY45iPRnu2viqQHaEK?pid=Api&P=0&h=180',
    icon: Droplets
  },
  {
    id: 2,
    title: 'Damaged Streetlight - Total Blackout',
    category: 'Public Safety',
    location: 'Riverfront Walkway',
    severity: 'Medium',
    status: 'Open',
    postedBy: 'Meera Patel',
    time: '5 hours ago',
    supportNeeded: 'Organization Required',
    image: 'https://vorlane.com/wp-content/uploads/2022/12/street-light-maintenance-2.png.webp',
    icon: ShieldAlert
  },
  {
    id: 3,
    title: 'Pothole Causing Traffic Hazard',
    category: 'Road Damage',
    location: 'Avenue 12, near City Mall',
    severity: 'Critical',
    status: 'Assigned',
    postedBy: 'Rahul Singh',
    time: '1 day ago',
    supportNeeded: 'Volunteer Action',
    image: 'https://thecomplaintsresolver.co.uk/wp-content/uploads/2023/09/Pothole--857x675.jpg',
    icon: Wrench
  }
];

const NEARBY_REQUESTS = [
  { id: 101, title: 'Fallen Tree Blocking Sidewalk', distance: '0.2 miles away', severity: 'Medium' },
  { id: 102, title: 'Overflowing Public Bin', distance: '0.5 miles away', severity: 'Low' },
  { id: 103, title: 'Traffic Signal Malfunction', distance: '1.1 miles away', severity: 'High' }
];

export default function RaiseRequest() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Road Damage',
    description: '',
    location: '',
    severity: 'Medium',
    actionType: 'Needs organization support',
    media: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.description) {
      addToast('Error', 'Please fill in all required fields.', 'error');
      return;
    }
    addToast('Request Raised Successfully', 'Your community issue has been logged and organizations notified.', 'success');
    setFormData({
      title: '',
      category: 'Road Damage',
      description: '',
      location: '',
      severity: 'Medium',
      actionType: 'Needs organization support',
      media: null
    });
  };

  const categories = [
    'Road Damage', 'Streetlight Issue', 'Water Leakage', 
    'Sanitation', 'Public Safety', 'Community Need', 'Medical Support', 'Other'
  ];

  const actionTypes = [
    'Needs organization support', 'Volunteer-led fix possible', 'Public awareness needed', 'Escalate urgently'
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Open': return <span className="rr-status-chip open"><span className="dot"></span>Open</span>;
      case 'Under Review': return <span className="rr-status-chip review"><span className="dot"></span>Under Review</span>;
      case 'Assigned': return <span className="rr-status-chip assigned"><span className="dot"></span>Assigned</span>;
      case 'Resolved': return <span className="rr-status-chip resolved"><span className="dot"></span>Resolved</span>;
      default: return <span className="rr-status-chip"><span className="dot"></span>Unknown</span>;
    }
  };

  const getSeverityBadge = (severity) => {
    switch(severity) {
      case 'Critical': return <span className="rr-severity-badge critical">Critical</span>;
      case 'High': return <span className="rr-severity-badge high">High</span>;
      case 'Medium': return <span className="rr-severity-badge medium">Medium</span>;
      case 'Low': return <span className="rr-severity-badge low">Low</span>;
      default: return null;
    }
  };

  return (
    <div className="raise-request-page">
      <div className="top-bar">
        <div className="top-bar-left">
          <h1>Raise Request & Report Issues</h1>
          <p>Highlight community issues or urgent needs for rapid volunteer & organizational action.</p>
        </div>
        <div className="top-bar-right">
          <button className="btn btn-outline" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Map size={16} /> Area Map View
          </button>
        </div>
      </div>

      <div className="grid-60-40 split-layout">
        {/* Left Column: Form */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="form-header">
            <Megaphone size={24} className="header-icon" />
            <div>
              <h3>Submit a New Issue</h3>
              <p className="subtitle">Provide detailed information to help address the problem efficiently.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rr-form">
            <div className="form-group">
              <label className="form-label">Issue Title *</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Broken pavement near Central Park" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Category *</label>
                <div className="select-wrapper">
                  <select 
                    className="form-select" 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={14} className="select-icon" />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Suggested Action *</label>
                <div className="select-wrapper">
                  <select 
                    className="form-select" 
                    value={formData.actionType}
                    onChange={e => setFormData({...formData, actionType: e.target.value})}
                  >
                    {actionTypes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={14} className="select-icon" />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Exact Location *</label>
              <div className="location-input-group">
                <MapPin size={18} className="input-icon" />
                <input 
                  type="text" 
                  className="form-input with-icon" 
                  placeholder="Enter landmark, street, or GPS link" 
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                />
                <button 
                  type="button" 
                  className="btn btn-secondary gps-btn"
                  onClick={() => {
                    setFormData({...formData, location: 'Current GPS Coordinates Acquired...'});
                    addToast('Location Fixed', 'Using your device GPS.', 'info');
                  }}
                >
                  Use GPS
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea 
                className="form-input textarea-tall" 
                placeholder="Provide as much detail as possible about the issue, hazards, and who it affects..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              ></textarea>
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

            <div className="form-group">
              <label className="form-label">Photo / Video Evidence (Optional)</label>
              <div className="media-upload-zone hover-effect">
                <UploadCloud size={36} className="upload-icon" />
                <h4>Drag & drop files or click to browse</h4>
                <p>Supports Images (JPG, PNG) and Videos (MP4, MOV) up to 50MB</p>
                <input type="file" className="file-input-hidden" multiple accept="image/*,video/*" />
              </div>
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              Raise Request
            </button>
          </form>
        </motion.div>

        {/* Right Column: Open & Nearby Requests */}
        <div className="right-panel">
          <div className="section-header">
            <h3>Nearby Requests</h3>
            <span className="view-all">View Map</span>
          </div>
          <motion.div 
            className="card glass-card shadow-sm mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="nearby-list">
              {NEARBY_REQUESTS.map((req, i) => (
                <div className="nearby-item" key={req.id}>
                  <div className="nearby-info">
                    <p className="nearby-title">{req.title}</p>
                    <p className="nearby-distance">
                      <MapPin size={12} /> {req.distance}
                    </p>
                  </div>
                  {getSeverityBadge(req.severity)}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="section-header mt-4">
            <h3 style={{ display:'flex', alignItems:'center', gap:'8px'}}>
               <Search size={18} /> Open Community Requests
            </h3>
            <span className="view-all">Filter</span>
          </div>

          <div className="requests-feed">
            {MOCK_REQUESTS.map((req, i) => {
              const Icon = req.icon;
              return (
                <motion.div 
                  className="request-card" 
                  key={req.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + (i * 0.1) }}
                >
                  <div className="rc-image-wrapper">
                    <img src={req.image} alt={req.title} className="rc-image" />
                    <div className="rc-badges-top">
                      {getSeverityBadge(req.severity)}
                    </div>
                  </div>
                  
                  <div className="rc-content">
                    <div className="rc-meta-top">
                      <span className="rc-category">
                        <Icon size={12} /> {req.category}
                      </span>
                      {getStatusBadge(req.status)}
                    </div>
                    
                    <h4 className="rc-title">{req.title}</h4>
                    
                    <p className="rc-location">
                      <MapPin size={14} /> {req.location}
                    </p>
                    
                    <div className="rc-footer">
                      <div className="rc-author">
                        <div className="avatar-sm">{req.postedBy.charAt(0)}</div>
                        <span>{req.postedBy} • {req.time}</span>
                      </div>
                      
                      <div className="action-buttons">
                        <button className="btn-icon" title="Forward to Organization" onClick={() => addToast('Request Forwarded', 'Forwarded to partner NGOs', 'info')}>
                           <span className="sr-only">Forward</span>
                           <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path></svg>
                        </button>
                        <button className="btn btn-sm btn-outline btn-support">
                          Support
                        </button>
                      </div>
                    </div>
                    <div className="rc-support-tag">
                      <Wrench size={12}/> Tag: {req.supportNeeded}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
