import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserInjured, FaUserMd, FaCalendarCheck, FaCalendarTimes } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 1320,
    newPatients: 120,
    totalDoctors: 28,
    totalAppointments: 1520,
    pendingAppointments: 250,
    completedAppointments: 1150,
    rejectedAppointments: 120
  });
  
  const [monthlyData, setMonthlyData] = useState([
    { name: 'Jan', patients: 65 },
    { name: 'Feb', patients: 59 },
    { name: 'Mar', patients: 80 },
    { name: 'Apr', patients: 81 },
    { name: 'May', patients: 56 },
    { name: 'Jun', patients: 55 },
    { name: 'Jul', patients: 40 },
    { name: 'Aug', patients: 70 },
    { name: 'Sep', patients: 60 },
    { name: 'Oct', patients: 75 },
    { name: 'Nov', patients: 85 },
    { name: 'Dec', patients: 90 },
  ]);
  
  const [genderData, setGenderData] = useState([
    { year: '2014', male: 120, female: 230 },
    { year: '2015', male: 150, female: 260 },
    { year: '2016', male: 180, female: 280 },
    { year: '2017', male: 190, female: 290 },
    { year: '2018', male: 220, female: 300 },
    { year: '2019', male: 250, female: 320 },
    { year: '2020', male: 280, female: 350 },
    { year: '2021', male: 310, female: 380 },
  ]);

  const [patientRatings, setPatientRatings] = useState([
    { name: 'Jennifer', rating: 5.0, avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Murad', rating: 5.0, avatar: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Riya', rating: 4.5, avatar: 'https://i.pravatar.cc/150?img=3' },
    { name: 'Elizabeth', rating: 5.0, avatar: 'https://i.pravatar.cc/150?img=4' },
  ]);

  const [upcomingAppointments, setUpcomingAppointments] = useState([
    { time: '09 Am', name: 'John Smith', department: 'Cardiology' },
    { time: '10 Am', name: 'Sarah Johnson', department: 'Neurology' },
    { time: '01 Pm', name: 'Michael Brown', department: 'Orthopedics' },
    { time: '03 Pm', name: 'Emily Davis', department: 'Dermatology' },
    { time: '04 Pm', name: 'Robert Wilson', department: 'Pediatrics' },
    { time: '05 Pm', name: 'Jessica Lee', department: 'Ophthalmology' },
    { time: '07 Pm', name: 'David Miller', department: 'Dentistry' }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, you would fetch this data from your API
        // const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/dashboard/stats`);
        // setStats(data.stats);
        // setMonthlyData(data.monthlyData);
        // etc...
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="date-display">
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-card patients">
          <div className="stat-icon">
            <FaUserInjured />
          </div>
          <div className="stat-content">
            <h3>{stats.totalPatients.toLocaleString()}</h3>
            <p>Total Patients</p>
            <span className="growth">+12%</span>
          </div>
        </div>
        
        <div className="stat-card new-patients">
          <div className="stat-icon">
            <FaUserInjured />
          </div>
          <div className="stat-content">
            <h3>{stats.newPatients.toLocaleString()}</h3>
            <p>New Patients</p>
            <span className="growth">+7%</span>
          </div>
        </div>
        
        <div className="stat-card appointments">
          <div className="stat-icon">
            <FaCalendarCheck />
          </div>
          <div className="stat-content">
            <h3>{stats.totalAppointments.toLocaleString()}</h3>
            <p>Appointments</p>
            <span className="growth">+10%</span>
          </div>
        </div>
        
        <div className="stat-card doctors">
          <div className="stat-icon">
            <FaUserMd />
          </div>
          <div className="stat-content">
            <h3>{stats.totalDoctors.toLocaleString()}</h3>
            <p>Doctors</p>
            <span className="growth">+5%</span>
          </div>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card patient-history">
          <div className="chart-header">
            <h3>Incoming Patient History</h3>
            <div className="chart-filters">
              <button className="active">Monthly</button>
              <button>All</button>
            </div>
          </div>
          <div className="chart-stats">
            <div className="chart-stat">
              <span>1320</span>
              <p>Total Patients</p>
            </div>
            <div className="chart-stat">
              <span>250</span>
              <p>For Consultation</p>
            </div>
            <div className="chart-stat">
              <span>30</span>
              <p>For Report</p>
            </div>
            <div className="chart-stat">
              <span>13</span>
              <p>For Surgery</p>
            </div>
          </div>
          <div className="patient-chart">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#243A73" opacity={0.1} />
                <XAxis dataKey="name" stroke="#8799B0" />
                <YAxis stroke="#8799B0" />
                <Tooltip contentStyle={{ backgroundColor: '#1E2A49', borderColor: '#243A73', color: '#fff' }} />
                <Line type="monotone" dataKey="patients" stroke="#37D1DC" strokeWidth={2} activeDot={{ r: 8 }} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card appointments-status">
          <h3>Appointment Status</h3>
          <div className="appointments-donut">
            <div className="donut-chart">
              <svg width="150" height="150" viewBox="0 0 150 150">
                <circle cx="75" cy="75" r="60" fill="transparent" stroke="#3B5FE8" strokeWidth="15" strokeDasharray="377" strokeDashoffset="0" />
                <circle cx="75" cy="75" r="60" fill="transparent" stroke="#FF6B6B" strokeWidth="15" strokeDasharray="377" strokeDashoffset="301.6" transform="rotate(-90 75 75)" />
                <text x="75" y="75" textAnchor="middle" dominantBaseline="middle" fontSize="24" fontWeight="bold" fill="#fff">
                  1.3k
                </text>
                <text x="75" y="95" textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#8799B0">
                  Total
                </text>
              </svg>
            </div>
            <div className="donut-legend">
              <div className="legend-item">
                <span className="legend-color online"></span>
                <span>Online</span>
              </div>
              <div className="legend-item">
                <span className="legend-color offline"></span>
                <span>Offline</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="charts-row">
        <div className="chart-card patient-ratings">
          <h3>Rating By Patient</h3>
          <div className="ratings-list">
            {patientRatings.map((patient, index) => (
              <div className="rating-item" key={index}>
                <div className="patient-info">
                  <div className="avatar">
                    <img src="/api/placeholder/40/40" alt={patient.name} />
                  </div>
                  <span>{patient.name}</span>
                </div>
                <div className="rating">
                  <span className="stars">{'★'.repeat(Math.floor(patient.rating))}{'☆'.repeat(5 - Math.floor(patient.rating))}</span>
                  <span className="rating-value">{patient.rating.toFixed(1)}</span>
                </div>
              </div>
            ))}
            <button className="more-button">More</button>
          </div>
        </div>
        
        <div className="chart-card gender-distribution">
          <div className="chart-header">
            <h3>Patient Visit by Gender</h3>
            <div className="chart-filters">
              <button className="active">Monthly</button>
              <button>All</button>
            </div>
          </div>
          <div className="gender-chart">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={genderData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#243A73" opacity={0.1} />
                <XAxis dataKey="year" stroke="#8799B0" />
                <YAxis stroke="#8799B0" />
                <Tooltip contentStyle={{ backgroundColor: '#1E2A49', borderColor: '#243A73', color: '#fff' }} />
                <Legend wrapperStyle={{ color: '#8799B0', fontSize: '12px' }} />
                <Bar dataKey="male" name="Male" fill="#3B5FE8" barSize={10} radius={[10, 10, 0, 0]} />
                <Bar dataKey="female" name="Female" fill="#FF6B6B" barSize={10} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="upcoming-schedule">
        <div className="schedule-header">
          <h3>Upcoming Schedule</h3>
          <span className="date">Monday, 12 June 2025</span>
          <button className="calendar-toggle">Calendar</button>
        </div>
        
        <div className="schedule-timeline">
          {upcomingAppointments.map((appointment, index) => (
            <div className="timeline-item" key={index}>
              <div className="time">{appointment.time}</div>
              {index % 3 === 0 && (
                <div className="appointment">
                  <div className="appointment-info">
                    <h4>{appointment.name}</h4>
                    <p>{appointment.department}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;