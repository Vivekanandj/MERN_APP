import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdContactMail } from 'react-icons/md'; // Importing the icon
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import './Dashboard.css';

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulating a logged-in state
  const [activeTab, setActiveTab] = useState('home'); // To track the active tab
  const [username, setUsername] = useState(''); // Username after login
  const [data, setData] = useState(null); // Data for the dashboard
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Simulated login function
  const handleLogin = (userName) => {
    setIsLoggedIn(true);
    setUsername(userName); // Set the username when the user logs in
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername(''); // Clear the username on logout
    localStorage.removeItem('authToken'); // Clear auth token on logout
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        window.location.href = '/login'; // Redirect to login if no token
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);  // Set the data from the response
        setLoading(false);  // Set loading to false when the data is fetched
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Error fetching dashboard data. Please try again later.');
        setLoading(false);  // Stop loading in case of error
      }
    };

    fetchData(); // Fetch dashboard data on mount
  }, []);  // Empty array ensures this effect runs only once after component mount

  // Show loading message while fetching
  if (loading) return <p>Loading...</p>;

  // Show error message if fetching fails
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="flex justify-center items-center gap-2">
          <MdContactMail size={28} /> 
        </div>

        <nav>
          <button className="tab" onClick={() => handleTabClick('home')}>
            Home
          </button>
          <button className="tab" onClick={() => handleTabClick('employeeList')}>
            Employee List
          </button>
        </nav>

        <div className="user-info">
          {isLoggedIn ? (
            <>
              <span>{username}</span> - <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button onClick={() => handleLogin('John Doe')}>Login</button> // Simulating login
          )}
        </div>
      </header>

      <div className="content">
        {activeTab === 'home' && (
          <div className="header-section">
            <h2>Welcome, {username || 'Admin'}</h2>
          </div>
        )}

        {activeTab === 'employeeList' && (
          <div className="header-section">
            <h2>Employee List</h2>
            <button className="create-button">Create Employee</button>
            <input type="text" placeholder="Enter Search Keyword" className="search-bar" />
          </div>
        )}

        {activeTab === 'employeeList' && (
          <>
            <EmployeeForm />
            <EmployeeList data={data} /> {/* Pass fetched data to EmployeeList */}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
