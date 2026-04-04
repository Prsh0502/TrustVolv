import { motion } from 'framer-motion';
import { Search, Filter, MapPin, CheckCircle, Clock, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

const STATUS_STEPS = [
  { id: 'submitted', label: 'Submitted' },
  { id: 'under-review', label: 'Under Review' },
  { id: 'help-assigned', label: 'Help Assigned' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'resolved', label: 'Resolved' }
];

const reportData = [
  { 
    id: 'RPT-2026-0042', 
    title: 'Flash Flood Near Bridge', 
    date: 'Oct 14, 2026 • 14:30', 
    location: 'River Road, Sector 7', 
    severity: 'High',
    status: 'in-progress',
    assigned: 'TrustVolv Rapid Rescue Team'
  },
  { 
    id: 'RPT-2026-0038', 
    title: 'Suspicious Chemical Smell', 
    date: 'Oct 12, 2026 • 09:15', 
    location: 'Industrial Zone', 
    severity: 'Medium',
    status: 'resolved',
    assigned: 'Hazmat Vol Units'
  },
  { 
    id: 'RPT-2026-0031', 
    title: 'Large Pothole - Main Highway', 
    date: 'Oct 05, 2026 • 18:45', 
    location: 'Route 42 North', 
    severity: 'Low',
    status: 'under-review',
    assigned: null
  }
];

export default function MyReports() {
  const { addToast } = useToast();

  const getStatusIndex = (statusStr) => {
    return STATUS_STEPS.findIndex(s => s.id === statusStr);
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <h1>My Reports</h1>
          <p>Track the status and progress of incidents you've submitted</p>
        </div>
      </div>

      <div className="filter-bar card" style={{ padding: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="input-with-icon" style={{ flex: 1, maxWidth: '400px' }}>
          <Search size={16} className="input-icon" />
          <input type="text" className="form-input" placeholder="Search by ID or keywords..." style={{ background: 'var(--bg-secondary)', border: 'none' }} />
        </div>
        <button className="btn-outline">
          <Filter size={16} /> Filter
        </button>
      </div>

      <div className="reports-feed" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {reportData.map((report, idx) => {
          const currentIndex = getStatusIndex(report.status);

          return (
            <motion.div 
              key={report.id} 
              className="card report-tracker-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
            >
              <div className="rtc-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                     <span className="rc-badge" style={{ background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', color: 'var(--text-secondary)' }}>{report.id}</span>
                     <span className={`rr-severity-badge ${report.severity.toLowerCase()}`}>{report.severity}</span>
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>{report.title}</h3>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-tertiary)' }}>
                    <span><Clock size={12} /> {report.date}</span>
                    <span><MapPin size={12} /> {report.location}</span>
                  </div>
                </div>
                {report.assigned && (
                  <div className="assigned-chip" style={{ background: 'var(--accent-blue-soft)', color: 'var(--accent-blue)', padding: '6px 12px', borderRadius: 'var(--radius-md)', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldAlert size={14} /> Assigned: {report.assigned}
                  </div>
                )}
              </div>

              {/* Progress Tracker */}
              <div className="progress-timeline" style={{ padding: '8px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                   {/* Background track line */}
                   <div style={{ position: 'absolute', top: '14px', left: '10px', right: '10px', height: '2px', background: 'var(--border-subtle)', zIndex: 0 }} />
                   
                   {STATUS_STEPS.map((step, stepIdx) => {
                      const isCompleted = stepIdx <= currentIndex;
                      const isCurrent = stepIdx === currentIndex;
                      return (
                        <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 1, width: '80px' }}>
                          <div style={{ 
                            width: '30px', height: '30px', borderRadius: '50%', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            background: isCompleted ? 'var(--accent)' : 'var(--bg-secondary)',
                            color: isCompleted ? '#1F232A' : 'var(--text-tertiary)',
                            boxShadow: isCurrent ? '0 0 0 4px var(--accent-soft)' : 'none',
                            transition: 'all 0.3s'
                          }}>
                             {isCompleted ? <CheckCircle2 size={16} /> : <div style={{width:'8px', height:'8px', borderRadius:'50%', background:'var(--text-tertiary)'}}/>}
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: '600', color: isCurrent ? 'var(--text-primary)' : 'var(--text-tertiary)', textAlign: 'center' }}>
                            {step.label}
                          </span>
                        </div>
                      );
                   })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
