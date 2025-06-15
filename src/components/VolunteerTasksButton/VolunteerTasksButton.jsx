import React, { useState } from 'react';
import './VolunteerTasksButton.css';
import { FaTasks, FaTimes } from 'react-icons/fa';
import ExportButton from '../ExportButton/ExportButton';

const VolunteerTasksButton = ({ tasks }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleStats = () => {
    setIsOpen(!isOpen);
  };

  // دالة لاستخراج إحصائيات المهام
  const exportTasksStats = () => {
    // هنا يمكن إضافة منطق تصدير البيانات (CSV, PDF, etc.)
    alert('تم استخراج إحصائيات المهام بنجاح!');
  };

  return (
    <>
      <div 
        className={`volunteer-tasks-button ${isOpen ? 'active' : ''}`} 
        onClick={toggleStats}
      >
        <div className="volunteer-tasks-icon">
          <FaTasks />
        </div>
      </div>

      {isOpen && (
        <div className="volunteer-tasks-modal">
          <div className="volunteer-tasks-modal-content">
            <button 
              className="volunteer-tasks-close-button" 
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>
            
            <div className="volunteer-tasks-header">
              <h2>إحصائيات مهامي</h2>
              <p>آخر تحديث: الآن</p>
            </div>
            
            <div className="tasks-stats-container">
              {/* المهام غير المنجزة */}
              <div className="task-stat">
                <div className="stat-header">
                  <div className="stat-value">{tasks.uncompleted.length}</div>
                  <div className="stat-label">مهام غير منجزة</div>
                </div>
                <div className="stat-details">
                  {tasks.uncompleted.length > 0 ? (
                    tasks.uncompleted.map(task => (
                      <div key={task.id} className="task-detail">
                        <span className="task-title">{task.title}</span>
                        <span className={`task-status ${task.file ? 'file-uploaded' : 'no-file'}`}>
                          {task.file ? 'ملف مرفوع' : 'بلا ملف'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="no-tasks">لا توجد مهام غير منجزة</div>
                  )}
                </div>
              </div>
              
              {/* المهام المنجزة */}
              <div className="task-stat">
                <div className="stat-header">
                  <div className="stat-value">{tasks.completed.length}</div>
                  <div className="stat-label">مهام منجزة</div>
                </div>
                <div className="stat-details">
                  {tasks.completed.length > 0 ? (
                    tasks.completed.map(task => (
                      <div key={task.id} className="task-detail">
                        <span className="task-title">{task.title}</span>
                        <span className="task-status file-uploaded">
                          {task.file || 'تم الإنجاز'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="no-tasks">لا توجد مهام منجزة</div>
                  )}
                </div>
              </div>
              
              {/* المهام الملغاة */}
              <div className="task-stat">
                <div className="stat-header">
                  <div className="stat-value">{tasks.canceled.length}</div>
                  <div className="stat-label">مهام ملغاة</div>
                </div>
                <div className="stat-details">
                  {tasks.canceled.length > 0 ? (
                    tasks.canceled.map(task => (
                      <div key={task.id} className="task-detail">
                        <span className="task-title">{task.title}</span>
                        <span className="task-status canceled">
                          ملغاة
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="no-tasks">لا توجد مهام ملغاة</div>
                  )}
                </div>
              </div>
            </div>
            
            {/* زر استخراج الإحصائيات */}
            <div className="export-container">
              <ExportButton onClick={exportTasksStats} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VolunteerTasksButton;