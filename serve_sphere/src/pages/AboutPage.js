import { useNavigate } from 'react-router-dom';
import '../styles/AboutPage.css';

const AboutPage = () => {
    const navigate = useNavigate();

    return (
        <div className="aboutPageContainer">
            <button className="backButton" onClick={() => navigate('/')}>← Back Home</button>

            <div className="aboutHero">
                <h1>✨ About ServeSphere</h1>
                <p className="tagline">Connecting Communities Through Volunteer Service</p>
            </div>

            <div className="aboutContent">
                <section className="aboutSection">
                    <h2>🎯 Our Mission</h2>
                    <p>
                        ServeSphere empowers organizations and volunteers to create meaningful local impact.
                        We believe that organizing volunteer events should be simple, intuitive, and accessible
                        to everyone who wants to make a difference in their community.
                    </p>
                </section>

                <section className="aboutSection">
                    <h2>💡 Why ServeSphere?</h2>
                    <ul>
                        <li>✅ Easy event creation for organizations</li>
                        <li>✅ Simple volunteer registration and tracking</li>
                        <li>✅ Real-time volunteer counts and engagement</li>
                        <li>✅ Community-focused platform for local impact</li>
                        <li>✅ Beautiful, intuitive user experience</li>
                    </ul>
                </section>

                <section className="aboutSection">
                    <h2>🤝 For Volunteers</h2>
                    <p>
                        Find and join events that match your interests and schedule. Track your volunteer hours,
                        connect with your community, and see the direct impact of your service.
                    </p>
                </section>

                <section className="aboutSection">
                    <h2>🏢 For Organizations</h2>
                    <p>
                        Create volunteer events, manage attendees, and track engagement. Focus on making an impact
                        while we handle the logistics of organizing volunteers.
                    </p>
                </section>

                <section className="aboutSection featuresSection">
                    <h2>✨ Key Features</h2>
                    <div className="featuresGrid">
                        <div className="featureCard">
                            <div className="featureIcon">📅</div>
                            <h3>Event Management</h3>
                            <p>Create and manage volunteer events with ease</p>
                        </div>
                        <div className="featureCard">
                            <div className="featureIcon">👥</div>
                            <h3>Volunteer Tracking</h3>
                            <p>Track volunteers and engagement in real-time</p>
                        </div>
                        <div className="featureCard">
                            <div className="featureIcon">📊</div>
                            <h3>Dashboard Analytics</h3>
                            <p>View insights and impact metrics</p>
                        </div>
                        <div className="featureCard">
                            <div className="featureIcon">🌍</div>
                            <h3>Community Impact</h3>
                            <p>Make a measurable difference locally</p>
                        </div>
                    </div>
                </section>

                <section className="aboutSection ctaSection">
                    <h2>🚀 Ready to Get Started?</h2>
                    <p>Join thousands of volunteers and organizations making a difference.</p>
                    <button className="ctaButton" onClick={() => navigate('/login')}>
                        Login to ServeSphere →
                    </button>
                </section>
            </div>
        </div>
    );
};

export default AboutPage;
