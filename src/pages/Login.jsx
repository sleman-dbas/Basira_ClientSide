import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('البريد الإلكتروني غير صحيح', { rtl: true });
      isValid = false;
    }
    
    if (password.length < 6) {
      toast.error('كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل', { rtl: true });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json(); // تغيير اسم المتغير إلى result

      if (!response.ok) {
        throw new Error(result.message || 'فشل في عملية التسجيل');
      }

      // تحقق من وجود التوكن في الهيكل الجديد
      if (!result.data?.user?.token) {
        throw new Error('لم يتم استقبال التوكن من الخادم');
      }

      // حفظ التوكن من الهيكل الجديد
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('userToken', result.data.user.token); // التعديل هنا

      toast.success('تم تسجيل الدخول بنجاح!', { rtl: true });
      setTimeout(() => navigate('/'), 2000);

    } catch (error) {
      // ... معالجة الأخطاء بدون تغيير ...
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main role="main" className="login-container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop
        closeOnClick
        rtl={true}
        theme="colored"
      />

      <div className="login-wrapper">
        <img src="/images/logo.png" alt="شعار النظام" className="login-logo" />
        <h1 className="login-title">تسجيل الدخول إلى بصيرة</h1>

        <form onSubmit={handleSubmit} noValidate>
          {/* حقل البريد الإلكتروني */}
          <div className="input-group">
            <label htmlFor="email">البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="أدخل بريدك الإلكتروني"
              required
            />
          </div>

          {/* حقل كلمة المرور */}
          <div className="input-group">
            <label htmlFor="password">كلمة المرور</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              required
            />
          </div>

          {/* خيار تذكرني */}
          <div className="remember-me">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                aria-label="تذكرني على هذا الجهاز"
              />
              <span>تذكرني</span>
            </label>
          </div>

          {/* زر التسجيل */}
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>

          {/* روابط إضافية */}
          <div className="links">
            <Link to="/forgot-password" className="link">نسيت كلمة المرور؟</Link>
            <Link to="/volunteer-test" className="link">إنشاء حساب متطوع جديد</Link>
            <Link to="/signup" className="link">إنشاء حساب طالب جديد</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;