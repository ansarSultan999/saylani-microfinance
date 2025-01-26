import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Application {
  id: string;
  category: string;
  subcategory: string;
  amount: number;
  status: string;
  tokenNumber?: string;
  guarantor1: Guarantor;
  guarantor2: Guarantor;
}

interface Guarantor {
  name: string;
  email: string;
  location: string;
  cnic: string;
}

interface Filter {
  city: string;
  country: string;
}

const AdminDashboard: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState<Filter>({ city: '', country: '' });

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const fetchApplications = async (): Promise<void> => {
    try {
      const response = await axios.get('/api/admin/applications', { params: filter });
      setApplications(response.data.applications);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: string): Promise<void> => {
    try {
      await axios.put(`/api/admin/applications/${applicationId}`, { status });
      fetchApplications();
    } catch (error) {
      console.error('Failed to update application status:', error);
    }
  };

  const addTokenNumber = async (applicationId: string, tokenNumber: string): Promise<void> => {
    try {
      await axios.put(`/api/admin/applications/${applicationId}/token`, { tokenNumber });
      fetchApplications();
    } catch (error) {
      console.error('Failed to add token number:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="filter">
        <input 
          type="text" 
          value={filter.city} 
          onChange={(e) => setFilter({...filter, city: e.target.value})}
          placeholder="Filter by City"
        />
        <input 
          type="text" 
          value={filter.country} 
          onChange={(e) => setFilter({...filter, country: e.target.value})}
          placeholder="Filter by Country"
        />
      </div>
      <div className="applications">
        {applications.map((app) => (
          <div key={app.id} className="application">
            <h3>Application {app.id}</h3>
            <p>Category: {app.category}</p>
            <p>Subcategory: {app.subcategory}</p>
            <p>Amount: PKR {app.amount}</p>
            <p>Status: {app.status}</p>
            <select 
              value={app.status} 
              onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            {app.status === 'approved' && !app.tokenNumber && (
              <input 
                type="text" 
                placeholder="Add Token Number"
                onBlur={(e) => addTokenNumber(app.id, e.target.value)}
              />
            )}
            <h4>Guarantor 1</h4>
            <p>Name: {app.guarantor1.name}</p>
            <p>Email: {app.guarantor1.email}</p>
            <p>Location: {app.guarantor1.location}</p>
            <p>CNIC: {app.guarantor1.cnic}</p>
            <h4>Guarantor 2</h4>
            <p>Name: {app.guarantor2.name}</p>
            <p>Email: {app.guarantor2.email}</p>
            <p>Location: {app.guarantor2.location}</p>
            <p>CNIC: {app.guarantor2.cnic}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;