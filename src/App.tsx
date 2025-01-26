
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Calculator from './components/Calculator';
import UserRegistration from './components/UserRegistration';
import LoanRequestForm from './components/LoanRequestForm';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loan-request" element={<LoanRequestForm />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;