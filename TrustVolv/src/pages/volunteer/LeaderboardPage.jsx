import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, Shield, CheckCircle, Search, Filter, 
  Clock, Star, TrendingUp, Users, Heart, 
  MapPin, ChevronDown, Info
} from 'lucide-react';
import StatCard from '../../components/ui/StatCard';

// Extended Mock Data with Indian names and impact metrics
const INITIAL_DATA = [
  { 
    rank: 1, id: 'V-001', name: 'Vikram Singh', expertise: 'Medical Responder', 
    rating: 4.9, missions: 142, rescues: 38, avgResponse: '9m', trustScore: 99, 
    status: 'available', location: 'Mumbai West', matches: 98,
    badges: ['First Responder', 'Top Rated', 'Local Expert'],
    avatar: 'VS', reviews: 'Reached quickly during flood situation. Very professional and calm.'
  },
  { 
    rank: 2, id: 'V-002', name: 'Sneha Kumar', expertise: 'Logistics Specialist', 
    rating: 4.8, missions: 135, rescues: 24, avgResponse: '12m', trustScore: 98, 
    status: 'on-mission', location: 'Pune Central', matches: 95,
    badges: ['Rescue Specialist', 'Fast Responder'],
    avatar: 'SK', reviews: 'Excellent coordination during food distribution drive.'
  },
  { 
    rank: 3, id: 'V-003', name: 'Rohan Sharma', expertise: 'Medical Responder', 
    rating: 4.8, missions: 128, rescues: 31, avgResponse: '11m', trustScore: 97, 
    status: 'available', location: 'Delhi South', matches: 92, isCurrent: true,
    badges: ['Top Rated', 'First Responder'],
    avatar: 'RS', reviews: 'Very calm and helpful in emergency situations.'
  },
  { 
    rank: 4, id: 'V-004', name: 'Priya Patel', expertise: 'Search & Rescue', 
    rating: 4.7, missions: 115, rescues: 19, avgResponse: '14m', trustScore: 96, 
    status: 'available', location: 'Ahmedabad East', matches: 90,
    badges: ['Rescue Specialist'],
    avatar: 'PP'
  },
  { 
    rank: 5, id: 'V-005', name: 'Anil Desai', expertise: 'Infrastructure Support', 
    rating: 4.7, missions: 110, rescues: 12, avgResponse: '16m', trustScore: 95, 
    status: 'off-duty', location: 'Mumbai North', matches: 88,
    badges: ['Local Area Expert'],
    avatar: 'AD'
  },
  { 
    rank: 6, id: 'V-006', name: 'Kavita Reddy', expertise: 'Medical Responder', 
    rating: 4.6, missions: 105, rescues: 22, avgResponse: '13m', trustScore: 94, 
    status: 'available', location: 'Hyderabad IT', matches: 86,
    badges: ['Medical Ace'],
    avatar: 'KR'
  },
  { 
    rank: 7, id: 'V-007', name: 'Ahmad Khan', expertise: 'Civic Coordination', 
    rating: 4.5, missions: 98, rescues: 8, avgResponse: '18m', trustScore: 93, 
    status: 'on-mission', location: 'Lucknow City', matches: 84,
    badges: ['Field Expert'],
    avatar: 'AK'
  },
  { 
    rank: 8, id: 'V-008', name: 'Jyoti Verma', expertise: 'Search & Rescue', 
    rating: 4.5, missions: 92, rescues: 15, avgResponse: '15m', trustScore: 92, 
    status: 'available', location: 'Indore Suburban', matches: 82,
    badges: ['Rescue Specialist'],
    avatar: 'JV'
  },
];

export default function LeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExpertise, setFilterExpertise] = useState('All');
  const [sortBy, setSortBy] = useState('trustScore'); // trustScore, missions, rating

  const filteredData = useMemo(() => {
    return INITIAL_DATA
      .filter(v => 
        (filterExpertise === 'All' || v.expertise.includes(filterExpertise)) &&
        v.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => b[sortBy] - a[sortBy]);
  }, [searchTerm, filterExpertise, sortBy]);

  const top3 = INITIAL_DATA.slice(0, 3);
  // Reorder for visual: 2, 1, 3
  const heroVolunteers = [top3[1], top3[0], top3[2]];

  return (
    <div className="leaderboard-enhanced">
      {/* Header section with Stats */}
      <div className="top-bar">
        <div className="top-bar-left">
          <h1>Responders Excellence</h1>
          <p>Community trust index and impact recognition</p>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard icon={Users} label="Active Volunteers" value="1,248" badge="+12" iconColor="blue" />
        <StatCard icon={Star} label="Avg Network Rating" value="4.85" iconColor="gold" />
        <StatCard icon={Heart} label="Month's Rescues" value="856" badge="↑ 14%" iconColor="red" />
        <StatCard icon={Clock} label="Response Efficiency" value="14" suffix="m avg" iconColor="gold" />
      </div>

      {/* Hero Volunteers Section (Top 3) */}
      <div className="hero-recognition-grid" style={{ marginBottom: '32px' }}>
        {heroVolunteers.map((vol, idx) => (
          <motion.div
            key={vol.id}
            className={`hero-card ${vol.rank === 1 ? 'rank-1' : 'rank-sub'}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * idx, duration: 0.4 }}
          >
            <div className="hero-rank-badge">#{vol.rank}</div>
            <div className="hero-avatar">{vol.avatar}</div>
            <h3 className="hero-name">{vol.name}</h3>
            <div className="hero-expertise">{vol.expertise}</div>
            
            <div className="hero-metrics">
              <div className="hero-metric">
                <span className="label">Rescues</span>
                <span className="value">{vol.rescues}</span>
              </div>
              <div className="hero-metric">
                <span className="label">Rating</span>
                <span className="value"><Star size={12} className="filled" style={{ verticalAlign: 'middle', marginRight: '4px' }} />{vol.rating}</span>
              </div>
              <div className="hero-metric">
                <span className="label">Avg Res.</span>
                <span className="value">{vol.avgResponse}</span>
              </div>
            </div>

            <div className="hero-trust">
              <Shield size={14} style={{ color: 'var(--accent)' }} />
              <span>Trust Score: <strong>{vol.trustScore}</strong></span>
            </div>

            <div className="hero-badges">
              {vol.badges.slice(0, 2).map((b, i) => (
                <span key={i} className="mini-badge">{b}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid-70-30" style={{ gap: '24px' }}>
        <div className="main-list-column">
          {/* Controls Bar */}
          <div className="controls-card card" style={{ marginBottom: '20px', padding: '16px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="search-box-pill" style={{ flex: 1, minWidth: '200px' }}>
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Search volunteering heroes..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="dropdown-pill">
                  <Filter size={14} />
                  <select value={filterExpertise} onChange={(e) => setFilterExpertise(e.target.value)}>
                    <option value="All">All Expertise</option>
                    <option value="Medical">Medical</option>
                    <option value="Rescue">Rescue</option>
                    <option value="Coordination">Coordination</option>
                  </select>
                </div>

                <div className="dropdown-pill">
                  <TrendingUp size={14} />
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="trustScore">Top Trust</option>
                    <option value="missions">Most Missions</option>
                    <option value="rescues">Most Rescues</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Full Leaderboard Table */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="table-responsive">
              <table className="data-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '16px 20px', fontSize: '11px', color: 'var(--text-tertiary)' }}>RANK</th>
                    <th style={{ padding: '16px 20px', fontSize: '11px', color: 'var(--text-tertiary)' }}>VOLUNTEER</th>
                    <th style={{ padding: '16px 20px', fontSize: '11px', color: 'var(--text-tertiary)' }}>Missions</th>
                    <th style={{ padding: '16px 20px', fontSize: '11px', color: 'var(--text-tertiary)' }}>Rescues</th>
                    <th style={{ padding: '16px 20px', fontSize: '11px', color: 'var(--text-tertiary)' }}>Response</th>
                    <th style={{ padding: '16px 20px', fontSize: '11px', color: 'var(--text-tertiary)' }}>Status</th>
                    <th style={{ padding: '16px 20px', fontSize: '11px', color: 'var(--text-tertiary)' }}>Trust</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {filteredData.map((v, i) => (
                      <motion.tr 
                        key={v.id}
                        className={`hover-effect ${v.isCurrent ? 'leaderboard-highlight' : ''}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, opacity: 0 }}
                        transition={{ delay: 0.03 * i }}
                        style={{ borderBottom: '1px solid var(--border-subtle)' }}
                      >
                        <td style={{ padding: '16px 20px' }}>
                          <span className={`rank-dot ${v.rank <= 3 ? 'top' : 'normal'}`}>{v.rank}</span>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{v.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{v.expertise}</div>
                        </td>
                        <td style={{ padding: '16px 20px' }}>{v.missions}</td>
                        <td style={{ padding: '16px 20px', fontWeight: 600 }}>{v.rescues}</td>
                        <td style={{ padding: '16px 20px', color: 'var(--text-secondary)' }}>{v.avgResponse}</td>
                        <td style={{ padding: '16px 20px' }}>
                          <span className={`status-chip-compact ${v.status}`}>
                            <span className="dot" /> {v.status.replace('-', ' ')}
                          </span>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <div className="trust-badge-compact">
                            {v.trustScore}%
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="sidebar-column" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Trust Score Breakdown */}
          <div className="card recognition-badges-card">
            <div className="card-header" style={{ marginBottom: '12px' }}>
              <span className="card-title" style={{ fontSize: '12px' }}>Recognition Legend</span>
              <Award size={14} className="gold" />
            </div>
            <div className="badge-legend-list">
              <div className="legend-item">
                <span className="mini-badge">First Responder</span>
                <p>Verified early arrival at 100+ critical incidents.</p>
              </div>
              <div className="legend-item">
                <span className="mini-badge">Rescue Specialist</span>
                <p>Successful execution of life-safety maneuvers.</p>
              </div>
              <div className="legend-item">
                <span className="mini-badge">Local Expert</span>
                <p>Deep geographical knowledge of patrol sectors.</p>
              </div>
            </div>
          </div>

          {/* Testimonial Snippet */}
          <div className="card reviews-preview-card" style={{ background: 'var(--gradient-cta)', color: '#1F232A' }}>
            <div className="card-header">
              <span className="card-title" style={{ color: '#1F232A', opacity: 0.8 }}>Voice of Community</span>
              <Heart size={14} fill="#1F232A" stroke="none" />
            </div>
            <div className="latest-review">
              <p style={{ fontStyle: 'italic', fontSize: '13px', lineHeight: 1.5 }}>
                "Rohan arrived within 10 minutes and handled the power outage coordination perfectly. Really saved us."
              </p>
              <div style={{ marginTop: '12px', fontSize: '12px', fontWeight: 700 }}>
                - Local resident, S-09 District
              </div>
            </div>
          </div>

          {/* Trust Score Explanation */}
          <div className="card method-card" style={{ borderStyle: 'dashed' }}>
             <div className="card-header" style={{ marginBottom: '12px' }}>
              <span className="card-title" style={{ fontSize: '11px' }}>System Integrity</span>
              <Info size={14} />
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              The <strong>Trust Score</strong> is a dynamic metric weighted by:
            </p>
            <ul style={{ fontSize: '12px', color: 'var(--text-tertiary)', paddingLeft: '16px', marginTop: '8px' }}>
              <li>Incident response speed (40%)</li>
              <li>Verification by authorities (30%)</li>
              <li>Community feedback quality (20%)</li>
              <li>Mission consistency (10%)</li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .leaderboard-enhanced { padding-bottom: 40px; }
        
        .hero-recognition-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: flex-end;
        }

        .hero-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 24px;
          text-align: center;
          position: relative;
          transition: all 0.3s ease;
        }

        .rank-1 {
          background: var(--gradient-dark);
          border-color: var(--accent);
          transform: scale(1.05);
          box-shadow: var(--shadow-glow);
          z-index: 2;
        }

        .hero-rank-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent);
          color: #1F232A;
          font-weight: 800;
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: 14px;
        }

        .hero-avatar {
          width: 72px;
          height: 72px;
          background: var(--bg-secondary);
          border: 2px solid var(--border-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          font-size: 24px;
          font-weight: 700;
          color: var(--accent);
        }

        .rank-1 .hero-avatar { border-color: var(--accent); width: 84px; height: 84px; }

        .hero-name { font-size: 18px; font-weight: 700; margin-bottom: 4px; }
        .hero-expertise { font-size: 12px; color: var(--text-tertiary); margin-bottom: 20px; }

        .hero-metrics {
          display: flex;
          justify-content: space-around;
          margin-bottom: 20px;
          padding: 12px 0;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .hero-metric { display: flex; flexDirection: column; gap: 4px; }
        .hero-metric .label { font-size: 10px; color: var(--text-tertiary); text-transform: uppercase; }
        .hero-metric .value { font-size: 14px; font-weight: 700; color: var(--text-primary); }

        .hero-trust { margin-bottom: 16px; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 13px; }

        .mini-badge {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 10px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .hero-badges { display: flex; gap: 6px; justify-content: center; }

        .search-box-pill {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 16px;
          background: var(--bg-secondary);
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
        }

        .search-box-pill input {
          background: none;
          border: none;
          color: var(--text-primary);
          font-size: 14px;
          width: 100%;
        }

        .dropdown-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: var(--bg-secondary);
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
        }

        .dropdown-pill select {
          background: none;
          border: none;
          color: var(--text-primary);
          font-size: 13px;
          cursor: pointer;
        }

        .rank-dot {
          display: flex;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
        }

        .rank-dot.top { background: var(--accent); color: #1F232A; }
        .rank-dot.normal { background: var(--bg-secondary); color: var(--text-tertiary); }

        .status-chip-compact {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          text-transform: capitalize;
        }

        .status-chip-compact .dot { width: 6px; height: 6px; border-radius: 50%; }
        .status-chip-compact.available .dot { background: var(--accent-green); }
        .status-chip-compact.on-mission .dot { background: var(--accent-blue); }
        .status-chip-compact.off-duty .dot { background: var(--text-muted); }

        .trust-badge-compact {
          background: var(--bg-secondary);
          color: var(--accent);
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 4px;
          border: 1px solid var(--border-subtle);
          font-size: 12px;
          text-align: center;
        }

        .legend-item { margin-bottom: 12px; }
        .legend-item p { font-size: 11px; color: var(--text-tertiary); margin-top: 4px; }

        @media (max-width: 992px) {
          .hero-recognition-grid { grid-template-columns: 1fr; }
          .rank-1 { order: -1; }
        }
      `}</style>
    </div>
  );
}
