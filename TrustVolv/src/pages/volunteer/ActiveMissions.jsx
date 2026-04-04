import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

const activeMissions = [
  { id: 'M-1102', title: 'Medical Supply Drop', location: 'District 9 Clinic', distance: '1.2 km', priority: 'high', type: 'Medical' },
  { id: 'M-1104', title: 'Traffic Control', location: 'Main Highway Intersection', distance: '3.5 km', priority: 'medium', type: 'Logistics' },
  { id: 'M-1107', title: 'Evacuation Assistance', location: 'Sector 4, Riverside', distance: '4.1 km', priority: 'critical', type: 'Rescue' },
  { id: 'M-1108', title: 'Food Distribution', location: 'Community Center Shelters', distance: '5.0 km', priority: 'low', type: 'Support' },
];

export default function ActiveMissions() {
  const { addToast } = useToast();

  const handleAction = (id, type) => {
    if (type === 'accept') {
      addToast('Mission Accepted', `You have accepted ${id}. Navigational routing started.`, 'success');
    } else {
      addToast('Mission Declined', `You declined ${id}. Assigned to next available volunteer.`, 'info');
    }
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <h1>Active Missions</h1>
          <p>Available deployments waiting for response</p>
        </div>
      </div>

      <div className="grid-2">
        {activeMissions.map((mission, i) => (
          <motion.div 
            key={mission.id} 
            className="card hover-effect"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * i }}
          >
            <div className="card-header" style={{ marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className={`severity-badge severity-${mission.priority}`} style={{ alignSelf: 'flex-start', marginBottom: '8px' }}>
                  {mission.priority.toUpperCase()} PRIORITY
                </span>
                <span style={{ fontSize: '18px', fontWeight: 700 }}>{mission.title}</span>
                <span style={{ color: 'var(--text-tertiary)', fontSize: '13px' }}>ID: {mission.id}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <MapPin size={16} /> <span>{mission.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <Navigation size={16} /> <span>{mission.distance} away</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <Clock size={16} /> <span>Est. Duration: 1-2 Hours</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <motion.button 
                className="btn btn-primary" 
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAction(mission.id, 'accept')}
              >
                <CheckCircle size={18} /> Accept
              </motion.button>
              <motion.button 
                className="btn btn-outline" 
                style={{ padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--text-secondary)' }}
                whileHover={{ scale: 1.02, backgroundColor: 'var(--bg-secondary)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAction(mission.id, 'decline')}
              >
                <XCircle size={18} /> Decline
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
