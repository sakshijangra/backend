import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/appointment/getall`);
      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/appointment/update/${id}`, { status });
      if (data.success) {
        toast.success(data.message);
        fetchAppointments();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update appointment status');
    }
  };

  const deleteAppointment = async (id) => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/appointment/delete/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchAppointments();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete appointment');
    }
  };

  const filteredAppointments = filter === 'all' 
    ? appointments 
    : appointments.filter(appointment => appointment.status === filter);

  return (
    <div className="appointments-page">
      <div className="page-header">
        <h1>Manage Appointments</h1>
      </div>
      
      <div className="filter-controls">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'Pending' ? 'active' : ''} 
          onClick={() => setFilter('Pending')}
        >
          Pending
        </button>
        <button 
          className={filter === 'Accepted' ? 'active' : ''} 
          onClick={() => setFilter('Accepted')}
        >
          Accepted
        </button>
        <button 
          className={filter === 'Rejected' ? 'active' : ''} 
          onClick={() => setFilter('Rejected')}
        >
          Rejected
        </button>
      </div>
      
      {loading ? (
        <div className="loading">Loading appointments...</div>
      ) : filteredAppointments.length === 0 ? (
        <div className="no-data">No appointments found</div>
      ) : (
        <div className="appointments-table-container">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Department</th>
                <th>Doctor</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.firstName} {appointment.lastName}</td>
                  <td>{appointment.email}</td>
                  <td>{appointment.phone}</td>
                  <td>{new Date(appointment.appointment_date).toLocaleDateString()}</td>
                  <td>{appointment.department}</td>
                  <td>{appointment.doctor.firstName} {appointment.doctor.lastName}</td>
                  <td>
                    <span className={`status ${appointment.status.toLowerCase()}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="actions">
                    {appointment.status === 'Pending' && (
                      <>
                        <button 
                          className="accept-btn"
                          onClick={() => updateAppointmentStatus(appointment._id, 'Accepted')}
                        >
                          <FaCheck />
                        </button>
                        <button 
                          className="reject-btn"
                          onClick={() => updateAppointmentStatus(appointment._id, 'Rejected')}
                        >
                          <FaTimes />
                        </button>
                      </>
                    )}
                    <button 
                      className="delete-btn"
                      onClick={() => deleteAppointment(appointment._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Appointments;