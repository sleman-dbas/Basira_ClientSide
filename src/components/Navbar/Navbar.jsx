// src/components/Navbar/Navbar.jsx
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav aria-label="القائمة الرئيسية" className="main-nav">
      <div className="nav-container">
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="شعار بصيرة - العودة للصفحة الرئيسية"
            className="nav-logo"
            role="img"
          />
        </Link>

        <button
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="فتح القائمة"
        >
          ☰
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" aria-current="page">الرئيسية</Link>
          <Link to="/contact" className="nav-link">الاتصال بنا</Link>
          <Link to="/volunteer-tasks" className="nav-link">مهام المتطوعين</Link>
          <Link to="/blind-interface" className="nav-link">واجهة المكفوفين</Link>
          <Link to="/coordinator-dashboard" className="nav-link">لوحة التحكم</Link>

        </div>

        <div className="profile-menu-container" ref={profileMenuRef}>
          <button
            className="profile-button"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            aria-controls="profile-menu"
            aria-expanded={isProfileMenuOpen}
            aria-label="إدارة الحساب"
          >
            <img
              src="/images/account.png"
              alt="حساب المستخدم"
              className="user-icon"
              role="img"
            />
          </button>

          <ul
            id="profile-menu"
            className={`profile-menu ${isProfileMenuOpen ? 'active' : ''}`}
            role="menu"
            aria-labelledby="profile-button"
          >
            <li role="none">
              <Link
                to="/profile"
                className="menu-item"
                role="menuitem"
                tabIndex={isProfileMenuOpen ? 0 : -1}
              >
                الملف الشخصي
              </Link>
            </li>
            <li role="none">
              <Link
                to="/settings"
                className="menu-item"
                role="menuitem"
                tabIndex={isProfileMenuOpen ? 0 : -1}
              >
                الإعدادات
              </Link>
            </li>
            <li role="none">
              <button
                className="menu-item"
                role="menuitem"
                tabIndex={isProfileMenuOpen ? 0 : -1}
                aria-label="تسجيل الخروج"
              >
                تسجيل الخروج
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;