// src/components/ImgButton/ImgButton.jsx
import React, { useState } from 'react';
import './ImgButton.css';

const ImgButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Sample image URLs
  const images = [
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  ];

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`img-button ${isOpen ? 'active' : ''}`} onClick={toggleModal}>
        <div className="img-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="img-modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setIsOpen(false)}>
              &times;
            </button>
            <div className="image-header">
              <h2>معرض الصور</h2>
              <p>أحدث الصور المضافة</p>
            </div>
            
            <div className="image-container">
              {images.map((img, index) => (
                <div key={index} className="image-item">
                  <img src={img} alt={`Nature ${index + 1}`} />
                  <div className="image-caption">صورة طبيعة {index + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImgButton;