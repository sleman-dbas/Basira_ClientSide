import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import VolunteerTest from './pages/VolunteerTest'; // تأكد من المسار الصحيح
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import VolunteerTasks from './components/VolunteerTasks/VolunteerTasks';
import BlindInterface from './components/BlindInterface/BlindInterface';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/volunteer-test" element={<VolunteerTest />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Feature Routes */}
        <Route path="/volunteer-tasks" element={<VolunteerTasks />} />
        <Route path="/blind-interface" element={<BlindInterface />} />
        
        {/* Fallback Route */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;