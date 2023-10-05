import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/LoginForm.css';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserProvider';


const EmployerLogin = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const registrationSuccess = location.state?.registrationSuccess;
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const { setUser } = useUserContext();
  const { setUserType } = useUserContext();
 

  const isFormValid = () => {
    if (!email.trim() || !password.trim()) {
      return false; // Username and password should not be empty or whitespace only
    }
    return true;
  };
  // Helper function to set JWT token in localStorage
  const setJwtToken = (token) => {
    localStorage.setItem('jwtToken', token);
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
       count=0;
      loginEndpoint = `${apiUrl}/adminlogin`; // Admin login endpoint
    } else {
      count=1;
      loginEndpoint = `${apiUrl}/empLogin`; // User login endpoint
    }
      // Replace 'http://localhost:5000' with your actual Spring Boot backend URL
      console.log('Email:', email);
      const response = await axios.post(loginEndpoint, {
        email,
        password,
         // Include the selected role in the request
      });

      if (response.status === 200) {
        // Assuming the response.data contains user data
        const userData = response.data;
        console.log('this is response ',userData.token);
        localStorage.setItem('jwtToken', userData.token);
        // Access and store the JWT token from the Authorization header
        const jwtToken = response.headers.authorization;
        localStorage.setItem('userType', userData.userType);

      
        // Set JWT token in localStorage
        //setJwtToken(jwtToken);

        setErrorMessage('');
        handleLogin();

        // Set user data in the context
        setUser(userData);
        setUserType(userData.userType);
        console.log('Login successful', userData);

        if (count === 0) {
          navigate('/admin');
        } else {
          navigate('/employer');
        }

        // You can now use `jwtToken` for making authenticated requests.
        //console.log('JWT Token:', jwtToken);
      } 
      else {
        setErrorMessage('Login failed. Please check your user name and password.');
        console.error('Login failed');
      }
    }catch (error) {
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
        <Link to="/forgot-password-employer" className="forgot-password-link">
          Forgot Password
        </Link>
        <button type="submit">Login</button>
        
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default EmployerLogin;
