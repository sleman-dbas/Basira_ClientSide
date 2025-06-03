import React, { useState, useRef } from 'react';
import './BlindInterface.css';

const BlindInterface = () => {
  const [urgency, setUrgency] = useState('normal');
  const [uploadStatus, setUploadStatus] = useState('');
  const [convertedFiles, setConvertedFiles] = useState([
    { id: 1, name: 'محاضرة_الرياضيات_1.mp3', date: '2024-03-15' },
    { id: 2, name: 'محاضرة_الفيزياء_4.mp3', date: '2024-03-14' }
  ]);
  const [fileTitle, setFileTitle] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);
  const statusRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    
    // التحقق من وجود عنوان ووصف للملف
    if (!fileTitle.trim() || !fileDescription.trim()) {
      setFileError('يجب إدخال عنوان ووصف للملف قبل الرفع');
      return;
    }
    
    if (file) {
      setFileError('');
      setUploadStatus('جاري التحويل... سيتم إعلامك عند الانتهاء');
      
      // تحديث منطقة aria-live
      if (statusRef.current) {
        statusRef.current.textContent = 'جاري التحويل... سيتم إعلامك عند الانتهاء';
      }
      
      setTimeout(() => {
        const newFile = {
          id: convertedFiles.length + 1,
          name: fileTitle || file.name.replace(/\.[^/.]+$/, ".mp3"),
          date: new Date().toISOString().split('T')[0],
          description: fileDescription
        };
        
        setConvertedFiles(prev => [...prev, newFile]);
        setUploadStatus('✅ تم التحويل بنجاح');
        setFileTitle('');
        setFileDescription('');
        
        // تحديث منطقة aria-live
        if (statusRef.current) {
          statusRef.current.textContent = 'تم التحويل بنجاح';
        }
      }, 3000);
    }
  };

  return (
    <div className="blind-interface" dir="rtl">
      {/* منطقة aria-live للإشعارات الديناميكية */}
      <div 
        ref={statusRef}
        aria-live="assertive" 
        aria-atomic="true"
        className="visually-hidden"
      />
         {/* اختيار الأولوية */}
      <div className="priority-group">
        <legend>أولوية التحويل:</legend>
        <div className="radio-group" role="radiogroup">
          <label>
            <input
              type="radio"
              name="urgency"
              value="normal"
              checked={urgency === 'normal'}
              onChange={(e) => setUrgency(e.target.value)}
              aria-checked={urgency === 'normal'}
              role="radio"
            />
            عادي (24-48 ساعة)
          </label>
          <label>
            <input
              type="radio"
              name="urgency"
              value="urgent"
              checked={urgency === 'urgent'}
              onChange={(e) => setUrgency(e.target.value)}
              aria-checked={urgency === 'urgent'}
              role="radio"
            />
            مستعجل (4-6 ساعات)
          </label>
        </div>
      </div>

      {/* قسم رفع الملفات */}
      <div className="upload-box">
        <label 
          htmlFor="file-upload" 
          className="upload-label"
          aria-label="انقر أو اسحب لرفع ملف (PDF أو DOCX)"
        >
          انقر أو اسحب الملف هنا
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileUpload}
          className="visually-hidden"
          ref={fileInputRef}
        />
        <p>الأنواع المسموحة: PDF, DOCX (الحجم الأقصى 50MB)</p>
        
        {/* حقول إجبارية للعنوان والوصف */}
        <div className="file-meta">
          <label htmlFor="file-title">عنوان الملف (مطلوب):</label>
          <input
            id="file-title"
            type="text"
            value={fileTitle}
            onChange={(e) => setFileTitle(e.target.value)}
            required
            aria-required="true"
          />
          
          <label htmlFor="file-desc">وصف الملف (مطلوب):</label>
          <textarea
            id="file-desc"
            value={fileDescription}
            onChange={(e) => setFileDescription(e.target.value)}
            required
            aria-required="true"
            placeholder="أدخل وصفًا للمساعدة في التعرف على محتوى الملف..."
          />
        </div>
        
        {fileError && (
          <div className="file-error" role="alert">
            {fileError}
          </div>
        )}
      </div>

   
      {/* حالة الرفع */}
      {uploadStatus && (
        <div 
          className="upload-status" 
          role="status"
          aria-live="polite"
        >
          {uploadStatus}
        </div>
      )}

      {/* قائمة الملفات المحولة */}
      <section aria-labelledby="converted-files-heading">
        <h2 id="converted-files-heading">الملفات المحولة سابقاً</h2>
        <ul className="converted-files-list" role="list">
          {convertedFiles.map(file => (
            <li key={file.id} className="file-item" role="listitem">
              <div>
                <h3>{file.name}</h3>
                {file.description && (
                  <p className="file-description">الوصف: {file.description}</p>
                )}
                <time>تاريخ التحويل: {file.date}</time>
              </div>
              <a 
                href={`/downloads/${file.name}`} 
                download 
                className="download-link"
                aria-label={`تحميل الملف ${file.name}`}
              >
                تحميل الملف
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default BlindInterface;