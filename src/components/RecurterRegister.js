import React, { useState } from 'react';
import OTPVerification from './OTPVerification';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/RegistrationForm.css';

const RecruiterRegister = () => {
  const [otpSent, setOTPSent] = useState(false);
  const [otpVerified, setOTPVerified] = useState(false);
  const [companyname, setCompanyname] = useState('');
  const [email, setEmail] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();
  const [registrationInProgress, setRegistrationInProgress] = useState(false);
  const [otpSendingInProgress, setOTPSendingInProgress] = useState(false); // New state variable for sending OTP
  const [otpVerifyingInProgress, setOTPVerifyingInProgress] = useState(false); // New state variable for verifying OTP 
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const handleSendOTP = async () => {
    try {
      setOTPSendingInProgress(true); // Set sending OTP in progress
      await axios.post(`${apiUrl}/send-otp`, { email });
      setOTPSent(true);
      setOTPSendingInProgress(false); // Clear sending OTP in progress
    } catch (error) {
      console.error('Error sending OTP:', error);
      setOTPSendingInProgress(false); // Clear sending OTP in progress in case of error
    }
  };

  const isPasswordValid = (password) => {
    // Password must be at least 6 characters long
    if (password.length < 6) {
      return false;
    }
  
    // Password must contain at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }
  
    // Password must contain at least one special character (non-alphanumeric)
    if (!/[^A-Za-z0-9]/.test(password)) {
      return false;
    }
  
    // Password cannot contain spaces
    if (/\s/.test(password)) {
      return false;
    }
  
    return true;
  };
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isMobileNumberValid = (mobilenumber) => {
    // Mobile number must contain only numeric digits
    if (!/^\d+$/.test(mobilenumber)) {
      return false;
    }

    // Mobile number must have a specific length (e.g., 10 digits)
    if (mobilenumber.length !== 10) {
      return false;
    }

    const firstDigit = mobilenumber.charAt(0);
  if (!['6', '7', '8', '9'].includes(firstDigit)) {
    return false;
  }
    return true;
  };

  const isFormValid = () => {
    if (!isEmailValid(email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (!isMobileNumberValid(mobilenumber)) {
      setErrorMessage('Please enter a valid 10-digit mobile number & should begin with 6 or 7 or 8 or 9.');
      return false;
    }
    if (!isPasswordValid(password)) {
      setErrorMessage('Password must be at least 6 characters long and should have one cpital letter and one small letter and no spaces are allowed.');
      return false;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return false;
    }

    return true;
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      return; // Do not proceed with registration if form is invalid
    }

    try {
      setRegistrationInProgress(true);
      const response = await axios.post(`${apiUrl}/EmpRegister`, {
        companyname, 
        mobilenumber,
        email,
        password,
      });

      setErrorMessage('');
      setRegistrationSuccess(true);

      console.log('Registration successful', response.data);
      
      setRegistrationInProgress(false);
      if (otpSent && otpVerified) {
          
          navigate('/employerlogin', { state: { registrationSuccess: true } });
      }
    } catch (error) {
      setErrorMessage('Registration failed. Please try again later.');
      window.alert('Registration failed! User with this email already exists.');
      console.error('Registration failed', error);
    }
  };

  

  return (
    <div className="registration-form-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>Recruiter Register</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
        
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Company Name"
            value={companyname}
            onChange={(e) => setCompanyname(e.target.value)}
          />
          <div className="helpful-line">Enter your company name</div>
        </div>
        
        
        
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Helpful line */}
          <div className="helpful-line">Enter your email address</div>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobilenumber}
            onChange={(e) => setMobilenumber(e.target.value)}
          />
          {/* Helpful line */}
          <div className="helpful-line">Enter your 10-digit mobile number and mobile number should begin with 6 or 7 or 8 or 9</div>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Helpful line */}
          <div className="helpful-line">
          Password must be at least 6 characters long, contain one uppercase letter, one lowercase letter, one number, one special character, and no spaces.
          </div>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/* Helpful line */}
          <div className="helpful-line">Re-enter your password to confirm</div>
        </div>
        {/* Rest of the code remains the same */}
         {/* Include the PdfUpload component here */}
        
         {otpSent && !otpVerified ? (
  <div>
    <p style={{ color: 'green' }}>OTP sent to your email. Please check and enter below:</p>
    <OTPVerification
            email={email}
            onOTPVerified={() => setOTPVerified(true)}
            otpVerifyingInProgress={otpVerifyingInProgress}
            setOTPVerifyingInProgress={setOTPVerifyingInProgress}
          />
    <button
      type="button"
      onClick={handleSendOTP}
      disabled={otpSent || registrationInProgress || otpSendingInProgress}
    >
      {otpSendingInProgress ? (
        
        <div className="spinner"></div>
       
      ) : (
        <div></div>
      )}
    </button>
  </div>
) : (
  <div>
    {otpVerified ? (
      <div style={{ color: 'green' }}>
        <p>OTP verified successfully! Click on Register to proceed</p>
      </div>
    ) : (
      <div>
        <div className="helpful-line">Click on send OTP to verify your email</div>
        <button
          type="button"
          onClick={handleSendOTP}
          disabled={otpSent || registrationInProgress || otpSendingInProgress}
        >
          {otpSendingInProgress ? (
             <div className="status-container">
             <div className="spinner"></div>
             <div className="status-text">Sending OTP</div>
           </div>
          ) : (
            'Send OTP'
          )}
        </button>
      </div>
    )}
  </div>
)}

{otpVerified && (
  <button type="submit">
    {registrationInProgress ? (
       <div className="status-container">
       <div className="spinner"></div>
       <div className="status-text">Registering</div>
     </div>
    ) : (
      'Register'
    )}
  </button>
)}
      </form>
    </div>
  );
};

export default RecruiterRegister;
