import { createContext, useContext, useState, useEffect } from 'react';
import AxiosInstance from '../api/AxiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    try {
      const response = await AxiosInstance.post('api/login/', credentials);
      const { access, refresh } = response.data;

      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);

      // Fetch user profile after login
      const userRes = await AxiosInstance.get('api/user/', {
        headers: { Authorization: `Bearer ${access}` },
      });
      setUser(userRes.data);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
  };

  const checkUser = async () => {
    const token = localStorage.getItem('access');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await AxiosInstance.get('api/user/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (err) {
      console.error('Auth check failed:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
