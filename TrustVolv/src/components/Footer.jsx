import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="footer-left">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo.png" alt="TrustVolv" style={{ height: '18px', width: 'auto', opacity: 0.6 }} />
          <div className="footer-brand">TrustVolv</div>
        </div>
        <div className="footer-copy">© 2026 TrustVolv Crisis Response Platform</div>
      </div>
      <div className="footer-links">
        <a href="#support">Support</a>
        <a href="#status">System Status</a>
        <a href="#community">Community</a>
        <a href="#privacy">Privacy</a>
        <a href="#terms">Terms</a>
      </div>
    </motion.footer>
  );
}
