import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import '../styles/CoordinatorDashboard.css';
import VolunteerStatsButton from '../components/VolunteerStatsButton/VolunteerStatsButton';
const CoordinatorDashboard = () => {
  // الحالات الحالية
  const [volunteers, setVolunteers] = useState([
    { id: 1, name: 'أحمد محمد', status: 'نشط', email: 'ahmed@example.com', joined: '2024-01-15' },
    { id: 2, name: 'سارة علي', status: 'غير نشط', email: 'sara@example.com', joined: '2023-11-20' },
    { id: 3, name: 'خالد حسن', status: 'نشط', email: 'khaled@example.com', joined: '2024-02-10' },
    { id: 4, name: 'لمى عبد الله', status: 'نشط', email: 'lama@example.com', joined: '2024-03-05' },
    { id: 5, name: 'ياسر عمر', status: 'غير نشط', email: 'yasser@example.com', joined: '2023-10-12' },
  ]);

  const [urgentFiles, setUrgentFiles] = useState([
    { id: 1, name: 'ملاحظات_الفيزياء_الفصل_الثاني.pdf', size: '1.2 MB', date: '2024-05-20' },
    { id: 2, name: 'تمارين_الرياضيات_المراجعة.pdf', size: '0.8 MB', date: '2024-05-19' },
    { id: 3, name: 'ملخص_مادة_الاحياء_للاختبار.pdf', size: '1.5 MB', date: '2024-05-18' },
  ]);

  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [file, setFile] = useState(null);
  const [notification, setNotification] = useState('');
  const [aiFiles, setAiFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // الحالات الجديدة لإدارة معرض الصور
  const [galleryImages, setGalleryImages] = useState([
    {
      id: 1,
      imageUrl: "/images/event1.jpg",
      description: "طلاب مكفوفين يستمعون إلى محاضرة صوتية في قاعة دراسية مجهزة بأحدث التقنيات المساعدة"
    },
    {
      id: 2,
      imageUrl: "/images/event2.jpg",
      description: "متطوع يشرح مادة دراسية لطالب مكفوف باستخدام أجهزة مساعدة في مركز بصيرة التعليمي"
    },
    {
      id: 3,
      imageUrl: "/images/event3.jpg",
      description: "ورشة عمل للمكفوفين لتعليم استخدام التقنيات المساعدة في التعلم الذاتي"
    }
  ]);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [currentGalleryImage, setCurrentGalleryImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageDescription, setImageDescription] = useState('');

  // الدوال الحالية (التي كانت موجودة سابقاً)
  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('الرجاء اختيار ملف PDF فقط');
    }
  };

  const handleSendFile = () => {
    if (file && selectedVolunteer) {
      setNotification(`تم إرسال الملف ${file.name} بنجاح إلى ${selectedVolunteer.name}`);
      setTimeout(() => setNotification(''), 3000);
      setShowModal(false);
      setFile(null);
    } else {
      alert('الرجاء اختيار ملف أولاً');
    }
  };

  const filteredVolunteers = volunteers.filter(volunteer => 
    volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    volunteer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStatus = (id) => {
    setVolunteers(volunteers.map(volunteer => 
      volunteer.id === id 
        ? { ...volunteer, status: volunteer.status === 'نشط' ? 'غير نشط' : 'نشط' } 
        : volunteer
    ));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      const newFile = {
        id: Date.now(),
        name: droppedFile.name,
        size: (droppedFile.size / 1024 / 1024).toFixed(1) + ' MB'
      };
      setAiFiles([...aiFiles, newFile]);
      setNotification(`تم تحميل الملف ${droppedFile.name} للمعالجة بالذكاء الاصطناعي`);
      setTimeout(() => setNotification(''), 3000);
    } else {
      alert('الرجاء سحب ملف PDF فقط');
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      const newFile = {
        id: Date.now(),
        name: selectedFile.name,
        size: (selectedFile.size / 1024 / 1024).toFixed(1) + ' MB'
      };
      setAiFiles([...aiFiles, newFile]);
      setNotification(`تم تحميل الملف ${selectedFile.name} للمعالجة بالذكاء الاصطناعي`);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const processFiles = () => {
    if (aiFiles.length === 0) {
      alert('لا توجد ملفات لمعالجتها');
      return;
    }
    
    setNotification(`جاري معالجة ${aiFiles.length} ملف(ات) بالذكاء الاصطناعي...`);
    setTimeout(() => {
      setNotification(`تمت معالجة ${aiFiles.length} ملف(ات) بنجاح!`);
      setAiFiles([]);
    }, 3000);
  };

  // الدوال الجديدة لإدارة معرض الصور
  const openAddImageModal = () => {
    setCurrentGalleryImage(null);
    setImageFile(null);
    setImageDescription('');
    setShowGalleryModal(true);
  };

  const openEditImageModal = (image) => {
    setCurrentGalleryImage(image);
    setImageFile(null);
    setImageDescription(image.description);
    setShowGalleryModal(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
    } else {
      alert('الرجاء اختيار ملف صورة (JPEG, PNG, إلخ)');
    }
  };

  const saveImage = () => {
    if (!imageDescription.trim()) {
      alert('الرجاء إدخال وصف للصورة');
      return;
    }

    if (currentGalleryImage) {
      // تحديث الصورة الحالية
      setGalleryImages(galleryImages.map(image => 
        image.id === currentGalleryImage.id ? { ...image, description: imageDescription } : image
      ));
    } else {
      // إضافة صورة جديدة
      const newImage = {
        id: Date.now(),
        imageUrl: imageFile ? URL.createObjectURL(imageFile) : '',
        description: imageDescription
      };
      setGalleryImages([...galleryImages, newImage]);
    }

    setShowGalleryModal(false);
  };

  const deleteImage = (id) => {
    setGalleryImages(galleryImages.filter(image => image.id !== id));
  };

  return (
    
    <div className="coordinator-dashboard" role="main" aria-label="لوحة تحكم المنسق">
      <Navbar />
      
      <div className="dashboard-container">
        <h1 className="dashboard-title">لوحة تحكم المنسق</h1>
        
        
        
        <div className="dashboard-layout">
          {/* قسم الملفات المستعجلة على اليمين */}
          <div className="urgent-files-section">
            <h2 className="section-title">الملفات المستعجلة</h2>
            <div className="files-container">
              {urgentFiles.map(file => (
                <div key={file.id} className="file-card">
                  <div className="file-icon">📄</div>
                  <div className="file-info">
                    <h3 className="file-name">{file.name}</h3>
                    <div className="file-details">
                      <span className="file-size">{file.size}</span>
                      <span className="file-date">{file.date}</span>
                    </div>
                  </div>
                  <button 
                    className="drag-icon"
                    draggable="true"
                    onDragStart={(e) => e.dataTransfer.setData("text/plain", file.name)}
                    aria-label={`سحب ملف ${file.name}`}
                  >
                    ↥
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* قسم معالجة الذكاء الاصطناعي على اليسار */}
          <div className="ai-processing-section">
            <h2 className="section-title">معالجة الملفات بالذكاء الاصطناعي</h2>
            <div 
              className={`drop-zone ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="drop-content">
                <div className="upload-icon">📤</div>
                <p>اسحب الملفات المستعجلة هنا لمعالجتها</p>
                <p>أو</p>
                <label htmlFor="file-select" className="file-select-label">
                  اختر ملف PDF
                </label>
                <input
                  id="file-select"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="file-input"
                  aria-label="اختر ملف PDF للمعالجة"
                />
              </div>
            </div>
            
            <div className="files-to-process">
              <h3>الملفات المحددة للمعالجة</h3>
              {aiFiles.length > 0 ? (
                <ul className="files-list">
                  {aiFiles.map(file => (
                    <li key={file.id} className="file-item">
                      <span className="file-icon">📄</span>
                      <span className="file-name">{file.name}</span>
                      <span className="file-size">{file.size}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-files">لا توجد ملفات محددة للمعالجة</p>
              )}
              
              <button 
                onClick={processFiles}
                className="process-btn"
                disabled={aiFiles.length === 0}
              >
                بدء المعالجة بالذكاء الاصطناعي
              </button>
            </div>
          </div>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="ابحث عن متطوع..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="بحث عن متطوعين"
          />
        </div>
        <div className="table-container">
          <table className="volunteers-table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>البريد الإلكتروني</th>
                <th>تاريخ الانضمام</th>
                <th>الحالة</th>
                <th>رفع ملف PDF</th>
              </tr>
            </thead>
            <tbody>
              {filteredVolunteers.map(volunteer => (
                <tr 
                  key={volunteer.id} 
                  className={volunteer.status === 'غير نشط' ? 'inactive' : ''}
                >
                  <td>{volunteer.name}</td>
                  <td>{volunteer.email}</td>
                  <td>{volunteer.joined}</td>
                  <td>
                    <div className="status-container">
                      <span className={`status-badge ${volunteer.status === 'نشط' ? 'active' : 'inactive'}`}>
                        {volunteer.status}
                      </span>
                      <button 
                        onClick={() => toggleStatus(volunteer.id)}
                        className="toggle-status-btn"
                        aria-label={`تغيير حالة ${volunteer.name}`}
                      >
                        {volunteer.status === 'نشط' ? 'تعطيل' : 'تفعيل'}
                      </button>
                    </div>
                  </td>
                  <td>
                    <button 
                      onClick={() => {
                        setSelectedVolunteer(volunteer);
                        setShowModal(true);
                      }}
                      className="upload-btn"
                      aria-label={`رفع ملف PDF لـ ${volunteer.name}`}
                    >
                      رفع ملف PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* قسم إدارة معرض الصور الجديد */}
        <div className="gallery-management-section">
          <div className="section-header">
            <h2 className="section-title">إدارة معرض الصور</h2>
            <button onClick={openAddImageModal} className="add-image-btn">
              إضافة صورة جديدة
            </button>
          </div>
          
          <div className="gallery-images">
            {galleryImages.map(image => (
              <div key={image.id} className="image-card">
                <img 
                  src={image.imageUrl} 
                  alt={image.description} 
                  className="gallery-thumbnail"
                  aria-describedby={`image-desc-${image.id}`}
                />
                <div className="image-details">
                  <p id={`image-desc-${image.id}`} className="image-description">
                    {image.description}
                  </p>
                  <div className="image-actions">
                    <button onClick={() => openEditImageModal(image)} className="edit-btn">
                      تعديل الوصف
                    </button>
                    <button onClick={() => deleteImage(image.id)} className="delete-btn">
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {showModal && selectedVolunteer && (
        <div className="modal" role="dialog" aria-labelledby="modal-title">
          <div className="modal-content">
            <div className="modal-header">
              <h2 id="modal-title">إرسال ملف PDF إلى {selectedVolunteer.name}</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="close-btn"
                aria-label="إغلاق النافذة"
              >
                &times;
              </button>
            </div>
            
            <div className="modal-body">
              <div className="file-upload-container">
                <label htmlFor="file-upload" className="file-upload-label">
                  اختر ملف PDF
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="file-input"
                  aria-label="اختر ملف PDF"
                />
                {file && (
                  <div className="file-preview">
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">{(file.size / 1024).toFixed(1)} كيلوبايت</span>
                  </div>
                )}
              </div>
              
              <div className="modal-actions">
                <button 
                  onClick={handleSendFile}
                  className="send-btn"
                  disabled={!file}
                  aria-label="إرسال الملف"
                >
                  إرسال
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="cancel-btn"
                  aria-label="إلغاء الإرسال"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* نافذة رفع/تعديل الصورة */}
      {showGalleryModal && (
        <div className="modal" role="dialog" aria-labelledby="gallery-modal-title">
          <div className="modal-content">
            <div className="modal-header">
              <h2 id="gallery-modal-title">
                {currentGalleryImage ? 'تعديل وصف الصورة' : 'إضافة صورة جديدة'}
              </h2>
              <button 
                onClick={() => setShowGalleryModal(false)}
                className="close-btn"
                aria-label="إغلاق النافذة"
              >
                &times;
              </button>
            </div>
            
            <div className="modal-body">
              {!currentGalleryImage && (
                <div className="file-upload-container">
                  <label htmlFor="image-upload" className="file-upload-label">
                    اختر صورة
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                    aria-label="اختر ملف صورة"
                  />
                  {imageFile && (
                    <div className="file-preview">
                      <span className="file-name">{imageFile.name}</span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="image-description">وصف الصورة (مطلوب للمكفوفين)</label>
                <textarea
                  id="image-description"
                  value={imageDescription}
                  onChange={(e) => setImageDescription(e.target.value)}
                  rows="4"
                  placeholder="أدخل وصفًا دقيقًا للصورة لمساعدة المكفوفين على فهم المحتوى..."
                ></textarea>
              </div>
              
              <div className="modal-actions">
                <button 
                  onClick={saveImage}
                  className="save-btn"
                  disabled={!imageDescription.trim()}
                  aria-label="حفظ الصورة"
                >
                  حفظ
                </button>
                <button 
                  onClick={() => setShowGalleryModal(false)}
                  className="cancel-btn"
                  aria-label="إلغاء"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {notification && (
        <div className="notification" role="alert">
          {notification}
        </div>
      )}
      <VolunteerStatsButton />

    </div>
  );
};

export default CoordinatorDashboard;