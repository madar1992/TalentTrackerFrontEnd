import React, { useState } from 'react';
import axios from 'axios';
import '../css/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const handleResetPassword = async () => {
    try {
      // Send a request to the server to reset the password for the provided email
      const response = await axios.post(`${apiUrl}/reset-password`, { email });

      if (response.data === 'success') {
        setResetSuccess(true);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-content">
        {resetSuccess ? (
          <div className="success-message">
            Password reset request sent successfully. Check your email for further instructions.
          </div>
        ) : (
          <div>
            <h2>Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleResetPassword}>Reset Password</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
