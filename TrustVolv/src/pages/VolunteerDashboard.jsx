import { Routes, Route } from 'react-router-dom';
import { LayoutDashboard, RadioReceiver, Users, Settings, AlertTriangle, ShieldCheck } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import SimplePlaceholder from './shared/SimplePlaceholder';
import VolunteerOverview from './volunteer/VolunteerOverview';
import ActiveMissions from './volunteer/ActiveMissions';
import LeaderboardPage from './volunteer/LeaderboardPage';
import RaiseRequest from './volunteer/RaiseRequest';
import CredentialsVerification from './volunteer/CredentialsVerification';
import './VolunteerDashboard.css';

const sidebarItems = [
  { path: '/volunteer', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/volunteer/missions', label: 'Active Missions', icon: RadioReceiver },
  { path: '/volunteer/requests', label: 'Raise Request', icon: AlertTriangle },
  { path: '/volunteer/leaderboard', label: 'Leaderboard', icon: Users },
  { path: '/volunteer/credentials', label: 'Credentials', icon: ShieldCheck },
  { path: '/volunteer/settings', label: 'Settings', icon: Settings },
];

export default function VolunteerDashboard() {
  return (
    <div className="app-layout">
      <Sidebar
        items={sidebarItems}
        title="TrustVolv"
        subtitle="Volunteer Portal"
        user={{ initials: 'RS', name: 'Rohan Sharma', role: 'Volunteer - Medical' }}
      />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<VolunteerOverview />} />
          <Route path="missions" element={<ActiveMissions />} />
          <Route path="requests" element={<RaiseRequest />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="credentials" element={<CredentialsVerification />} />
          <Route path="settings" element={<SimplePlaceholder title="Settings" />} />
        </Routes>
      </main>
    </div>
  );
}
