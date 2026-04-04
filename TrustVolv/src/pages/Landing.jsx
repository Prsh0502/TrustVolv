import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Zap, Radio, ShieldCheck, Users, Clock, Target, ArrowRight, ChevronRight, Globe, Building2 } from 'lucide-react';
import Footer from '../components/Footer';
import './Landing.css';

const stats = [
  { value: '12,400+', label: 'Volunteers Active' },
  { value: '3,200+', label: 'Incidents Resolved' },
  { value: '450+', label: 'Organizations' },
  { value: '98.7%', label: 'Response Rate' },
];

const features = [
  { icon: Zap, title: 'Smart Dispatch', desc: 'AI-powered volunteer matching assigns the right responder to every incident based on skills, proximity, and trust score.' },
  { icon: Radio, title: 'Live Tracking', desc: 'Real-time incident monitoring with live maps, status updates, and coordination feeds for full situational awareness.' },
  { icon: ShieldCheck, title: 'Trust Score', desc: 'Verified volunteer ratings built on mission performance, citizen reviews, and reliability metrics that earn community trust.' },
];

const orgs = [
  { name: 'Red Cross Metro', type: 'NGO' },
  { name: 'City Emergency Services', type: 'Government' },
  { name: 'MedFirst Response', type: 'Healthcare' },
  { name: 'SafeHaven Relief', type: 'NGO' },
  { name: 'TechAid Foundation', type: 'Private' },
  { name: 'National Guard Unit', type: 'Government' },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function Landing() {
  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-glow" />
        <div className="container-wide hero-grid">
          <motion.div className="hero-content" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <div className="hero-badge">
              <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block' }} />
              Platform Active — 234 responders online
            </div>
            <h1 className="hero-title">
              Rapid Crisis Response.<br />
              <span className="hero-title-accent">Real-Time Coordination.</span>
            </h1>
            <p className="hero-subtitle">
              TrustVolv connects citizens, volunteers, and organizations for faster, smarter emergency response. Report incidents, dispatch volunteers, and track resolution - all in one platform.
            </p>
            <div className="hero-actions">
              <NavLink to="/signup">
                <motion.button className="btn-gradient" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Target size={18} /> Report an Incident
                </motion.button>
              </NavLink>
              <NavLink to="/signup">
                <motion.button className="btn-outline" style={{ padding: '12px 28px', fontSize: '15px' }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Users size={18} /> Join as Volunteer <ArrowRight size={16} />
                </motion.button>
              </NavLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="container-wide stats-bar-grid">
          {stats.map((s, i) => (
            <motion.div key={i} className="stats-bar-item" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}>
              <div className="stats-bar-value">{s.value}</div>
              <div className="stats-bar-label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features-section" id="features">
        <div className="container-wide">
          <motion.div className="section-header-center" {...fadeUp}>
            <h2 className="section-title">Built for Crisis. Designed for Trust.</h2>
            <p className="section-subtitle">Every feature is engineered for speed, transparency, and accountability.</p>
          </motion.div>
          <div className="features-grid">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i} className="feature-card" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.15 }}>
                  <div className="feature-icon"><Icon size={24} /></div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                  <span className="feature-link">Learn more <ChevronRight size={14} /></span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Organizations */}
      <section className="orgs-section" id="organizations">
        <div className="container-wide">
          <motion.div className="section-header-center" {...fadeUp}>
            <h2 className="section-title">Trusted by Leading Organizations</h2>
            <p className="section-subtitle">Government agencies, NGOs, and private responders rely on TrustVolv.</p>
          </motion.div>
          <div className="orgs-grid">
            {orgs.map((o, i) => (
              <motion.div key={i} className="org-card" {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
                <div className="org-card-icon"><Building2 size={20} /></div>
                <div className="org-card-name">{o.name}</div>
                <div className="org-card-type">{o.type}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <motion.div className="cta-card" {...fadeUp}>
            <Globe size={32} style={{ color: 'var(--accent)', marginBottom: 16 }} />
            <h2 className="cta-title">Ready to Make a Difference?</h2>
            <p className="cta-desc">Join thousands of volunteers and organizations building safer communities.</p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <NavLink to="/signup">
                <motion.button className="btn-gradient" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  Get Started Free
                </motion.button>
              </NavLink>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
