// src/components/StatsButton/StatsButton.jsx
import React, { useState } from 'react';
import './StatsButton.css';
import ExportButton from '../ExportButton/ExportButton';

const StatsButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // بيانات إحصائيات وهمية
  const statsData = {
    totalUsers: 1248,
    activeVolunteers: 86,
    completedTasks: 2450,
    conversionRate: "87%"
  };

  const toggleStats = () => {
    setIsOpen(!isOpen);
  };

  // دالة لاستخراج إحصائيات المشروع
  const exportProjectStats = () => {
    // هنا يمكن إضافة منطق تصدير البيانات (CSV, PDF, etc.)
    alert('تم استخراج إحصائيات المشروع بنجاح!');
  };

  return (
    <>
      <div className={`stats-button ${isOpen ? 'active' : ''}`} onClick={toggleStats}>
        <div className="stats-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="stats-modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setIsOpen(false)}>
              &times;
            </button>
            <div className="stats-header">
              <h2>إحصائيات المشروع</h2>
              <p>آخر تحديث: اليوم 10:30 ص</p>
            </div>
            
            <div className="stats-image-container">
              <div className="stats-visual">
                <div className="chart-bar" style={{ height: '70%' }}></div>
                <div className="chart-bar" style={{ height: '85%' }}></div>
                <div className="chart-bar" style={{ height: '60%' }}></div>
                <div className="chart-bar" style={{ height: '95%' }}></div>
              </div>
              <div className="stats-labels">
                <span>المستخدمون</span>
                <span>المتطوعون</span>
                <span>المهام</span>
                <span>التحويل</span>
              </div>
            </div>
            
            <div className="stats-details">
              <div className="stat-item">
                <div className="stat-value">{statsData.totalUsers}</div>
                <div className="stat-label">المستخدمون الكليون</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{statsData.activeVolunteers}</div>
                <div className="stat-label">متطوعون نشطون</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{statsData.completedTasks}</div>
                <div className="stat-label">مهام مكتملة</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{statsData.conversionRate}</div>
                <div className="stat-label">معدل التحويل</div>
              </div>
            </div>
            
            {/* زر استخراج الإحصائيات */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
              <ExportButton onClick={exportProjectStats} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StatsButton;