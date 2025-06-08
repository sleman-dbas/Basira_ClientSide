// src/pages/VerifyOTP.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyOTP = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const otpInputs = useRef([]);
  const navigate = useNavigate();

  // بدء المؤقت عند تحميل الصفحة
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          setResendDisabled(false);
          toast.info('يمكنك الآن إعادة إرسال رمز التحقق');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(countdown);
  }, []);

  // تنسيق الوقت لعرضه بالشكل MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // التعامل مع تغيير حقل OTP
  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // الانتقال للحقل التالي إذا تم إدخال قيمة
    if (value && index < 5) {
      otpInputs.current[index + 1].focus();
    }
  };

  // التعامل مع مفتاح Backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  // إعادة إرسال رمز OTP
  const handleResend = async () => {
    if (!email) {
      toast.error('الرجاء إدخال البريد الإلكتروني');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // استدعاء API لإعادة إرسال الرمز باستخدام fetch
      const response = await fetch('http://localhost:3000/api/users/generateOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'فشل إعادة الإرسال');
      }
      
      toast.success('تم إرسال رمز جديد إلى هاتفك!', {
        position: "top-center",
        theme: "colored"
      });
      
      setTimer(30);
      setResendDisabled(true);
      
      // إعادة تشغيل المؤقت
      const countdown = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(countdown);
            setResendDisabled(false);
            toast.info('يمكنك الآن إعادة إرسال رمز التحقق');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (error) {
      toast.error(error.message || 'حدث خطأ في الشبكة. يرجى المحاولة مرة أخرى', {
        position: "top-center",
        theme: "colored"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // التحقق من رمز OTP باستخدام fetch
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('الرجاء إدخال البريد الإلكتروني');
      return;
    }
    
    if (otp.some(digit => digit === '')) {
      toast.error('الرجاء إدخال جميع الأرقام', {
        position: "top-center",
        theme: "colored"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const otpCode = otp.join('');
      
      // استدعاء API للتحقق من OTP باستخدام fetch
      const response = await fetch('http://localhost:3000/api/users/verifyOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, code: otpCode })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'رمز التحقق غير صحيح');
      }
      
      toast.success('تم التحقق بنجاح! جاري التوجيه...', {
        position: "top-center",
        autoClose: 2000,
        theme: "colored"
      });
      
      // توجيه المستخدم بعد التحقق الناجح
      setTimeout(() => {
        navigate('/volunteer-request-success'); // توجيه إلى لوحة التحكم
      }, 2000);
    } catch (error) {
      toast.error(error.message || 'حدث خطأ في التحقق. يرجى المحاولة لاحقًا', {
        position: "top-center",
        theme: "colored"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="otp-page">
      <ToastContainer />
      
      <div className="otp-container">
        <h1 className="otp-title">تأكيد رمز OTP</h1>
        <p className="otp-subtitle">
          لقد أرسلنا رمز التحقق المكون من 6 أرقام إلى هاتفك المحمول. يرجى إدخاله أدناه
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="email-input-group">
            <label htmlFor="email" className="email-label">البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              className="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
            />
          </div>
          
          {/* حاوية OTP مع اتجاه من اليسار إلى اليمين */}
          <div className="otp-inputs ltr-direction">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                className="otp-input"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (otpInputs.current[index] = el)}
              />
            ))}
          </div>
          
          <button 
            className="otp-button" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'جاري التحقق...' : 'تحقق'}
          </button>
        </form>
        
        <div className="resend-section">
          <p className="resend-text">لم تستلم الرمز؟</p>
          <button 
            className={`resend-link ${resendDisabled ? 'disabled' : ''}`}
            onClick={handleResend}
            disabled={resendDisabled || isLoading}
          >
            {isLoading ? 'جاري الإرسال...' : 'إعادة إرسال الرمز'}
          </button>
          <div className="timer">{formatTime(timer)}</div>
        </div>
      </div>
      
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Arial', sans-serif;
        }
        
        .otp-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 1rem;
          background: linear-gradient(135deg, #1A237E 0%, #4A148C 100%);
          direction: rtl; /* اتجاه الصفحة العام */
        }
        
        .otp-container {
          width: 100%;
          max-width: 500px;
          padding: 2.5rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        
        .otp-title {
          font-size: 2.2rem;
          margin-bottom: 1.5rem;
          color: #FFD700;
          font-weight: bold;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .otp-subtitle {
          color: #E0E0E0;
          margin-bottom: 2rem;
          line-height: 1.6;
          font-size: 1.1rem;
        }
        
        .email-input-group {
          margin-bottom: 1.8rem;
          text-align: right;
        }
        
        .email-label {
          display: block;
          margin-bottom: 0.8rem;
          color: #FFD700;
          font-weight: bold;
          font-size: 1.1rem;
        }
        
        .email-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid #FFA500;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.9);
          color: #333;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          outline: none;
          text-align: right; /* اتجاه نص البريد الإلكتروني من اليمين */
        }
        
        .email-input:focus {
          border-color: #FFD700;
          box-shadow: 0 0 12px rgba(255, 215, 0, 0.7);
          background: rgba(255, 255, 255, 1);
        }
        
        /* حاوية OTP مع اتجاه من اليسار إلى اليمين */
        .otp-inputs.ltr-direction {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2.2rem;
          direction: ltr; /* اتجاه الحقول من اليسار إلى اليمين */
        }
        
        .otp-input {
          width: 55px;
          height: 65px;
          font-size: 2rem;
          text-align: center;
          border: 2px solid #FFA500;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.95);
          color: #000;
          outline: none;
          transition: all 0.3s;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: left; /* محاذاة النص داخل الحقل إلى اليسار */
        }
        
        .otp-input:focus {
          border-color: #FFD700;
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
          transform: translateY(-3px);
        }
        
        .otp-button {
          width: 100%;
          padding: 1.1rem;
          background: linear-gradient(to right, #FFA500, #FF8C00);
          color: #1A237E;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          margin-top: 1rem;
          transition: all 0.3s;
          font-size: 1.2rem;
          box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .otp-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(255, 140, 0, 0.4);
        }
        
        .otp-button:active:not(:disabled) {
          transform: translateY(1px);
        }
        
        .otp-button:disabled {
          background: linear-gradient(to right, #ccc, #999);
          cursor: not-allowed;
          opacity: 0.7;
        }
        
        .resend-section {
          margin-top: 1.8rem;
          color: #E0E0E0;
          padding: 1.2rem;
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.2);
        }
        
        .resend-text {
          margin-bottom: 0.8rem;
          font-size: 1.1rem;
        }
        
        .resend-link {
          background: none;
          border: none;
          color: #FFA500;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s;
          font-size: 1.1rem;
          padding: 0.5rem 1rem;
          font-weight: bold;
          display: inline-block;
          border-radius: 6px;
          position: relative;
        }
        
        .resend-link:not(.disabled):hover {
          color: #FFD700;
          background: rgba(255, 215, 0, 0.1);
        }
        
        .resend-link:not(.disabled)::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: #FFA500;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s;
        }
        
        .resend-link:not(.disabled):hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        
        .resend-link.disabled {
          color: #999;
          cursor: not-allowed;
        }
        
        .timer {
          color: #FFD700;
          font-weight: bold;
          font-size: 1.3rem;
          margin-top: 0.8rem;
          letter-spacing: 1px;
        }
        
        @media (max-width: 600px) {
          .otp-container {
            padding: 1.8rem;
            max-width: 95%;
          }
          
          .otp-title {
            font-size: 1.8rem;
          }
          
          .otp-inputs.ltr-direction {
            gap: 0.7rem;
          }
          
          .otp-input {
            width: 45px;
            height: 55px;
            font-size: 1.7rem;
          }
          
          .email-input {
            padding: 0.9rem;
          }
          
          .otp-button {
            padding: 1rem;
            font-size: 1.1rem;
          }
        }
        
        @media (max-width: 480px) {
          .otp-container {
            padding: 1.5rem;
          }
          
          .otp-inputs.ltr-direction {
            gap: 0.5rem;
          }
          
          .otp-input {
            width: 40px;
            height: 50px;
            font-size: 1.5rem;
          }
          
          .resend-section {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default VerifyOTP;