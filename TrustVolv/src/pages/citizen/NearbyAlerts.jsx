import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { ShieldAlert, MapPin, Search, Filter, Clock } from 'lucide-react';

const incidents = [
  { id: 1, lat: 19.076, lng: 72.877, color: '#FF5E7A', title: 'Building Fire - Andheri', severity: 'critical', type: 'Fire', time: '3m ago', dist: '1.2km' },
  { id: 2, lat: 19.05, lng: 72.84, color: '#F59E0B', title: 'Road Flooding - Bandra', severity: 'high', type: 'Flood', time: '12m ago', dist: '3.4km' },
  { id: 3, lat: 19.1, lng: 72.9, color: '#FF5E7A', title: 'Gas Leak - Powai', severity: 'critical', type: 'Hazmat', time: '18m ago', dist: '5.1km' },
  { id: 4, lat: 19.02, lng: 72.85, color: '#48D597', title: 'Power Outage - Dadar', severity: 'medium', type: 'Infrastructure', time: '45m ago', dist: '6.8km' }
];

export default function NearbyAlerts() {
  const [filter, setFilter] = useState('All');

  const filteredIncidents = filter === 'All' ? incidents : incidents.filter(i => i.type === filter);

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-left">
          <h1>Nearby Alerts</h1>
          <p>Live situational awareness and hazard mapping in your vicinity</p>
        </div>
      </div>

      <div className="grid-60-40 split-layout">
        
        {/* Map Section */}
        <div className="left-panel">
          <motion.div className="card map-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: 0, overflow: 'hidden' }}>
            <div className="card-header" style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', margin: 0 }}>
              <span className="card-title">Live Hazard Tracking</span>
              <span className="status-chip active pulse-dot"><span className="dot" /> {filteredIncidents.length} Active Alerts</span>
            </div>
            <div className="map-container" style={{ border: 'none', margin: 0, height: '500px', borderRadius: 0 }}>
              <MapContainer center={[19.076, 72.877]} zoom={12} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                {filteredIncidents.map(inc => (
                  <CircleMarker key={inc.id} center={[inc.lat, inc.lng]} radius={10} pathOptions={{ color: inc.color, fillColor: inc.color, fillOpacity: 0.6, weight: 3 }}>
                    <Popup>
                      <div style={{ textAlign: 'center' }}>
                         <strong style={{ fontSize: '14px' }}>{inc.title}</strong><br/>
                         <span style={{ fontSize: '12px', color: '#666' }}>{inc.time} • {inc.dist} away</span>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>
          </motion.div>
        </div>

        {/* Alerts List */}
        <div className="right-panel">
          
          <div className="filter-controls" style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {['All', 'Fire', 'Flood', 'Hazmat', 'Infrastructure'].map(type => (
              <button 
                key={type} 
                className={`btn btn-sm ${filter === type ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setFilter(type)}
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                {type}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredIncidents.map((incident, idx) => (
              <motion.div 
                key={incident.id} 
                className="card incident-alert-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
                style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: incident.color }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                     <ShieldAlert size={18} color={incident.color} />
                     <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>{incident.title}</h3>
                  </div>
                  <span className={`severity-badge severity-${incident.severity}`} style={{ fontSize: '10px' }}>{incident.severity}</span>
                </div>

                <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} /> {incident.dist}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {incident.time}
                  </span>
                </div>
              </motion.div>
            ))}
            
            {filteredIncidents.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-tertiary)' }}>
                No active alerts matching your filters in the vicinity.
              </div>
            )}
          </div>

        </div>

      </div>
    </>
  );
}
