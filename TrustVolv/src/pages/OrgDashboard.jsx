import { Routes, Route } from 'react-router-dom';
import { LayoutDashboard, RadioReceiver, BarChart2, Activity, Users, Building, ShieldCheck } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import SimplePlaceholder from './shared/SimplePlaceholder';
import OrgOverview from './organization/OrgOverview';
import PartnerOrganizations from './organization/PartnerOrganizations';
import ActiveEmergencies from './organization/ActiveEmergencies';
import Dispatch from './organization/Dispatch';
import IncidentAnalytics from './organization/IncidentAnalytics';
import LiveFeed from './organization/LiveFeed';
import Teams from './organization/Teams';
import VerificationQueue from './organization/VerificationQueue';
import './OrgDashboard.css';

const sidebarItems = [
  { section: 'Operations' },
  { path: '/organization', label: 'Command Hub', icon: LayoutDashboard },
  { path: '/organization/emergencies', label: 'Active Alerts', icon: RadioReceiver },
  { path: '/organization/dispatch', label: 'Dispatch', icon: Activity },
  
  { section: 'Intelligence' },
  { path: '/organization/analytics', label: 'Analytics', icon: BarChart2 },
  { path: '/organization/feed', label: 'Live Feed', icon: Activity },
  
  { section: 'Coordination' },
  { path: '/organization/teams', label: 'Teams', icon: Users },
  { path: '/organization/partners', label: 'Organizations', icon: Building },
  { path: '/organization/verification', label: 'Verification', icon: ShieldCheck },
];

export default function OrgDashboard() {
  return (
    <div className="app-layout">
      <Sidebar
        items={sidebarItems}
        title="TrustVolv"
        subtitle="ORG COMMAND"
        user={{ initials: 'HQ', name: 'Central Command', role: 'Administrator' }}
      />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<OrgOverview />} />
          <Route path="emergencies" element={<ActiveEmergencies />} />
          <Route path="dispatch" element={<Dispatch />} />
          
          <Route path="analytics" element={<IncidentAnalytics />} />
          <Route path="feed" element={<LiveFeed />} />
          
          <Route path="teams" element={<Teams />} />
          <Route path="partners" element={<PartnerOrganizations />} />
          <Route path="verification" element={<VerificationQueue />} />
        </Routes>
      </main>
    </div>
  );
}
