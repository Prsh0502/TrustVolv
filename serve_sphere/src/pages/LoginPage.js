import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
    const [role, setRole] = useState(null);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!role || !formData.email || !formData.password) return;

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({
            role,
            email: formData.email,
            logged: true,
        }));

        // Redirect based on role
        navigate('/dashboard');
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="loginPageContainer">
            <div className="loginCard">
                <button className="backButton" onClick={handleBackToHome}>← Back</button>

                {!role ? (
                    <div className="roleSelection">
                        <h2>👋 Welcome to ServeSphere</h2>
                        <p>Choose your role to get started</p>

                        <div className="roleOptions">
                            <div className="roleCard" onClick={() => handleRoleSelect('volunteer')}>
                                <div className="roleIcon">🙋</div>
                                <h3>Volunteer</h3>
                                <p>Join events and make a local impact</p>
                            </div>

                            <div className="roleCard" onClick={() => handleRoleSelect('organization')}>
                                <div className="roleIcon">🏢</div>
                                <h3>Organization</h3>
                                <p>Create and manage volunteer events</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="loginForm">
                        <h2>🔐 {role === 'volunteer' ? '🙋 Volunteer' : '🏢 Organization'} Login</h2>
                        <p className="roleDisplay">Logging in as: <strong>{role}</strong></p>

                        <form onSubmit={handleSubmit}>
                            <label>
                                📧 Email
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    required
                                />
                            </label>

                            <label>
                                🔑 Password
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                />
                            </label>

                            <button type="submit" className="loginButton">Login</button>
                        </form>

                        <button className="changeRoleButton" onClick={() => setRole(null)}>← Change Role</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
