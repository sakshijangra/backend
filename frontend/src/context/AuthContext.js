import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const role = localStorage.getItem('role');
      if (!role) {
        setLoading(false);
        return;
      }

      const endpoint = role === 'Admin' ? '/api/v1/user/admin/me' : '/api/v1/user/patient/me';
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}${endpoint}`);
      
      if (data.success) {
        setUser(data.user);
      }
    } catch (err) {
      console.error('Auth error:', err);
      localStorage.removeItem('role');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (userData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user/login`, userData);
      
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('role', data.user.role);
        toast.success(data.message);
        return { success: true, role: data.user.role };
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      toast.error(err.response?.data?.message || 'Login failed');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user/patient/register`, userData);
      
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('role', 'Patient');
        toast.success(data.message);
        return { success: true };
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      toast.error(err.response?.data?.message || 'Registration failed');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const role = localStorage.getItem('role');
      if (!role) return;

      const endpoint = role === 'Admin' ? '/api/v1/user/admin/logout' : '/api/v1/user/patient/logout';
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}${endpoint}`);
      
      if (data.success) {
        setUser(null);
        localStorage.removeItem('role');
        toast.success(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Logout failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
