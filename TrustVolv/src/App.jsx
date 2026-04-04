import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import AboutUs from './pages/AboutUs';
import CitizenDashboard from './pages/CitizenDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import OrgDashboard from './pages/OrgDashboard';
import { ToastProvider } from './components/ui/Toast';
import { useAuth } from './context/AuthContext';
import './App.css';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { userRole } = useAuth();
  if (!userRole) return <Navigate to="/login" replace />;
  if (allowedRole && userRole !== allowedRole) return <Navigate to={`/${userRole}`} replace />;
  return children;
};

function App() {
  const { userRole } = useAuth();
  
  return (
    <ToastProvider>
      <div className="app-container">
        <Routes>
          {/* Public Routes - Show top navbar */}
          <Route path="/" element={
            <>
              <Navbar />
              <Landing />
            </>
          } />
          <Route path="/about" element={<AboutUs />} />
          
          {/* Auth Route - No navbar */}
          <Route path="/login" element={userRole ? <Navigate to={`/${userRole}`} /> : <Auth />} />
          <Route path="/signup" element={userRole ? <Navigate to={`/${userRole}`} /> : <Auth />} />

          {/* Dashboard Routes - Protected */}
          <Route path="/citizen/*" element={<ProtectedRoute allowedRole="citizen"><CitizenDashboard /></ProtectedRoute>} />
          <Route path="/volunteer/*" element={<ProtectedRoute allowedRole="volunteer"><VolunteerDashboard /></ProtectedRoute>} />
          <Route path="/organization/*" element={<ProtectedRoute allowedRole="organization"><OrgDashboard /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </ToastProvider>
  );
}

export default App;
