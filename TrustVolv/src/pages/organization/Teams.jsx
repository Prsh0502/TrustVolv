import { motion } from 'framer-motion';
import { Users, Truck, Plus } from 'lucide-react';

const teams = [
  { id: 1, name: 'Medical Alpha', type: 'Medical', status: 'Deployed', capacity: '12/12', eff: '98%' },
  { id: 2, name: 'Rescue Bravo', type: 'Search & Rescue', status: 'Deployed', capacity: '8/10', eff: '92%' },
  { id: 3, name: 'Logistics Charlie', type: 'Support', status: 'Standby', capacity: '15/15', eff: '85%' },
];

export default function Teams() {
  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <h1>Manage Teams</h1>
          <p>Active and standby volunteer squads</p>
        </div>
        <div className="top-bar-right">
          <motion.button className="btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Plus size={16} /> Create Team
          </motion.button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {teams.map((team, i) => (
          <motion.div 
            key={team.id} 
            className="card" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.1 }}
            style={{ padding: '24px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  <Users size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px' }}>{team.name}</h3>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{team.type}</span>
                </div>
              </div>
              <span className={`status-chip ${team.status === 'Deployed' ? 'active' : 'available'}`}>
                <span className="dot" />{team.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Capacity</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{team.capacity}</div>
              </div>
              <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Efficiency</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--accent-green)' }}>{team.eff}</div>
              </div>
            </div>

            <button className="btn-outline" style={{ width: '100%' }}>Manage Squad</button>
          </motion.div>
        ))}
      </div>
    </>
  );
}
