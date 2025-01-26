import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserRegistration.css'; // Import the CSS file for styling

const UserRegistration: React.FC = () => {
  const [cnic, setCnic] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    alert(`Registration successful for ${name} with CNIC: ${cnic} and Email: ${email}`);
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="user-registration">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            type="text" 
            value={cnic} 
            onChange={(e) => setCnic(e.target.value)}
            placeholder="CNIC"
            required
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegistration;