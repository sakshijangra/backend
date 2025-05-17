import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaChartLine, FaCalendarAlt, FaUserMd, FaUserShield, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-profile">
        <div className="admin-avatar">
          <span>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</span>
        </div>
        <h3>{user?.firstName} {user?.lastName}</h3>
        <p>Administrator</p>
      </div>
      
      <ul className="admin-menu">
        <li className={location.pathname === '/admin/dashboard' ? 'active' : ''}>
          <Link to="/admin/dashboard">
            <FaChartLine /> <span>Dashboard</span>
          </Link>
        </li>
        <li className={location.pathname === '/admin/appointments' ? 'active' : ''}>
          <Link to="/admin/appointments">
            <FaCalendarAlt /> <span>Appointments</span>
          </Link>
        </li>
        <li className={location.pathname === '/admin/add-doctor' ? 'active' : ''}>
          <Link to="/admin/add-doctor">
            <FaUserMd /> <span>Add Doctor</span>
          </Link>
        </li>
        <li className={location.pathname === '/admin/add-admin' ? 'active' : ''}>
          <Link to="/admin/add-admin">
            <FaUserShield /> <span>Add Admin</span>
          </Link>
        </li>
        <li className={location.pathname === '/admin/messages' ? 'active' : ''}>
          <Link to="/admin/messages">
            <FaEnvelope /> <span>Messages</span>
          </Link>
        </li>
      </ul>
      
      <button className="logout-button" onClick={handleLogout}>
        <FaSignOutAlt /> <span>Logout</span>
      </button>
    </div>
  );
};

export default AdminSidebar;