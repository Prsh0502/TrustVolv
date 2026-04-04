import { Routes, Route } from 'react-router-dom';
import { LayoutDashboard, AlertTriangle, FileText, MapPin, Settings } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import CitizenOverview from './citizen/CitizenOverview';
import ReportIncident from './citizen/ReportIncident';
import MyReports from './citizen/MyReports';
import NearbyAlerts from './citizen/NearbyAlerts';
import SimplePlaceholder from './shared/SimplePlaceholder';
import CitizenSettings from './citizen/CitizenSettings';
import './CitizenDashboard.css';

const sidebarItems = [
  { path: '/citizen', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/citizen/report', label: 'Report Incident', icon: AlertTriangle },
  { path: '/citizen/reports', label: 'My Reports', icon: FileText },
  { path: '/citizen/alerts', label: 'Nearby Alerts', icon: MapPin },
  { path: '/citizen/settings', label: 'Settings', icon: Settings },
];

export default function CitizenDashboard() {
  return (
    <div className="app-layout">
      <Sidebar
        items={sidebarItems}
        title="TrustVolv"
        subtitle="Citizen Portal"
        user={{ initials: 'SK', name: 'Sneha Kumar', role: 'Citizen' }}
      />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<CitizenOverview />} />
          <Route path="report" element={<ReportIncident />} />
          <Route path="reports" element={<MyReports />} />
          <Route path="alerts" element={<NearbyAlerts />} />
          <Route path="settings" element={<CitizenSettings />} />
        </Routes>
      </main>
    </div>
  );
}
