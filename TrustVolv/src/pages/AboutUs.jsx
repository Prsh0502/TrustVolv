import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { Shield, Users, Radio, Zap } from 'lucide-react';

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', paddingTop: '100px', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}
        >
          <h1 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: '800' }}>
            Empowering <span style={{ color: 'var(--accent)' }}>Resilience</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '60px' }}>
            TrustVolv is a premium crisis-response intelligence platform designed to bridge the gap between distressed citizens and verified professional volunteers in real-time.
          </p>
        </motion.div>

        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', padding: '0 20px 100px' }}>
          {[
            { icon: Shield, title: 'Verified Identity', desc: 'Every responding individual is background-verified.' },
            { icon: Radio, title: 'Real-time Feed', desc: 'Geolocated intelligence prevents redundant rescue ops.' },
            { icon: Users, title: 'Community Driven', desc: 'Mobilizing local heroes equipped with critical skills.' },
            { icon: Zap, title: 'Instant Dispatch', desc: 'Predictive routing ensures the fastest possible aid.' },
          ].map((feat, i) => (
            <motion.div 
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              style={{
                background: 'var(--bg-secondary)',
                padding: '30px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                textAlign: 'center'
              }}
            >
              <feat.icon size={40} style={{ color: 'var(--accent)', marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{feat.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
