import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
        <Link to="/" className="nav-logo-link">
          <img
            src="/images/logo.png"
            alt="شعار المنصة"
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
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }
            end
          >
            الرئيسية
          </NavLink>
          
          <NavLink 
            to="/volunteer-tasks"
            className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }
          >
            مهام المتطوعين
          </NavLink>
          
          <NavLink 
            to="/blind-interface"
            className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }
          >
            واجهة المكفوفين
          </NavLink>
        </div>

        <div className="profile-menu-container" ref={profileMenuRef}>
          <button
            className="profile-button"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            aria-label="إدارة الحساب"
          >
            <img
              src="/images/account.png"
              alt="حساب المستخدم"
              className="user-icon"
              role="img"
            />
          </button>

          <ul className={`profile-menu ${isProfileMenuOpen ? 'active' : ''}`}>
            <li>
              <Link to="/profile" className="menu-item">
                الملف الشخصي
              </Link>
            </li>
            <li>
              <Link to="/settings" className="menu-item">
                الإعدادات
              </Link>
            </li>
            <li>
              <button className="menu-item">
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