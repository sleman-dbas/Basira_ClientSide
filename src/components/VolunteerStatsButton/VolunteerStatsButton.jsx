// src/components/VolunteerStatsButton/VolunteerStatsButton.jsx
import React, { useState, useEffect } from 'react';
import './VolunteerStatsButton.css';
import { FaUsers, FaSearch, FaTimes } from 'react-icons/fa';
import ExportButton from '../ExportButton/ExportButton';

const VolunteerStatsButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [volunteers, setVolunteers] = useState([]);
  
  // بيانات المتطوعين الافتراضية
  useEffect(() => {
    const mockVolunteers = [
      { id: 1, name: "أحمد محمد", status: "active", completed: 24, pending: 5, cancelled: 2 },
      { id: 2, name: "سارة عبد الله", status: "active", completed: 18, pending: 3, cancelled: 1 },
      { id: 3, name: "عمر خالد", status: "inactive", completed: 32, pending: 0, cancelled: 4 },
      { id: 4, name: "لمى حسن", status: "active", completed: 27, pending: 7, cancelled: 1 },
      { id: 5, name: "يوسف أحمد", status: "active", completed: 15, pending: 2, cancelled: 0 },
      { id: 6, name: "نورا سليمان", status: "inactive", completed: 21, pending: 0, cancelled: 3 },
      { id: 7, name: "محمد علي", status: "active", completed: 19, pending: 4, cancelled: 1 },
      { id: 8, name: "فاطمة الزهراء", status: "active", completed: 28, pending: 3, cancelled: 2 },
    ];
    setVolunteers(mockVolunteers);
  }, []);

  const toggleStats = () => {
    setIsOpen(!isOpen);
  };

  const filteredVolunteers = volunteers.filter(volunteer => 
    volunteer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // دالة لاستخراج إحصائيات المتطوعين
  const exportVolunteerStats = () => {
    // هنا يمكن إضافة منطق تصدير البيانات (CSV, PDF, etc.)
    alert('تم استخراج إحصائيات المتطوعين بنجاح!');
  };

  return (
    <>
      <div 
        className={`volunteer-stats-button ${isOpen ? 'active' : ''}`} 
        onClick={toggleStats}
      >
        <div className="volunteer-stats-icon">
          <FaUsers />
        </div>
      </div>

      {isOpen && (
        <div className="volunteer-stats-modal">
          <div className="volunteer-modal-content">
            <button 
              className="volunteer-close-button" 
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>
            <div className="volunteer-stats-header">
              <h2>إحصائيات المتطوعين</h2>
              <p>آخر تحديث: اليوم 11:45 ص</p>
            </div>
            
            <div className="volunteer-search-container">
              <input 
                type="text" 
                placeholder="ابحث عن متطوع..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="volunteer-search-icon">
                <FaSearch />
              </div>
            </div>
            
            <div className="volunteer-list">
              {filteredVolunteers.length > 0 ? (
                filteredVolunteers.map(volunteer => (
                  <div key={volunteer.id} className="volunteer-item">
                    <div className="volunteer-header">
                      <div className="volunteer-name">{volunteer.name}</div>
                      <div className={`volunteer-status ${volunteer.status}`}>
                        {volunteer.status === 'active' ? 'نشط' : 'غير نشط'}
                      </div>
                    </div>
                    <div className="volunteer-tasks">
                      <div className="task-item completed">
                        <div className="task-count">{volunteer.completed}</div>
                        <div className="task-label">منجزة</div>
                      </div>
                      <div className="task-item pending">
                        <div className="task-count">{volunteer.pending}</div>
                        <div className="task-label">غير منجزة</div>
                      </div>
                      <div className="task-item cancelled">
                        <div className="task-count">{volunteer.cancelled}</div>
                        <div className="task-label">ملغاة</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <p>لا توجد نتائج مطابقة للبحث</p>
                </div>
              )}
            </div>
            
            {/* زر استخراج الإحصائيات */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
              <ExportButton onClick={exportVolunteerStats} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VolunteerStatsButton;