import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home'; // تأكد من صحة مسار الاستيراد

function App() {
  return (
    <Router>
      <Routes>
        {/* الصفحة الرئيسية */}
        <Route path="/" element={<Home />} />
        
        {/* الصفحات الأخرى */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* مسار احتياطي لأي رابط غير موجود */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;