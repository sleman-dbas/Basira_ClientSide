import React, { useState, useRef } from 'react';
import './VolunteerTasks.css';
import Navbar from '../../components/Navbar/Navbar';

const VolunteerTasks = () => {
  const [tasks, setTasks] = useState({
    uncompleted: [
      { id: 1, title: 'تحويل محاضرة الفيزياء إلى ملف صوتي', file: null },
      { id: 2, title: 'مراجعة ملاحظات الطلاب', file: null },
      { id: 5, title: 'تسجيل محاضرة الأحياء', file: null },
      { id: 6, title: 'ترجمة الفيديو التعليمي', file: null }
    ],
    completed: [
      { id: 3, title: 'تحويل كتاب الكيمياء', file: 'chemistry.mp3' },
      { id: 7, title: 'تسجيل محاضرة الجبر', file: 'algebra.mp3' },
      { id: 8, title: 'مراجعة تمارين التفاضل', file: 'calculus.mp3' }
    ],
    canceled: [
      { id: 4, title: 'تسجيل محاضرة الرياضيات', file: null },
      { id: 9, title: 'تحويل كتاب التاريخ', file: null }
    ]
  });
  
  const [selectedTask, setSelectedTask] = useState(null);
  const [showUploadMessage, setShowUploadMessage] = useState(false);
  const fileInputRef = useRef(null);

  // نقل المهمة إلى القسم الملغى
  const cancelTask = (taskId) => {
    setTasks(prev => {
      const taskToCancel = prev.uncompleted.find(task => task.id === taskId);
      if (!taskToCancel) return prev;

      return {
        ...prev,
        uncompleted: prev.uncompleted.filter(task => task.id !== taskId),
        canceled: [...prev.canceled, taskToCancel]
      };
    });
  };

  // محاولة إكمال المهمة
  const tryCompleteTask = (taskId) => {
    const task = tasks.uncompleted.find(t => t.id === taskId);
    
    if (!task.file) {
      // إذا لم يتم رفع ملف، قم بتحديد المهمة وعرض رسالة
      setSelectedTask(taskId);
      setShowUploadMessage(true);
      
      // ركز على حقل الرفع
      setTimeout(() => {
        if (fileInputRef.current) {
          fileInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      
      return;
    }
    
    // إذا كان الملف مرفوعًا، انقل المهمة إلى المكتملة
    completeTask(taskId);
  };

  // نقل المهمة إلى القسم المنجز
  const completeTask = (taskId) => {
    setTasks(prev => {
      const taskToComplete = prev.uncompleted.find(task => task.id === taskId);
      if (!taskToComplete) return prev;

      return {
        ...prev,
        uncompleted: prev.uncompleted.filter(task => task.id !== taskId),
        completed: [...prev.completed, taskToComplete]
      };
    });
    
    setShowUploadMessage(false);
  };

  // رفع ملف للمهمة
  const handleFileUpload = (e, taskId) => {
    const file = e.target.files[0];
    if (!file) return;

    setTasks(prev => ({
      ...prev,
      uncompleted: prev.uncompleted.map(task => 
        task.id === taskId ? { ...task, file: file.name } : task
      )
    }));

    // إذا كانت هذه المهمة المحددة، قم بإخفاء الرسالة
    if (selectedTask === taskId) {
      setShowUploadMessage(false);
    }
  };

  return (
    <div className="volunteer-tasks-container" dir="rtl">
      <Navbar />
      
      <div className="tasks-header">
        <h1>لوحة مهام المتطوعين</h1>
        <p>تابع تقدمك في المهام الموكلة إليك وارفع الملفات المكتملة من خلال هذه اللوحة</p>
      </div>

      {/* رسالة تذكير برفع الملف */}
      {showUploadMessage && (
        <div className="upload-message">
          <i className="fas fa-exclamation-circle"></i>
          <span>يرجى رفع الملف الصوتي أولاً قبل إكمال المهمة</span>
          <button 
            className="close-message"
            onClick={() => setShowUploadMessage(false)}
          >
            &times;
          </button>
        </div>
      )}

      <div className="tasks-grid">
        {/* المهام غير المنجزة */}
        <section className="tasks-section uncompleted-tasks">
          <h2 className="section-title">
            <i className="fas fa-tasks"></i>
            المهام غير المنجزة ({tasks.uncompleted.length})
          </h2>
          <div className="tasks-list">
            {tasks.uncompleted.map(task => (
              <div key={task.id} className="task-item">
                <h3>{task.title}</h3>
                
                {/* حالة الملف المرفوع */}
                <div className="file-status">
                  {task.file ? (
                    <>
                      <i className="fas fa-file-audio"></i>
                      <span>{task.file}</span>
                    </>
                  ) : (
                    <span className="no-file">لم يتم رفع الملف بعد</span>
                  )}
                </div>
                
                {/* زر رفع ملف */}
                <div className="file-upload-container">
                  <input 
                    type="file" 
                    accept=".mp3,.wav" 
                    id={`file-upload-${task.id}`} 
                    onChange={(e) => handleFileUpload(e, task.id)} 
                    ref={selectedTask === task.id ? fileInputRef : null}
                    className="file-input"
                  />
                  <label 
                    htmlFor={`file-upload-${task.id}`} 
                    className="file-upload-btn"
                  >
                    <i className="fas fa-upload"></i> رفع ملف
                  </label>
                </div>
                
                {/* أزرار الإجراءات */}
                <div className="task-actions">
                  <button 
                    className="complete-btn"
                    onClick={() => tryCompleteTask(task.id)}
                  >
                    <i className="fas fa-check"></i> تم الإنجاز
                  </button>
                  <button 
                    className="cancel-btn"
                    onClick={() => cancelTask(task.id)}
                  >
                    <i className="fas fa-times"></i> إلغاء
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* المهام المنجزة */}
        <section className="tasks-section completed-tasks">
          <h2 className="section-title">
            <i className="fas fa-check-circle"></i>
            المهام المنجزة ({tasks.completed.length})
          </h2>
          <div className="tasks-list">
            {tasks.completed.map(task => (
              <div key={task.id} className="task-item completed">
                <h3>{task.title}</h3>
                {task.file && (
                  <div className="file-info">
                    <i className="fas fa-file-audio"></i>
                    <span>{task.file}</span>
                  </div>
                )}
                <span className="status-badge">✅ مكتمل</span>
              </div>
            ))}
          </div>
        </section>

        {/* المهام الملغاة */}
        <section className="tasks-section canceled-tasks">
          <h2 className="section-title">
            <i className="fas fa-times-circle"></i>
            المهام الملغاة ({tasks.canceled.length})
          </h2>
          <div className="tasks-list">
            {tasks.canceled.map(task => (
              <div key={task.id} className="task-item canceled">
                <h3>{task.title}</h3>
                <span className="status-badge">❌ ملغاة</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default VolunteerTasks;