import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userRole, setUserRole] = useState(localStorage.getItem('trustvolv_role') || null);
  const navigate = useNavigate();

  const login = (role) => {
    localStorage.setItem('trustvolv_role', role);
    setUserRole(role);
    navigate(`/${role}`);
  };

  const logout = () => {
    localStorage.removeItem('trustvolv_role');
    setUserRole(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
