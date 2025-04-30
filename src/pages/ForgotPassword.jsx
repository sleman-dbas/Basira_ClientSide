import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/ForgotPassword.css'
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email.includes('@')) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      setTimeout(() => navigate('/login'), 3000);
    }
  };

  return (
    <main role="main" className="login-container" aria-label="صفحة استعادة كلمة المرور">
      <div className="login-wrapper">
        <img 
          src="/images/logo.png" 
          alt="شعار النظام" 
          className="login-logo"
          aria-hidden="true"
        />
        <h1 className="login-title">استعادة كلمة المرور</h1>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <label htmlFor="email">البريد الإلكتروني المسجل</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني"
                aria-describedby="email-error"
                className={errors.email ? 'error' : ''}
                required
                autoFocus
              />
              {errors.email && (
                <p id="email-error" className="error-message" role="alert">
                  ⚠️ {errors.email}
                </p>
              )}
            </div>

            <button type="submit" className="login-button">
              إرسال رابط الاستعادة
            </button>

            <div className="links">
              <Link to="/login" className="link">العودة لتسجيل الدخول</Link>
              <Link to="/signup" className="link">إنشاء حساب جديد</Link>
            </div>
          </form>
        ) : (
          <div className="success-message" role="status">
            <p>✅ تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني</p>
            <p>جاري تحويلك إلى صفحة التسجيل...</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ForgotPassword;