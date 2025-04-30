import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email.includes('@')) newErrors.email = 'البريد الإلكتروني غير صحيح';
    if (password.length < 6) newErrors.password = 'كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/dashboard');
    }
  };

  return (
    <main role="main" className="login-container">
      <div className="login-wrapper">

        <img src="/images/logo.png" alt="شعار النظام" className="login-logo" />
        <h1 className="login-title">تسجيل الدخول إلى بصيرة </h1>

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
              aria-describedby="email-error"
              className={errors.email ? 'error' : ''}
              required
            />
            {errors.email && (
              <p id="email-error" className="error-message" role="alert">
                ⚠️ {errors.email}
              </p>
            )}
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
              aria-describedby="password-error"
              className={errors.password ? 'error' : ''}
              required
            />
            {errors.password && (
              <p id="password-error" className="error-message" role="alert">
                ⚠️ {errors.password}
              </p>
            )}
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
          <button type="submit" className="login-button">
            تسجيل الدخول
          </button>

          {/* روابط إضافية */}
          <div className="links">
            <Link to="/forgot-password" className="link">نسيت كلمة المرور؟</Link>
            <Link to="/Signup" className="link">إنشاء حساب طالب جديد</Link>
            <Link to="/Signup" className="link">إنشاء حساب متطوع جديد</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;