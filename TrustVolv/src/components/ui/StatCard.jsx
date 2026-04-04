import { motion } from 'framer-motion';

export default function StatCard({ icon: Icon, iconColor = 'gold', label, value, badge, badgeColor, suffix }) {
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
    >
      {Icon && (
        <div className={`stat-icon ${iconColor}`}>
          <Icon size={18} />
        </div>
      )}
      <div className="stat-label">{label}</div>
      <div className="stat-value">
        {value}
        {suffix && <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>{suffix}</span>}
        {badge && (
          <span className={`stat-badge ${badgeColor || 'green'}`}>{badge}</span>
        )}
      </div>
    </motion.div>
  );
}
