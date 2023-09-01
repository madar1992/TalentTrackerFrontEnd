import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import About from './components/About';
import Footer from './components/Footer';
import UserHome from './components/UserHome';
import Admin from './components/Admin';
import Profile from './components/Profile';
import RecurterRegister from './components/RecurterRegister';
import EmployerLogin from './components/EmployerLogin';
import EmployerHome from './components/EmployerHome';
import ForgotPassword from './components/ForgotPassword';
import JobDescription from './components/JobDescription';
import UserProvider  from './components/UserProvider';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Example job data
  const jobs = [
    {
      id: 1,
      title: 'Fullstack Developer',
      company: 'TechCorp',
      location: 'San Francisco',
      salary: '100,000 - 120,000 USD',
      experience: '3-5 Years',
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'WebTech',
      location: 'New York',
      salary: '90,000 - 110,000 USD',
      experience: '2-4 Years',
    },
    // Add more jobs as needed
  ];

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <UserProvider> {/* Wrap routes that require user context */}
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
  
          <Route path="/employerRegister" element={<RecurterRegister />} />
          <Route path="/employerlogin" element={<EmployerLogin handleLogin={handleLogin} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/job/:id" element={<JobDescription jobs={jobs} />} />
  
          {isLoggedIn ? (
            <>
              <Route path="/user" element={<UserHome />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/employer" element={<EmployerHome />} />
            </>
          ) : null}
        </Routes>
     
      <Footer />
    </Router>
    </UserProvider>
  );
};

export default App;
