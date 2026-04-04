import { motion } from 'framer-motion';
import { AlertTriangle, Users, CheckCircle, Clock, Bell, Search, Filter, Plus, Building2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../../components/ui/StatCard';
import { useToast } from '../../components/ui/Toast';

const liveFeed = [
  { id: 1, title: 'Building Collapse - Sector 4', location: 'Commercial Area', time: '3m ago', severity: 'critical', status: 'responding' },
  { id: 2, title: 'Flash Flood Warning', location: 'Zone B, River Road', time: '12m ago', severity: 'high', status: 'dispatched' },
  { id: 3, title: 'Power Outage', location: 'District 9', time: '28m ago', severity: 'medium', status: 'resolved' },
  { id: 4, title: 'Gas Leak', location: 'Industrial Area', time: '45m ago', severity: 'critical', status: 'active' },
];

const chartData = [
  { name: 'Mon', critical: 4, high: 8, medium: 12 },
  { name: 'Tue', critical: 3, high: 6, medium: 15 },
  { name: 'Wed', critical: 5, high: 10, medium: 18 },
  { name: 'Thu', critical: 2, high: 5, medium: 10 },
  { name: 'Fri', critical: 6, high: 12, medium: 22 },
  { name: 'Sat', critical: 8, high: 15, medium: 25 },
  { name: 'Sun', critical: 3, high: 7, medium: 14 },
];

const partnerOrgs = [
  { name: 'Red Cross Metro', type: 'NGO', active: 145, status: 'Active' },
  { name: 'City Fire Dept', type: 'Govt', active: 89, status: 'Active' },
  { name: 'MedFirst Response', type: 'Private', active: 34, status: 'Standby' },
];

export default function OrgOverview() {
  const { addToast } = useToast();

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <h1>Organization Command Center</h1>
          <p>Tue, Mar 31, 2026 • 20 Active Operations</p>
        </div>
        <div className="top-bar-right">
          <button className="nav-icon-btn"><Bell size={18} /></button>
          <motion.button 
            className="btn-danger" 
            whileHover={{ scale: 1.04 }} 
            whileTap={{ scale: 0.97 }}
            onClick={() => addToast('Emergency Declared', 'All units have been notified. Dispatch protocol initiated.', 'error')}
          >
            <AlertTriangle size={16} /> Declare Emergency
          </motion.button>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard icon={AlertTriangle} iconColor="red" label="Active Emergencies" value="8" badge="Pulse" badgeColor="red" />
        <StatCard icon={Users} iconColor="green" label="Volunteers Assigned" value="234" badge="↑ 12%" badgeColor="green" />
        <StatCard icon={CheckCircle} iconColor="gold" label="People Rescued" value="1,847" />
        <StatCard icon={Clock} iconColor="blue" label="Avg Response Time" value="6.3" suffix="min" badge="↓ 18%" badgeColor="green" />
      </div>

      <div className="grid-35-40-25">
        {/* Left Column */}
        <div className="column">
          <motion.div className="card full-height" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="card-header">
              <span className="card-title">Live Incident Feed</span>
              <span className="view-all">View All</span>
            </div>
            <div className="feed-list" style={{ overflowY: 'auto', maxHeight: '500px' }}>
              {liveFeed.map((item, i) => (
                <div key={i} className="feed-item hover-effect" style={{ padding: '16px 12px' }}>
                  <div className={`feed-item-icon severity-${item.severity}`}>
                    <AlertTriangle size={14} />
                  </div>
                  <div className="feed-item-content">
                    <div className="feed-item-title" style={{ fontSize: '14px' }}>{item.title}</div>
                    <div className="feed-item-meta" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span>{item.time}</span> • <span>{item.location}</span>
                    </div>
                  </div>
                  <div className="feed-item-right">
                    <span className={`status-chip ${item.status === 'resolved' ? 'resolved' : item.status === 'responding' ? 'responding' : 'active'}`}>
                      <span className="dot" />{item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Center Column */}
        <div className="column" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="card-header" style={{ marginBottom: '10px' }}>
              <span className="card-title">Incident Analytics (7 Days)</span>
              <div className="trend-stats">This Wk: <strong style={{ color: 'var(--text-primary)'}}>42</strong> <span className="stat-badge green">↑ 10.5%</span></div>
            </div>
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCrit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF5E7A" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FF5E7A" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{fill: 'var(--text-tertiary)', fontSize: 11}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fill: 'var(--text-tertiary)', fontSize: 11}} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="critical" stroke="#FF5E7A" fillOpacity={1} fill="url(#colorCrit)" />
                  <Area type="monotone" dataKey="high" stroke="#F59E0B" fillOpacity={1} fill="url(#colorHigh)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="column" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <div className="card-header">
              <span className="card-title">Organizations</span>
              <button className="btn btn-outline btn-xs"><Plus size={14} /> Add</button>
            </div>
            <div className="org-list">
              {partnerOrgs.map((org, i) => (
                <div key={i} className="org-item hover-effect">
                  <div className="org-avatar"><Building2 size={16} /></div>
                  <div className="org-info">
                    <div className="org-name">{org.name}</div>
                    <div className="org-type">{org.type} • {org.active} active</div>
                  </div>
                  <div className={`status-chip ${org.status === 'Active' ? 'available' : 'off-duty'}`} style={{ padding: '2px 8px', fontSize: '10px' }}>
                    <span className="dot" style={{ width: 4, height: 4 }} /> {org.status}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <div className="card-header">
              <span className="card-title">Team Performance</span>
            </div>
            <div className="progress-group">
              <div className="progress-item">
                <div className="progress-header"><span>Medical Alpha</span><span>98%</span></div>
                <div className="progress-bar"><div className="progress-fill gold" style={{ width: '98%' }}></div></div>
              </div>
              <div className="progress-item">
                <div className="progress-header"><span>Rescue Bravo</span><span>92%</span></div>
                <div className="progress-bar"><div className="progress-fill green" style={{ width: '92%' }}></div></div>
              </div>
              <div className="progress-item">
                <div className="progress-header"><span>Logistics Charlie</span><span>85%</span></div>
                <div className="progress-bar"><div className="progress-fill blue" style={{ width: '85%' }}></div></div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </>
  );
}
