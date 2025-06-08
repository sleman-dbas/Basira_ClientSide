import React, { useState, useRef, useEffect } from 'react';
import './VolunteerTasks.css';
import Navbar from '../../components/Navbar/Navbar';
import ImgButton from '../../components/ImgButton/ImgButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VolunteerTasks = () => {
  const [tasks, setTasks] = useState({
    uncompleted: [],
    completed: [],
    canceled: []
  });
  
  const [selectedTask, setSelectedTask] = useState(null);
  const [showUploadMessage, setShowUploadMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [volunteerId, setVolunteerId] = useState(null);
  const fileInputRef = useRef(null);

  // جلب جميع المهام من API
  const fetchAllTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
      
      if (!token) {
        throw new Error('لم يتم العثور على توكن المستخدم');
      }
      
      // فك تشفير التوكن لاستخراج volunteerId
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (!decodedToken || !decodedToken.id) {
        throw new Error('فشل في فك تشفير التوكن أو لم يتم العثور على معرف المتطوع');
      }
      
      const volunteerId = decodedToken.id;
      setVolunteerId(volunteerId);
      
      // جلب جميع أنواع المهام بشكل متوازي
      const [waitingRes, completedRes, canceledRes] = await Promise.all([
        fetch(`http://localhost:3000/api/volunteers/display-volunteer-waiting-files/${volunteerId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`http://localhost:3000/api/volunteers/display-volunteer-completed-files/${volunteerId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`http://localhost:3000/api/volunteers/display-volunteer-cansled-files/${volunteerId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      // التحقق من نجاح جميع الطلبات
      if (!waitingRes.ok) throw new Error('فشل في جلب المهام غير المنجزة');
      if (!completedRes.ok) throw new Error('فشل في جلب المهام المنجزة');
      if (!canceledRes.ok) throw new Error('فشل في جلب المهام الملغاة');
      
      // تحويل الردود إلى JSON
      const [waitingData, completedData, canceledData] = await Promise.all([
        waitingRes.json(),
        completedRes.json(),
        canceledRes.json()
      ]);
      
      // تحديث حالة المهام
      setTasks({
        uncompleted: waitingData.data.map(task => ({
          id: task._id,
          title: task.title,
          file: task.filePath
        })),
        completed: completedData.data.map(task => ({
          id: task._id,
          title: task.title,
          file: task.filePath
        })),
        canceled: canceledData.data.map(task => ({
          id: task._id,
          title: task.title,
          file: task.filePath
        }))
      });
      
    } catch (err) {
      setError(err.message);
      toast.error(`خطأ: ${err.message}`, { rtl: true });
    } finally {
      setIsLoading(false);
    }
  };

  // جلب المهام عند تحميل المكون
  useEffect(() => {
    fetchAllTasks();
  }, []);

  // نقل المهمة إلى القسم الملغى
  const cancelTask = async (taskId) => {
    try {
      const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
      
      const response = await fetch(`http://localhost:3000/api/volunteers/cancel-task/${taskId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ volunteerId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'فشل في إلغاء المهمة');
      }

      // إعادة جلب المهام بعد التحديث
      await fetchAllTasks();
      toast.success('تم إلغاء المهمة بنجاح', { rtl: true });
      
    } catch (error) {
      toast.error(`خطأ: ${error.message}`, { rtl: true });
    }
  };

  // نقل المهمة إلى القسم المنجز
  const completeTask = async (taskId) => {
    try {
      const task = tasks.uncompleted.find(t => t.id === taskId);
      if (!task) throw new Error('لم يتم العثور على المهمة');
      
      const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
      const formData = new FormData();
      
      // إضافة الملف إذا كان متاحاً
      if (task.file) {
        // في تطبيق حقيقي، هنا نضيف ملف الفعلي
        // formData.append('file', fileObject);
        formData.append('fileName', task.file);
      }
      
      const response = await fetch(`http://localhost:3000/api/volunteers/complete-task/${taskId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'فشل في إكمال المهمة');
      }

      // إعادة جلب المهام بعد التحديث
      await fetchAllTasks();
      toast.success('تم إكمال المهمة بنجاح', { rtl: true });
      
    } catch (error) {
      toast.error(`خطأ: ${error.message}`, { rtl: true });
    } finally {
      setShowUploadMessage(false);
    }
  };

  // محاولة إكمال المهمة
  const tryCompleteTask = (taskId) => {
    const task = tasks.uncompleted.find(t => t.id === taskId);
    
    if (!task.file) {
      setSelectedTask(taskId);
      setShowUploadMessage(true);
      
      setTimeout(() => {
        if (fileInputRef.current) {
          fileInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      
      return;
    }
    
    completeTask(taskId);
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

      {/* حالة التحميل */}
      {isLoading && (
        <div className="loading-indicator">
          <i className="fas fa-spinner fa-spin"></i>
          <span>جاري تحميل المهام...</span>
        </div>
      )}

      {/* رسالة خطأ */}
      {error && (
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          <span>{error}</span>
          <button onClick={() => setError(null)}>إخفاء</button>
        </div>
      )}

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
            
            {tasks.uncompleted.length === 0 && !isLoading && (
              <div className="no-tasks-message">
                <i className="fas fa-info-circle"></i>
                <span>لا توجد مهام غير مكتملة</span>
              </div>
            )}
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
                    <a 
                      href={`http://localhost:3000/uploads/${task.file}`} 
                      download
                      className="download-btn"
                    >
                      <i className="fas fa-download"></i> تنزيل
                    </a>
                  </div>
                )}
                <span className="status-badge">✅ مكتمل</span>
              </div>
            ))}
            
            {tasks.completed.length === 0 && !isLoading && (
              <div className="no-tasks-message">
                <i className="fas fa-info-circle"></i>
                <span>لا توجد مهام مكتملة بعد</span>
              </div>
            )}
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
            
            {tasks.canceled.length === 0 && !isLoading && (
              <div className="no-tasks-message">
                <i className="fas fa-info-circle"></i>
                <span>لا توجد مهام ملغاة</span>
              </div>
            )}
          </div>
        </section>
      </div>
                  <ImgButton />

    </div>
  );
};

export default VolunteerTasks;