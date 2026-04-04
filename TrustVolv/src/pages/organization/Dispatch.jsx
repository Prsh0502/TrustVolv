import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, AlertTriangle, MapPin, Send, CheckCircle } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

const volunteers = [
  { id: 'V101', name: 'Rohan Sharma', spec: 'Medical / First Aid', score: 4.8, status: 'available', distance: '1.2km' },
  { id: 'V105', name: 'Jyoti Verma', spec: 'Medical / First Aid', score: 4.9, status: 'available', distance: '2.5km' },
  { id: 'V102', name: 'Sneha Kumar', spec: 'Search & Rescue', score: 4.9, status: 'on-mission', distance: '0.8km' },
  { id: 'V103', name: 'Anil D.', spec: 'Logistics', score: 4.5, status: 'available', distance: '3.1km' },
  { id: 'V104', name: 'Priya P.', spec: 'Communication', score: 4.7, status: 'off-duty', distance: '5.0km' },
];

export default function Dispatch() {
  const { addToast } = useToast();
  const [activeVolunteers, setActiveVolunteers] = useState(volunteers);
  
  const handleDispatch = (id) => {
    setActiveVolunteers(prev => prev.map(v => v.id === id ? { ...v, status: 'on-mission' } : v));
    addToast('Volunteer Dispatched', 'Mission details sent to their device successfully.', 'success');
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <h1>Volunteer Dispatch Center</h1>
          <p>Assign qualified personnel to critical areas instantly</p>
        </div>
      </div>

      <div className="grid-2">
        {/* Left Col - Current Incidents Needing Help */}
        <motion.div className="card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="card-header" style={{ marginBottom: 16 }}>
            <span className="card-title">Incidents Requiring Dispatch</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { title: 'Building Collapse - Sector 4', reqs: '2 Medical, 1 Rescue', priority: 'Critical' },
              { title: 'Flash Flood Evacuation - Zone B', reqs: '3 Transport, 2 Logsitics', priority: 'High' }
            ].map((incident, idx) => (
              <div key={idx} style={{ 
                border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-md)', padding: 16,
                background: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-red)'
              }}>
                <h3 style={{ fontSize: 16, marginBottom: 4 }}>{incident.title}</h3>
                <div style={{ display: 'flex', gap: 12, color: 'var(--text-secondary)', fontSize: 13, marginBottom: 12 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><AlertTriangle size={14}/> {incident.priority} Priority</span>
                </div>
                <div style={{ padding: '8px 12px', background: 'var(--bg-card)', borderRadius: 4, border: '1px dashed var(--border-color)' }}>
                  <strong>Missing Resources:</strong> {incident.reqs}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Col - Available Personnel */}
        <motion.div className="card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="card-header" style={{ marginBottom: 16 }}>
            <span className="card-title">Available Personnel</span>
            <span className="status-chip available"><span className="dot" /> {activeVolunteers.filter(v=>v.status==='available').length} Standby</span>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <div className="input-with-icon" style={{ flex: 1 }}>
              <Search size={16} className="input-icon" />
              <input type="text" className="form-input" placeholder="Search skills (e.g. Medical)" />
            </div>
            <button className="btn-outline" style={{ padding: '0 12px' }}><Filter size={16}/></button>
          </div>

          <div className="dispatch-list" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <AnimatePresence>
              {activeVolunteers.map((v) => (
                <motion.div 
                  key={v.id} 
                  className="dispatch-row hover-effect" 
                  style={{ 
                    padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', 
                    borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 12 
                  }}
                  layout
                >
                  <div className="dispatch-avatar" style={{ width: 40, height: 40 }}>{v.name.charAt(0)}</div>
                  <div className="dispatch-info" style={{ flex: 1 }}>
                    <div className="dispatch-name" style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{v.name}</div>
                    <div className="dispatch-spec" style={{ color: 'var(--text-tertiary)', fontSize: 12 }}>{v.spec} • <MapPin size={10}/> {v.distance}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span className="dispatch-score" style={{ fontWeight: 600, color: 'var(--accent)' }}>★ {v.score}</span>
                    {v.status === 'available' ? (
                      <motion.button 
                        className="btn btn-primary btn-sm" 
                        style={{ padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDispatch(v.id)}
                      >
                        <Send size={14}/> Dispatch
                      </motion.button>
                    ) : (
                      <span className={`status-chip ${v.status}`} style={{ minWidth: 100, justifyContent: 'center' }}>
                        <span className="dot" />{v.status.replace('-', ' ')}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  );
}
