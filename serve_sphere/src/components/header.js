import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <header className="appBanner">
            <div className="brand">
                <img src="/servesphere-logo.png" alt="ServeSphere logo" className="brandLogo" />
                <div>
                    <h1 onClick={() => navigate('/')} className="brandTitle">✨ ServeSphere</h1>
                    <p>🤝 Connect • Organize • Impact</p>
                </div>
            </div>

            <nav className="navMenu">
                <button onClick={() => navigate('/')} className="navLink">🏠 Home</button>
                <button onClick={() => navigate('/about')} className="navLink">ℹ️ About</button>
                {user ? (
                    <button onClick={() => navigate('/dashboard')} className="navLink active">📊 Dashboard</button>
                ) : (
                    <button onClick={() => navigate('/login')} className="navLink loginBtn">🔐 Login</button>
                )}
            </nav>
        </header>
    );
};

export default Header;
