import { useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Summary from './components/Summary';
import Footer from './components/Footer';
import Header from './components/header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';

const initialEvents = [
  {
    id: 1,
    name: 'Community Park Cleanup',
    date: '2026-04-12',
    location: 'Maple Park',
    description: 'Help clean up litter, plant flowers, and freshen the trail area.',
    volunteers: 8,
  },
  {
    id: 2,
    name: 'Library Reading Buddies',
    date: '2026-04-18',
    location: 'Westside Public Library',
    description: 'Support elementary students with reading and literacy games.',
    volunteers: 5,
  },
];

function AppContent() {
  const [events, setEvents] = useState(initialEvents);
  const [form, setForm] = useState({ name: '', date: '', location: '', description: '' });
  const [statusText, setStatusText] = useState('Running in local-only mode (no backend API).');
  const location = useLocation();

  const totalVolunteers = useMemo(
    () => events.reduce((sum, event) => sum + (event.volunteers || 0), 0),
    [events]
  );

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.date || !form.location.trim()) {
      return;
    }

    const newEvent = {
      id: Date.now(),
      ...form,
      volunteers: 0,
    };

    setEvents((prev) => [newEvent, ...prev]);
    localStorage.setItem('servesphere-events', JSON.stringify([newEvent, ...events]));
    setForm({ name: '', date: '', location: '', description: '' });
    setStatusText('Event added locally.');
  };

  const joinEventHandler = (id) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, volunteers: (event.volunteers || 0) + 1 } : event
      )
    );
    setStatusText('Joined event locally.');
  };

  const showHeader = location.pathname === '/' || location.pathname === '/about';

  return (
    <div className="App">
      {showHeader && <Header />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Summary eventCount={events.length} volunteerCount={totalVolunteers} />
              <div className="apiStatus">{statusText}</div>
              <HomePage
                events={events}
                form={form}
                totalVolunteers={totalVolunteers}
                onFormChange={handleChange}
                onSubmit={handleSubmit}
                onJoin={joinEventHandler}
              />
            </>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>

      {showHeader && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
