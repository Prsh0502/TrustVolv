import { motion } from 'framer-motion';
import { AlertTriangle, Clock, MapPin, Search, Filter, PhoneCall, ShieldAlert } from 'lucide-react';

const activeEmergencies = [
  { id: 'E-4091', title: 'Level 4 Building Collapse', location: 'Commercial Area, Sector 4', reported: '3 mins ago', priority: 'critical', unitsDeployed: 8, eta: '2 mins' },
  { id: 'E-4088', title: 'Industrial Gas Leak', location: 'Powai Industrial Park', reported: '18 mins ago', priority: 'critical', unitsDeployed: 12, eta: 'Arrived' },
  { id: 'E-4090', title: 'Flash Flood Warning', location: 'Zone B, River Road', reported: '12 mins ago', priority: 'high', unitsDeployed: 4, eta: '10 mins' },
  { id: 'E-4082', title: 'Major Traffic Collision', location: 'Highway Interstate', reported: '35 mins ago', priority: 'high', unitsDeployed: 5, eta: 'Arrived' },
  { id: 'E-4075', title: 'Widespread Power Outage', location: 'District 9', reported: '1h 12m ago', priority: 'medium', unitsDeployed: 2, eta: 'Investigating' },
];

export default function ActiveEmergencies() {
  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <h1>Active Emergencies</h1>
          <p>Real-time tracking of critical operations across the sector</p>
        </div>
        <div className="top-bar-right">
          <motion.button 
            className="btn-danger" 
            whileHover={{ scale: 1.04 }} 
            whileTap={{ scale: 0.97 }}
          >
            <ShieldAlert size={16} /> Override Protocol
          </motion.button>
        </div>
      </div>

      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="card-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
          <div className="input-with-icon" style={{ flex: 1, maxWidth: '300px' }}>
            <Search size={16} className="input-icon" />
            <input type="text" className="form-input" placeholder="Search Emergency ID or Location..." />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-outline">
              <Filter size={16} /> Filter by Severity
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {activeEmergencies.map((emer, idx) => (
            <motion.div 
              key={emer.id}
              className="hover-effect"
              style={{ 
                border: '1px solid var(--border-color)', 
                borderRadius: 'var(--radius-md)', 
                overflow: 'hidden',
                background: 'var(--bg-card)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)', borderColor: emer.priority === 'critical' ? 'var(--accent-red)' : 'var(--border-accent)' }}
            >
              <div style={{ padding: '4px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', 
                backgroundColor: emer.priority === 'critical' ? 'var(--accent-red)' : emer.priority === 'high' ? 'var(--accent-orange)' : 'var(--accent-blue)',
                color: emer.priority === 'medium' ? 'white' : 'white'
              }}>
                {emer.priority} PRIORITY
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', margin: 0, paddingRight: '12px' }}>{emer.title}</h3>
                  <span style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-tertiary)', background: 'var(--bg-secondary)', padding: '4px 8px', borderRadius: '4px' }}>
                    {emer.id}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                    <MapPin size={16} color="var(--text-tertiary)" />
                    <span>{emer.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                    <Clock size={16} color="var(--text-tertiary)" />
                    <span>Reported {emer.reported}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-color)', marginBottom: '16px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--accent)' }}>{emer.unitsDeployed}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Units Active</div>
                  </div>
                  <div style={{ width: '1px', height: '30px', background: 'var(--border-color)' }}></div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-primary)' }}>{emer.eta}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Response ETA</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <motion.button className="btn btn-primary" style={{ flex: 1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    View Map
                  </motion.button>
                  <motion.button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', padding: 0 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <PhoneCall size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
