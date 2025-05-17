// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';
import DoctorsList from './pages/DoctorsList';

// Admin Dashboard Pages
import Dashboard from './pages/admin/Dashboard';
import Messages from './pages/admin/Messages';
import Appointments from './pages/admin/Appointments';
import AddDoctor from './pages/admin/AddDoctor';
import AddAdmin from './pages/admin/AddAdmin';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminSidebar from './components/AdminSidebar';
import ProtectedRoute from './components/ProtectedRoute';

// Context
import { AuthProvider } from './context/AuthContext';

axios.defaults.withCredentials = true;

function App() {
  const [isAdminPath, setIsAdminPath] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminPath(window.location.pathname.startsWith('/admin'));
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-center" />
        <div className="app-container">
          {isAdminPath ? (
            <div className="admin-layout">
              <AdminSidebar />
              <div className="admin-content">
                <Routes>
                  <Route path="/admin/dashboard" element={<ProtectedRoute element={<Dashboard />} role="Admin" />} />
                  <Route path="/admin/messages" element={<ProtectedRoute element={<Messages />} role="Admin" />} />
                  <Route path="/admin/appointments" element={<ProtectedRoute element={<Appointments />} role="Admin" />} />
                  <Route path="/admin/add-doctor" element={<ProtectedRoute element={<AddDoctor />} role="Admin" />} />
                  <Route path="/admin/add-admin" element={<ProtectedRoute element={<AddAdmin />} role="Admin" />} />
                  <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
                </Routes>
              </div>
            </div>
          ) : (
            <>
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/doctors" element={<DoctorsList />} />
                  <Route path="/appointment" element={<ProtectedRoute element={<Appointment />} role="Patient" />} />
                </Routes>
              </main>
              <Footer />
            </>
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;