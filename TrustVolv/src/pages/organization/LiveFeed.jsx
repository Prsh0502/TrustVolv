import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Search } from 'lucide-react';

const events = [
  { id: 1, title: 'Building Collapse - Sector 4', location: 'Commercial Area', time: '3m ago', severity: 'critical', status: 'responding', desc: 'Multiple units requested for structural reinforcement and immediate rescue.' },
  { id: 2, title: 'Flash Flood Warning', location: 'Zone B, River Road', time: '12m ago', severity: 'high', status: 'dispatched', desc: 'Water levels rising past safe marks. Evacuation teams on route.' },
  { id: 3, title: 'Power Outage', location: 'District 9', time: '28m ago', severity: 'medium', status: 'resolved', desc: 'Main grid failed, backup generators activated successfully.' },
  { id: 4, title: 'Gas Leak', location: 'Industrial Area', time: '45m ago', severity: 'critical', status: 'active', desc: 'Evacuation of 4 block radius required immediately.' },
];

export default function LiveFeed() {
  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <h1>Live Incident Feed</h1>
          <p>Real-time updates across all emergency sectors</p>
        </div>
        <div className="top-bar-right">
          <div className="search-bar">
            <Search size={16} />
            <input type="text" placeholder="Search incidents..." />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px' }}>
        {events.map((item, i) => (
          <motion.div 
            key={item.id} 
            className="card" 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: i * 0.1 }}
            style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}
          >
            <div className={`feed-item-icon severity-${item.severity}`} style={{ width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={24} />
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '18px' }}>{item.title}</h3>
                <span className={`status-chip ${item.status === 'resolved' ? 'resolved' : item.status === 'responding' ? 'responding' : 'active'}`}>
                  <span className="dot" />{item.status}
                </span>
              </div>
              
              <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px', display: 'flex', gap: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {item.time}</span>
                <span>Location: <strong>{item.location}</strong></span>
              </div>
              
              <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '15px', lineHeight: '1.5' }}>
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
