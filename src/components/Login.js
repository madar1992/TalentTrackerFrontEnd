import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/LoginForm.css';
import ForgotPassword from './ForgotPassword';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const registrationSuccess = location.state?.registrationSuccess;
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

 
  const isFormValid = () => {
    if (!email.trim() || !password.trim()) {
      return false; // Username and password should not be empty or whitespace only
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      window.alert('Please enter both username and password.');
      return;
    }
    try {
      let loginEndpoint;
      let count;
      if (email === 'admin' && password === 'admin') {
        count = 0;
        loginEndpoint = `${apiUrl}/adminlogin`; // User login endpoint
      } else {
        count = 1;
        loginEndpoint = `${apiUrl}/login`; // Admin login endpoint
      }

      const response = await axios.post(loginEndpoint, {
        email,
        password,
      });

      setErrorMessage('');
      handleLogin();

      console.log('Login successful', response.data);

      if (count === 0) {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your user name and password.');
      console.error('Login failed', error);
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        {registrationSuccess && (
          <div className="success-message">
            Registration successful! Please log in to continue.
          </div>
        )}
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link to="/forgot-password" className="forgot-password-link">
          Forgot Password
        </Link>
        <button type="submit">Login</button>
        
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default Login;
