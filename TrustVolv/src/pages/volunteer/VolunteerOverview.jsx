import { motion } from 'framer-motion';
import { Users, Star, CheckCircle, Clock, MapPin } from 'lucide-react';
import StatCard from '../../components/ui/StatCard';
import { useToast } from '../../components/ui/Toast';

const missionHistory = [
  { id: 'M-1042', title: 'Power Lines Down', location: 'Sector 4', duration: '1.5h', stars: 5 },
  { id: 'M-1041', title: 'Medical Supply Drop', location: 'District 9', duration: '2h', stars: 4 },
  { id: 'M-1039', title: 'Flood Evacuation', location: 'Zone B', duration: '5.5h', stars: 5 },
  { id: 'M-1035', title: 'Traffic Control', location: 'Main Highway', duration: '3h', stars: 5 },
];

const leaderboard = [
  { rank: 1, name: 'Vikram Singh', score: 99, missions: 142 },
  { rank: 2, name: 'Sneha Kumar', score: 98, missions: 135 },
  { rank: 3, name: 'Rohan Sharma', score: 97, missions: 128, isCurrent: true },
  { rank: 4, name: 'Priya Patel', score: 96, missions: 115 },
  { rank: 5, name: 'Anil Desai', score: 95, missions: 110 },
];

const reviews = [
  { name: 'Manish T.', date: '2 days ago', text: 'Rohan arrived within 10 minutes and handled the situation perfectly. Very professional.', stars: 5 },
  { name: 'Esha W.', date: '1 week ago', text: 'Great communication. Kept us informed until professional help arrived.', stars: 5 },
  { name: 'Raj S.', date: '2 weeks ago', text: 'Quick response and very helpful. Appreciate the support during the crisis.', stars: 4 },
];

export default function VolunteerOverview() {
  const { addToast } = useToast();

  const completeMission = () => {
    addToast('Mission Completed', 'Excellent work. 50 trust points have been added to your profile.', 'success');
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <h1>Volunteer Command Center</h1>
          <p>Ready to deploy and assist</p>
        </div>
        <div className="top-bar-right">
          <div className="status-chip available">
            <span className="dot" />
            On Duty
          </div>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard icon={Star} iconColor="gold" label="Trust Score" value="4.8" suffix="/5.0" />
        <StatCard icon={CheckCircle} iconColor="green" label="Missions Completed" value="47" />
        <StatCard icon={Users} iconColor="blue" label="People Helped" value="312" />
        <StatCard icon={Clock} iconColor="gold" label="Response Rating" value="96" suffix="%" badge="↑ 2%" badgeColor="green" />
      </div>

      <div className="grid-60-40">
        <div className="left-column">
          {/* Active Mission */}
          <motion.div className="card active-mission-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="card-header">
              <span className="card-title">Current Assignment</span>
              <span className="status-chip active"><span className="dot" /> Active Mission</span>
            </div>
            <div className="mission-details">
              <h2 className="mission-title">Flood Relief - Sector 7</h2>
              <div className="mission-meta">
                <span className="severity-badge severity-high">Priority: High</span>
                <span className="meta-item"><Clock size={14} /> Time elapsed: 1h 14m</span>
              </div>
              <div className="mission-location">
                <MapPin size={18} style={{ color: 'var(--accent)' }} />
                <div>
                  <strong>Sector 7, Riverside Drive</strong>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Reported 2 hours ago. Evacuation assistance required for elderly residents.</p>
                </div>
              </div>
              <div className="mission-actions">
                <motion.button 
                  className="btn btn-primary" 
                  style={{ flex: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={completeMission}
                >
                  Complete Mission
                </motion.button>
                <motion.button 
                  className="btn btn-outline" 
                  style={{ flex: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToast('Backup Requested', 'Nearby volunteers have been pinged.', 'info')}
                >
                  Request Backup
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Mission History */}
          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '20px' }}>
            <div className="card-header">
              <span className="card-title">Mission History</span>
              <span className="view-all">View All</span>
            </div>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Mission ID</th>
                    <th>Type & Location</th>
                    <th>Duration</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {missionHistory.map((m, i) => (
                    <tr key={i} className="hover-effect">
                      <td className="text-secondary">{m.id}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{m.title}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{m.location}</div>
                      </td>
                      <td>{m.duration}</td>
                      <td>
                        <div className="star-rating">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} size={14} className={`star ${j < m.stars ? 'filled' : ''}`} />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        <div className="right-column">
          {/* Trust Score Breakdown */}
          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <div className="card-header">
              <span className="card-title">Trust Score Breakdown</span>
            </div>
            <div className="progress-group">
              <div className="progress-item">
                <div className="progress-header"><span>Reliability</span><span>95%</span></div>
                <div className="progress-bar"><div className="progress-fill green" style={{ width: '95%' }}></div></div>
              </div>
              <div className="progress-item">
                <div className="progress-header"><span>Speed</span><span>88%</span></div>
                <div className="progress-bar"><div className="progress-fill gold" style={{ width: '88%' }}></div></div>
              </div>
              <div className="progress-item">
                <div className="progress-header"><span>Communication</span><span>92%</span></div>
                <div className="progress-bar"><div className="progress-fill green" style={{ width: '92%' }}></div></div>
              </div>
              <div className="progress-item">
                <div className="progress-header"><span>Skill Level</span><span>90%</span></div>
                <div className="progress-bar"><div className="progress-fill green" style={{ width: '90%' }}></div></div>
              </div>
            </div>
          </motion.div>

          {/* Reviews */}
          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '20px' }}>
            <div className="card-header">
              <span className="card-title">Recent Reviews</span>
              <span className="view-all">View All</span>
            </div>
            <div className="review-list">
              {reviews.map((r, i) => (
                <div key={i} className="review-item hover-effect">
                  <div className="review-header">
                    <span className="review-author">{r.name}</span>
                    <div className="star-rating">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={12} className={`star ${j < r.stars ? 'filled' : ''}`} />
                      ))}
                    </div>
                  </div>
                  <p className="review-text">"{r.text}"</p>
                  <div className="review-date" style={{ marginTop: '6px' }}>{r.date}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}
