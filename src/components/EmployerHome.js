import React from 'react';
import Sidebar from './Sidebar';
import UserTable from './UserTable';
import '../css/EmployerHome.css';

const users = [
  { id: 1, name: 'User 1', email: 'user1@example.com' },
  { id: 2, name: 'User 2', email: 'user2@example.com' },
  // Add more user data
];

const EmployerHome = () => {
  return (
    <div className="employer-home">
      <Sidebar />
      <div className="main-content">
        <h1>Welcome to the Employer Screen!</h1>
        <UserTable users={users} />
      </div>
    </div>
  );
};

export default EmployerHome;
