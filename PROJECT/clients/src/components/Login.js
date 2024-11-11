import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import { MdContactMail } from 'react-icons/md'; // Import the MdContactMail icon
import './Login.css'; // Import the CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Navbar with MdContactMail and Login Button */}
      <header className="navbar">
        <div className="logo">
          <MdContactMail size={28} /> 
        </div>
        <nav>
          <button className="login-button" onClick={() => navigate('/login')}>
            Login
          </button>
        </nav>
      </header>

      {/* Login Form */}
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" disabled={loading}>
            Login
          </button>
        </form>
        {loading && <p>Loading...</p>}
        <p>
          If you do not have an account, <Link to="/register">register here?</Link>.
        </p> {/* Registration link */}
      </div>
    </div>
  );
}

export default Login;
