import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Search, Filter, HeartPulse, ShieldAlert, Truck, 
  Flame, MapPin, Phone, ShieldCheck, Activity, X, Mail, Star, Users 
} from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import './PartnerOrganizations.css';

const mockPartners = [
  {
    id: "org-1",
    name: "Global Health Response",
    type: "Medical",
    status: "Active",
    coverage: "Central City, North District",
    contact: { name: "Dr. Sarah Jenkins", phone: "+1 (555) 019-2831", email: "sarah@ghresponse.org" },
    trustScore: 98,
    capabilities: ["Ambulance", "Medical Aid", "Surgery Unit"],
    resources: { "Ambulances": 12, "ICU Beds": 45, "Medics": 120, "Trauma Kits": 300 },
    recentOps: 34,
    icon: HeartPulse,
    suggested: true,
    lat: 19.076,
    lng: 72.877
  },
  {
    id: "org-2",
    name: "City Fire & Rescue Co.",
    type: "Fire & Rescue",
    status: "Deployed",
    coverage: "All Districts",
    contact: { name: "Chief Robert Kline", phone: "+1 (555) 922-1044", email: "dispatch@cityfirerescue.gov" },
    trustScore: 99,
    capabilities: ["Fire Support", "Rescue Team", "Hazmat"],
    resources: { "Fire Engines": 8, "Rescue Trucks": 4, "Personnel": 85, "Drones": 2 },
    recentOps: 89,
    icon: Flame,
    suggested: true,
    lat: 19.05,
    lng: 72.84
  },
  {
    id: "org-3",
    name: "Hope Shelter NGO",
    type: "NGO",
    status: "Available",
    coverage: "Westside, South District",
    contact: { name: "Mike Dobbins", phone: "+1 (555) 773-8822", email: "help@hopeshelter.org" },
    trustScore: 94,
    capabilities: ["Shelter", "Food Distribution", "Blankets"],
    resources: { "Beds": 500, "Food Rations": 2000, "Volunteers": 150, "Transport Vans": 5 },
    recentOps: 12,
    icon: Building2,
    suggested: false,
    lat: 19.1,
    lng: 72.9
  },
  {
    id: "org-4",
    name: "Metro Civic Defense",
    type: "Civic Authority",
    status: "High Load",
    coverage: "Metro Area",
    contact: { name: "Commander Davis", phone: "+1 (555) 200-4100", email: "operations@metrocivic.gov" },
    trustScore: 96,
    capabilities: ["Crowd Control", "Evac Transit", "Security"],
    resources: { "Officers": 300, "Buses": 25, "Barricades": 500, "Mobile Command": 2 },
    recentOps: 156,
    icon: ShieldAlert,
    suggested: false,
    lat: 19.02,
    lng: 72.85
  },
  {
    id: "org-5",
    name: "AquaRescue Unit",
    type: "Rescue",
    status: "Available",
    coverage: "Coastal & River Zones",
    contact: { name: "Capt. Elena Rostova", phone: "+1 (555) 662-3091", email: "dispatch@aquarescue.org" },
    trustScore: 97,
    capabilities: ["Flood Response", "Water Rescue", "Boat Evac"],
    resources: { "Lifeboats": 15, "Divers": 40, "Helicopters": 1, "Pumps": 20 },
    recentOps: 45,
    icon: ShieldCheck,
    suggested: false,
    lat: 19.065,
    lng: 72.83
  },
  {
    id: "org-6",
    name: "Rapid Logistics Support",
    type: "Logistics",
    status: "Available",
    coverage: "Statewide",
    contact: { name: "James Thorne", phone: "+1 (555) 881-2299", email: "logistics@rlsworldwide.com" },
    trustScore: 92,
    capabilities: ["Heavy Transport", "Generators", "Supply Drops"],
    resources: { "Cargo Trucks": 30, "Generators": 50, "Fuel Reserves": '10k Gal', "Forklifts": 12 },
    recentOps: 28,
    icon: Truck,
    suggested: true,
    lat: 19.09,
    lng: 72.86
  }
];

export default function PartnerOrganizations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedOrg, setSelectedOrg] = useState(null);

  const filteredOrgs = mockPartners.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          org.capabilities.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'All' || org.type === filterType;
    return matchesSearch && matchesType;
  });

  const suggestedOrgs = mockPartners.filter(org => org.suggested);

  // Status mapping for colors
  const getStatusColor = (status) => {
    switch(status) {
      case 'Available': return 'var(--accent-green)';
      case 'Active': return '#3B82F6';
      case 'Deployed': return 'var(--accent-orange, #F59E0B)';
      case 'High Load': return 'var(--accent-red, #FF5E7A)';
      default: return 'var(--text-tertiary)';
    }
  };

  return (
    <div className="partner-orgs-container">
      {/* Top Header */}
      <div className="top-bar">
        <div className="top-bar-left">
          <h1>Partner Organizations</h1>
          <p>Collaboration Hub for Emergency Coordination & Response</p>
        </div>
        <div className="top-bar-right">
          <button className="btn-primary" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Building2 size={16} /> Register Partner
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards-grid">
        <motion.div className="summary-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="summary-card-header">
            <span className="summary-card-title">Total Partners</span>
            <Building2 size={20} color="var(--accent)" />
          </div>
          <span className="summary-card-value">284</span>
          <span className="summary-card-subtext"><Activity size={12} color="var(--accent-green)" /> +12 this month</span>
        </motion.div>
        <motion.div className="summary-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="summary-card-header">
            <span className="summary-card-title">Active Right Now</span>
            <Activity size={20} color="var(--accent-green)" />
          </div>
          <span className="summary-card-value">46</span>
          <span className="summary-card-subtext">Across 8 major incident zones</span>
        </motion.div>
        <motion.div className="summary-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="summary-card-header">
            <span className="summary-card-title">Ongoing Joint Ops</span>
            <Users size={20} color="#F59E0B" />
          </div>
          <span className="summary-card-value">14</span>
          <span className="summary-card-subtext">Coordinated cross-agency responses</span>
        </motion.div>
        <motion.div className="summary-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="summary-card-header">
            <span className="summary-card-title">People Rescued (Partners)</span>
            <ShieldCheck size={20} color="#10B981" />
          </div>
          <span className="summary-card-value">12.5k</span>
          <span className="summary-card-subtext">Cumulative reliable impact</span>
        </motion.div>
      </div>

      {/* Suggested Panel */}
      <motion.div className="suggested-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: 'var(--text-primary)' }}>
          <Star size={18} color="var(--accent-orange, #F59E0B)" fill="var(--accent-orange, #F59E0B)" /> 
          Suggested for Current Crisis (Flood & Grid Failure)
        </div>
        <div className="suggested-cards-container">
          {suggestedOrgs.map((org, idx) => {
            const Icon = org.icon;
            return (
              <div key={org.id} className="suggested-card" onClick={() => setSelectedOrg(org)}>
                <div className="partner-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent)' }}>
                  <Icon size={24} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem' }}>{org.name}</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Reliability Score: <span style={{color: 'var(--accent-green)', fontWeight: 'bold'}}>{org.trustScore}/100</span></div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>Top Resource: {org.capabilities[0]}</div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Search and Filters */}
      <div className="filters-bar">
        <div className="search-input-wrapper">
          <Search size={18} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Search by organization name or capability..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <select className="filter-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="All">All Types</option>
            <option value="NGO">NGOs</option>
            <option value="Medical">Medical</option>
            <option value="Fire & Rescue">Fire & Rescue</option>
            <option value="Rescue">Rescue Specialists</option>
            <option value="Civic Authority">Civic Authorities</option>
            <option value="Logistics">Logistics</option>
          </select>
          <select className="filter-select">
            <option>Status: Any</option>
            <option>Available</option>
            <option>Deployed</option>
          </select>
        </div>
      </div>

      <div className="main-content-split">
        {/* Map Visualization Placeholder */}
        <div className="coverage-map-container">
          <div className="coverage-map-header">
            <MapPin size={18} color="var(--accent)" /> Regional Coverage & Live Units
          </div>
          <div className="map-container" style={{ border: 'none', margin: 0, height: '100%', minHeight: '600px', borderRadius: '0 0 var(--radius-lg) var(--radius-lg)', overflow: 'hidden' }}>
            <MapContainer center={[19.076, 72.877]} zoom={11} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              {filteredOrgs.map(org => {
                const color = getStatusColor(org.status);
                return (
                  <CircleMarker 
                    key={org.id} 
                    center={[org.lat, org.lng]} 
                    radius={10} 
                    pathOptions={{ color: color, fillColor: color, fillOpacity: 0.7, weight: 3 }}
                    eventHandlers={{ click: () => setSelectedOrg(org) }}
                  >
                    <Popup>
                      <div style={{ textAlign: 'center' }}>
                         <strong>{org.name}</strong><br/>
                         <span style={{color: color}}>{org.status}</span>
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}
            </MapContainer>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="directory-grid">
          {filteredOrgs.map((org, i) => {
            const Icon = org.icon;
            return (
              <motion.div 
                key={org.id} 
                className="partner-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedOrg(org)}
              >
                <div className="partner-header">
                  <div className="partner-identity">
                    <div className="partner-icon-wrapper">
                      <Icon size={24} color="var(--text-secondary)" />
                    </div>
                    <div>
                      <h3 className="partner-name">
                        {org.name}
                        {org.trustScore > 95 && <ShieldCheck size={16} color="var(--accent-green)" title="Verified Elite Partner" />}
                      </h3>
                      <div className="partner-type">{org.type}</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="trust-badge">
                    Trust {org.trustScore}/100
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '500', color: getStatusColor(org.status) }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: getStatusColor(org.status) }}></span>
                    {org.status}
                  </div>
                </div>

                <div className="tag-list">
                  {org.capabilities.map((cap, idx) => (
                    <span key={idx} className="capability-tag">{cap}</span>
                  ))}
                </div>

                <div className="contact-preview">
                  <MapPin size={14} /> {org.coverage}
                </div>

                <div className="card-actions">
                  <button className="btn-hollow" onClick={(e) => { e.stopPropagation(); setSelectedOrg(org); }}>View Details</button>
                  <button className="btn-solid-accent" onClick={(e) => { e.stopPropagation(); alert(`Requested Assistance from ${org.name}`); }}>Request Aid</button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Drawer Modal Side Panel */}
      <AnimatePresence>
        {selectedOrg && (
          <div className="drawer-overlay" onClick={() => setSelectedOrg(null)}>
            <motion.div 
              className="drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="drawer-header">
                <div className="drawer-title">
                  <div className="partner-icon-wrapper" style={{background: 'var(--bg-secondary)', color: 'var(--text-primary)'}}>
                    <selectedOrg.icon size={24} />
                  </div>
                  <div>
                    <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{selectedOrg.name}</h2>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{selectedOrg.type} • ID: {selectedOrg.id}</span>
                  </div>
                </div>
                <button className="close-btn" onClick={() => setSelectedOrg(null)}>
                  <X size={20} />
                </button>
              </div>

              <div className="drawer-content">
                <section>
                  <div className="drawer-section-title">Operational Status</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px', border: `1px solid var(--border-color)` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ width: 12, height: 12, borderRadius: '50%', background: getStatusColor(selectedOrg.status), boxShadow: `0 0 10px ${getStatusColor(selectedOrg.status)}` }}></span>
                      <strong style={{ fontSize: '1.1rem', color: getStatusColor(selectedOrg.status) }}>{selectedOrg.status}</strong>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Trust Score</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-green)' }}>{selectedOrg.trustScore}/100</div>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="drawer-section-title">Verified Resources</div>
                  <div className="resource-grid">
                    {Object.entries(selectedOrg.resources).map(([resName, resVal], idx) => (
                      <div key={idx} className="resource-item">
                        <span className="resource-label">{resName}</span>
                        <span className="resource-val">{resVal}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="drawer-section-title">Service Sectors</div>
                  <div className="contact-card" style={{ gap: '8px' }}>
                    <div className="contact-row">
                      <MapPin size={18} color="var(--accent)" /> 
                      <span style={{ color: 'var(--text-primary)' }}>{selectedOrg.coverage}</span>
                    </div>
                    <div className="contact-row">
                      <Activity size={18} color="var(--text-secondary)" /> 
                      <span>Recent Joint Operations: {selectedOrg.recentOps}</span>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="drawer-section-title">Emergency Contact (24/7)</div>
                  <div className="contact-card">
                    <div className="contact-row" style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                      <Users size={18} /> {selectedOrg.contact.name}
                    </div>
                    <div className="contact-row">
                      <Phone size={18} /> {selectedOrg.contact.phone}
                    </div>
                    <div className="contact-row">
                      <Mail size={18} /> {selectedOrg.contact.email}
                    </div>
                  </div>
                </section>
              </div>

              <div className="drawer-footer">
                <button className="btn-hollow" onClick={() => window.location.href = `mailto:${selectedOrg.contact.email}`}><Mail size={18} /> Direct Email</button>
                <button className="btn-solid-accent"><ShieldAlert size={18} /> Assign to Incident</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
