import { motion } from 'framer-motion';

export default function AnimatedLogo({ size = 40 }) {
  return (
    <motion.div
      style={{ width: size, height: size, display: 'inline-block' }}
      animate={{ 
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity,
        ease: "easeInOut" 
      }}
    >
      <img src="/logo.png" alt="Logo" className="theme-match-logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </motion.div>
  );
}
