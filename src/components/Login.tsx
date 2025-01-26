import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [isFirstLogin, setIsFirstLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.data.success) {
        if (response.data.isFirstLogin) {
          setIsFirstLogin(true);
        } else {
          navigate('/user-dashboard');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/change-password', { email, newPassword });
      if (response.data.success) {
        alert('Password changed successfully.');
        navigate('/user-dashboard');
      }
    } catch (error) {
      console.error('Password change failed:', error);
      alert('Password change failed. Please try again.');
    }
  };

  if (isFirstLogin) {
    return (
      <div className="login">
        <h2>Change Password</h2>
        <form onSubmit={handlePasswordChange}>
          <input 
            type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            required
          />
          <button type="submit">Change Password</button>
        </form>
      </div>
    );
  }

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;