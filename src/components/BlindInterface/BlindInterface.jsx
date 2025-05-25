import React, { useState } from 'react';
import './BlindInterface.css';

const BlindInterface = () => {
  const [urgency, setUrgency] = useState('normal');
  const [uploadStatus, setUploadStatus] = useState('');
  const [convertedFiles, setConvertedFiles] = useState([
    { id: 1, name: 'محاضرة_الرياضيات_1.mp3', date: '2024-03-15' },
    { id: 2, name: 'محاضرة_الفيزياء_4.mp3', date: '2024-03-14' }
  ]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadStatus('جاري التحويل... سيتم إعلامك عند الانتهاء');
      setTimeout(() => {
        setConvertedFiles(prev => [...prev, {
          id: prev.length + 1,
          name: file.name.replace(/\.[^/.]+$/, ".mp3"),
          date: new Date().toISOString().split('T')[0]
        }]);
        setUploadStatus('✅ تم التحويل بنجاح');
      }, 3000);
    }
  };

  return (
    <div className="blind-interface" dir="rtl">
      {/* قسم رفع الملفات */}
      <div className="upload-box">
        <label htmlFor="file-upload" className="upload-label">
          انقر أو اسحب الملف هنا
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileUpload}
          className="visually-hidden"
        />
        <p>الأنواع المسموحة: PDF, DOCX (الحجم الأقصى 50MB)</p>
      </div>

      {/* اختيار الأولوية */}
      <div className="priority-group">
        <legend>أولوية التحويل:</legend>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="urgency"
              value="normal"
              checked={urgency === 'normal'}
              onChange={(e) => setUrgency(e.target.value)}
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
            />
            مستعجل (4-6 ساعات)
          </label>
        </div>
      </div>

      {/* حالة الرفع */}
      {uploadStatus && <div className="upload-status">{uploadStatus}</div>}

      {/* قائمة الملفات المحولة */}
      <section>
        <h2>الملفات المحولة سابقاً</h2>
        <ul className="converted-files-list">
          {convertedFiles.map(file => (
            <li key={file.id} className="file-item">
              <div>
                <span>{file.name}</span>
                <time>تاريخ التحويل: {file.date}</time>
              </div>
              <a href={`/downloads/${file.name}`} download className="download-link">
                ⬇️ تحميل
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default BlindInterface;