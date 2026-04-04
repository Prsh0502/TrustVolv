import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const [userEvents, setUserEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/login');
        } else {
            setUser(JSON.parse(userData));
            // Load user's events from localStorage
            const events = localStorage.getItem('servesphere-events');
            if (events) {
                setUserEvents(JSON.parse(events));
            }
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleBackHome = () => {
        navigate('/');
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    const statsVolunteers = userEvents.reduce((sum, event) => sum + (event.volunteers || 0), 0);
    const statsEvents = userEvents.length;

    return (
        <div className="dashboardContainer">
            <div className="dashboardHeader">
                <div className="headerLeft">
                    <button className="backButton" onClick={handleBackHome}>← Home</button>
                    <h1>📊 Dashboard</h1>
                </div>
                <div className="userInfo">
                    <p>👤 {user.email}</p>
                    <p className="userRole">Role: <strong>{user.role === 'volunteer' ? '🙋 Volunteer' : '🏢 Organization'}</strong></p>
                    <button className="logoutButton" onClick={handleLogout}>🚪 Logout</button>
                </div>
            </div>

            <div className="dashboardContent">
                {user.role === 'volunteer' ? (
                    <div className="volunteerDashboard">
                        <section className="welcomeSection">
                            <h2>👋 Welcome, {user.email.split('@')[0]}!</h2>
                            <p>Track your volunteer journey and make an impact in your community.</p>
                        </section>

                        <section className="statsSection">
                            <div className="statCard">
                                <div className="statIcon">📌</div>
                                <div>
                                    <h3>{statsEvents}</h3>
                                    <p>Events Joined</p>
                                </div>
                            </div>
                            <div className="statCard">
                                <div className="statIcon">⏱️</div>
                                <div>
                                    <h3>{statsVolunteers * 2}h</h3>
                                    <p>Estimated Hours</p>
                                </div>
                            </div>
                            <div className="statCard">
                                <div className="statIcon">🌟</div>
                                <div>
                                    <h3>{Math.floor(statsVolunteers / 2)}</h3>
                                    <p>Impact Score</p>
                                </div>
                            </div>
                        </section>

                        <section className="eventsSection">
                            <h3>🎯 Recent Activities</h3>
                            {userEvents.length > 0 ? (
                                <div className="eventsList">
                                    {userEvents.slice(0, 5).map((event) => (
                                        <div key={event.id} className="eventItem">
                                            <div className="eventDetails">
                                                <h4>{event.name}</h4>
                                                <p>📍 {event.location}</p>
                                                <p>📅 {event.date}</p>
                                            </div>
                                            <div className="eventMeta">
                                                <span className="volunteers">👥 {event.volunteers} volunteers</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No events joined yet. Start making an impact today!</p>
                            )}
                        </section>

                        <section className="actionSection">
                            <button className="actionButton" onClick={() => navigate('/')}>
                                🔍 Browse Events
                            </button>
                        </section>
                    </div>
                ) : (
                    <div className="organizationDashboard">
                        <section className="welcomeSection">
                            <h2>🏢 Organization Hub</h2>
                            <p>Manage your volunteer events and track community impact.</p>
                        </section>

                        <section className="statsSection">
                            <div className="statCard">
                                <div className="statIcon">📌</div>
                                <div>
                                    <h3>{statsEvents}</h3>
                                    <p>Events Created</p>
                                </div>
                            </div>
                            <div className="statCard">
                                <div className="statIcon">👥</div>
                                <div>
                                    <h3>{statsVolunteers}</h3>
                                    <p>Total Volunteers</p>
                                </div>
                            </div>
                            <div className="statCard">
                                <div className="statIcon">⭐</div>
                                <div>
                                    <h3>{Math.floor(statsVolunteers * 1.5)}</h3>
                                    <p>Community Impact</p>
                                </div>
                            </div>
                        </section>

                        <section className="eventsSection">
                            <h3>📋 Your Events</h3>
                            {userEvents.length > 0 ? (
                                <div className="eventsList">
                                    {userEvents.map((event) => (
                                        <div key={event.id} className="eventItem">
                                            <div className="eventDetails">
                                                <h4>{event.name}</h4>
                                                <p>📍 {event.location}</p>
                                                <p>📅 {event.date}</p>
                                                <p className="description">{event.description}</p>
                                            </div>
                                            <div className="eventMeta">
                                                <span className="volunteers">👥 {event.volunteers} volunteers</span>
                                                <button className="editButton">✏️ Edit</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No events created yet. Start organizing volunteer activities!</p>
                            )}
                        </section>

                        <section className="actionSection">
                            <button className="actionButton primary" onClick={() => navigate('/')}>
                                ➕ Create New Event
                            </button>
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
