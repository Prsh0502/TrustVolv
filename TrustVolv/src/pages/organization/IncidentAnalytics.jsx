import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { AnimatedCard, CardBody, CardTitle, CardDescription, CardVisual, Visual3 } from '../../components/ui/animated-card-chart';

const chartData = [
  { name: 'Mon', critical: 4, high: 8, medium: 12 },
  { name: 'Tue', critical: 3, high: 6, medium: 15 },
  { name: 'Wed', critical: 5, high: 10, medium: 18 },
  { name: 'Thu', critical: 2, high: 5, medium: 10 },
  { name: 'Fri', critical: 6, high: 12, medium: 22 },
  { name: 'Sat', critical: 8, high: 15, medium: 25 },
  { name: 'Sun', critical: 3, high: 7, medium: 14 },
];

export default function IncidentAnalytics() {
  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <h1>Incident Analytics</h1>
          <p>Comprehensive data trends across all operational sectors</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-header" style={{ marginBottom: '20px' }}>
            <span className="card-title">Weekly Severity Breakdown</span>
          </div>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCrit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5E7A" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FF5E7A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorMed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{fill: 'var(--text-tertiary)'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fill: 'var(--text-tertiary)'}} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                <Legend />
                <Area type="monotone" dataKey="critical" name="Critical" stroke="#FF5E7A" fillOpacity={1} fill="url(#colorCrit)" />
                <Area type="monotone" dataKey="high" name="High" stroke="#F59E0B" fillOpacity={1} fill="url(#colorHigh)" />
                <Area type="monotone" dataKey="medium" name="Medium" stroke="#3B82F6" fillOpacity={1} fill="url(#colorMed)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="grid-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ height: '100%', display: 'flex', alignItems: 'stretch' }}>
            <AnimatedCard style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', height: '100%', display: 'flex' }}>
              <CardBody style={{ flex: 1, padding: '24px', justifyContent: 'space-between' }}>
                <div style={{ width: '100%' }}>
                  <CardTitle>Response Rate Optimization</CardTitle>
                  <CardDescription>Hover over the chart to see dynamic severity statistics.</CardDescription>
                </div>
                <CardVisual style={{ marginTop: '20px' }}>
                  <Visual3 mainColor="#FF5E7A" secondaryColor="#F59E0B" gridColor="rgba(255, 255, 255, 0.05)" />
                </CardVisual>
              </CardBody>
            </AnimatedCard>
          </motion.div>


          <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="card-header">
              <span className="card-title">Key Performance Indicators</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
              <div style={{ padding: '20px', background: 'var(--bg-secondary)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Average Dispatch Time</span>
                <strong style={{ fontSize: '24px', color: 'var(--accent)' }}>4m 12s</strong>
              </div>
              <div style={{ padding: '20px', background: 'var(--bg-secondary)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Resolution Rate</span>
                <strong style={{ fontSize: '24px', color: 'var(--accent-green)' }}>94.2%</strong>
              </div>
              <div style={{ padding: '20px', background: 'var(--bg-secondary)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Active Volunteers</span>
                <strong style={{ fontSize: '24px', color: 'var(--text-primary)' }}>1,284</strong>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
