import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

export default function SimplePlaceholder({ title }) {
  return (
    <motion.div 
      className="card" 
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '400px', textAlign: 'center' }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div 
        style={{ 
          width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' 
        }}
      >
        <Construction size={32} />
      </div>
      <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
        {title} Modules
      </h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>
        This section is currently under active development. Advanced monitoring and configuration tools will be available here soon.
      </p>
    </motion.div>
  );
}
