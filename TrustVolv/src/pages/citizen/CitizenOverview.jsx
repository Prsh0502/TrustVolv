import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { 
  AlertCircle, FileText, Shield, Plus, AlertTriangle, 
  PhoneCall, HeartPulse, ChevronRight, Info 
} from 'lucide-react';
import StatCard from '../../components/ui/StatCard';

const suggestions = [
  {
    id: 1,
    type: 'Avoid this route',
    desc: 'Heavy congestion and emergency vehicle movement near Dadar East.',
    location: 'Dadar East Junction',
    urgency: 'critical',
    action: 'View on Map'
  },
  {
    id: 2,
    type: 'Safe alternative path',
    desc: 'Use Tilak Road instead of the blocked main junction to reach your destination smoothly.',
    location: 'Tilak Road',
    urgency: 'safe',
    action: 'Navigate'
  }
];

const myReports = [
  { id: '1', title: 'Street Light Out - Block C', status: 'resolved', date: 'Mar 28, 2026' },
  { id: '2', title: 'Suspicious Activity Near Park', status: 'in-progress', date: 'Mar 26, 2026' },
];

export default function CitizenOverview() {
  const navigate = useNavigate();

  return (
    <div className="citizen-home">
      
      {/* Reassuring Welcome Hero */}
      <motion.div 
        className="welcome-card card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="welcome-content">
          <h1>Welcome, Sneha. You are safe.</h1>
          <p>We are monitoring <strong>12</strong> active alerts in your designated area. Authorities and volunteers are actively responding.</p>
        </div>
        <div className="welcome-status">
          <div className="status-chip available pulse-dot" style={{ padding: '8px 16px', fontSize: '14px' }}>
            <span className="dot" />
            All Systems Operational
          </div>
        </div>
      </motion.div>

      {/* Primary Emergency Actions */}
      <motion.div 
        className="emergency-actions"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="ea-header">
           <Shield size={20} color="var(--text-secondary)" />
           <h3>Emergency Quick Actions</h3>
        </div>
        <div className="ea-buttons-grid">
           <button className="ea-btn btn-danger-pulse" onClick={() => alert('SOS Triggered. Countdown started.')}>
              <AlertCircle size={32} />
              <span>SOS Emergency</span>
              <small>Notify Contacts & Authorities</small>
           </button>
           <button className="ea-btn btn-police">
              <Shield size={32} />
              <span>Call Police</span>
              <small>Dial 100</small>
           </button>
           <button className="ea-btn btn-ambulance">
              <HeartPulse size={32} />
              <span>Ambulance</span>
              <small>Dial 108</small>
           </button>
           <button className="ea-btn btn-fire">
              <FlameIcon size={32} />
              <span>Fire Rescue</span>
              <small>Dial 101</small>
           </button>
        </div>
      </motion.div>

      {/* Quick Summary Stats */}
      <div className="stat-grid" style={{ marginTop: '32px' }}>
        <StatCard icon={FileText} iconColor="blue" label="Reports Submitted" value="7" />
        <StatCard icon={AlertTriangle} iconColor="orange" label="Active Alerts Nearby" value="3" badge="Check Map" badgeColor="orange" />
        <StatCard icon={Shield} iconColor="green" label="Resolved Requests" value="5" />
      </div>

      <div className="grid-60-40" style={{ gap: '24px', marginTop: '32px' }}>
        
        {/* Smart Safety Suggestions */}
        <div className="left-panel" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card-header" style={{ marginBottom: 0 }}>
             <h3 className="section-title" style={{ fontSize: '20px' }}>✨ Smart Safety Guidance</h3>
          </div>
          
          {suggestions.map((s, i) => (
             <motion.div 
                key={s.id} 
                className="card suggestion-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
             >
                <div className={`sg-accent-bar ${s.urgency}`} />
                <div className="sg-content">
                  <div className="sg-top">
                     <h4>{s.type}</h4>
                     <span className={`status-chip ${s.urgency === 'critical' ? 'active' : 'available'}`} style={{ fontSize: '10px' }}>
                        <span className="dot"/> {s.location}
                     </span>
                  </div>
                  <p>{s.desc}</p>
                  <button className="btn-outline btn-sm sg-action">
                    {s.action} <ChevronRight size={14} />
                  </button>
                </div>
             </motion.div>
          ))}
        </div>

        {/* Recent Reports Preview */}
        <div className="right-panel">
           <div className="card">
              <div className="card-header">
                <span className="card-title">Recent Reports</span>
                <span className="view-all" onClick={() => navigate('/citizen/reports')}>View Timeline</span>
              </div>
              <div className="feed-list">
                {myReports.map((r, i) => (
                  <div key={i} className="feed-item hover-effect" onClick={() => navigate('/citizen/reports')} style={{ cursor: 'pointer' }}>
                    <div className="feed-item-icon" style={{ background: 'var(--accent-blue-soft)', color: 'var(--accent-blue)' }}>
                      <FileText size={14} />
                    </div>
                    <div className="feed-item-content">
                      <div className="feed-item-title">{r.title}</div>
                      <div className="feed-item-meta">{r.date}</div>
                    </div>
                    <div className="feed-item-right">
                      <span className={`status-chip ${r.status === 'resolved' ? 'resolved' : 'responding'}`}>
                        <span className="dot" />{r.status === 'in-progress' ? 'In Progress' : r.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '8px' }} onClick={() => navigate('/citizen/report')}>
                <Plus size={16} /> File New Report
              </button>
           </div>
        </div>

      </div>

    </div>
  );
}

function FlameIcon({ size }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  );
}
