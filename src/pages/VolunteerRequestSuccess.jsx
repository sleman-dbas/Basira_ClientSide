import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const VolunteerRequestSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <div className="success-container">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="success-content"
        >
          <div className="success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4CAF50">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
          
          <h1 className="success-title">تم إرسال طلب التطوع بنجاح</h1>
          
          <p className="success-message">
            شكرًا لتقديمك طلب التطوع. تم إرسال طلبك بنجاح وسيتم مراجعته من قبل الفريق المسؤول. 
            ستصلك رسالة بالموافقة أو الرفض على بريدك الإلكتروني أو رقم هاتفك المسجل خلال 3-5 أيام عمل.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="home-button"
            onClick={() => navigate('/')}
          >
            العودة إلى الصفحة الرئيسية
          </motion.button>
        </motion.div>
      </div>
      
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Arial', sans-serif;
        }
        
        .success-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 1rem;
          background-color: #F8F9FA;
          direction: rtl;
        }
        
        .success-container {
          width: 100%;
          max-width: 600px;
          padding: 2.5rem;
          background: #1A237E;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(255, 215, 0, 0.2);
          text-align: center;
        }
        
        .success-content {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 10px;
          border: 1px solid rgba(255, 165, 0, 0.3);
        }
        
        .success-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          background: rgba(76, 175, 80, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .success-icon svg {
          width: 50px;
          height: 50px;
        }
        
        .success-title {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: #FFA500;
          font-weight: bold;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .success-message {
          color: #E0E0E0;
          margin-bottom: 2rem;
          line-height: 1.8;
          font-size: 1.1rem;
        }
        
        .home-button {
          background: #FFA500;
          color: #1A237E;
          border: none;
          border-radius: 6px;
          padding: 1rem 2rem;
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          margin-top: 1rem;
        }
        
        .home-button:hover {
          background: #FFB74D;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .success-container {
            padding: 1.5rem;
          }
          
          .success-content {
            padding: 1.5rem;
          }
          
          .success-title {
            font-size: 1.7rem;
          }
          
          .success-message {
            font-size: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .success-icon {
            width: 70px;
            height: 70px;
          }
          
          .success-icon svg {
            width: 40px;
            height: 40px;
          }
          
          .success-title {
            font-size: 1.5rem;
          }
          
          .home-button {
            padding: 0.8rem 1.5rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default VolunteerRequestSuccess;