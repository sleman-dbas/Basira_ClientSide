import React, { useState } from 'react';
import './VolunteerTasks.css';
import Navbar from '../../components/Navbar/Navbar';

const VolunteerTasks = () => {
  const [tasks] = useState({
    uncompleted: [
      { id: 1, title: 'تحويل محاضرة الفيزياء إلى ملف صوتي', progress: 60 },
      { id: 2, title: 'مراجعة ملاحظات الطلاب', progress: 30 }
    ],
    completed: [
      { id: 3, title: 'تحويل كتاب الكيمياء', progress: 100 }
    ],
    canceled: [
      { id: 4, title: 'تسجيل محاضرة الرياضيات', progress: 0 }
    ]
  });

  return (
    
    <div className="volunteer-tasks-container" dir="rtl">
      
      {/* الأقسام الثلاثة الرئيسية */}
      <div className="tasks-grid">
        {/* المهام غير المنجزة */}
        <section className="tasks-section uncompleted-tasks">
          <h2 className="section-title">المهام غير المنجزة ({tasks.uncompleted.length})</h2>
          <div className="tasks-list scrollable">
            {tasks.uncompleted.map(task => (
              <div key={task.id} className="task-item">
                <h3>{task.title}</h3>
                <div className="progress-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
                <span className="progress-text">{task.progress}% اكتمال</span>
              </div>
            ))}
          </div>
        </section>

        {/* المهام المنجزة */}
        <section className="tasks-section completed-tasks">
          <h2 className="section-title">المهام المنجزة ({tasks.completed.length})</h2>
          <div className="tasks-list scrollable">
            {tasks.completed.map(task => (
              <div key={task.id} className="task-item completed">
                <h3>{task.title}</h3>
                <span className="status-badge">✅ مكتمل</span>
              </div>
            ))}
          </div>
        </section>

        {/* المهام الملغاة */}
        <section className="tasks-section canceled-tasks">
          <h2 className="section-title">المهام الملغاة ({tasks.canceled.length})</h2>
          <div className="tasks-list scrollable">
            {tasks.canceled.map(task => (
              <div key={task.id} className="task-item canceled">
                <h3>{task.title}</h3>
                <span className="status-badge">❌ ملغاة</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* قسم رفع الملفات */}
      <section className="upload-section">
        <h2 className="section-title">رفع الملفات الصوتية المنجزة</h2>
        <div className="upload-box">
          <input 
            type="file" 
            accept=".mp3,.wav" 
            className="file-input" 
          />
          <button className="upload-button">رفع الملف الآن</button>
        </div>
      </section>
    </div>
  );
};

export default VolunteerTasks;