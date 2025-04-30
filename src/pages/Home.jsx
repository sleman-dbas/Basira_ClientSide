import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
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
    <div role="main" aria-label="الصفحة الرئيسية لموقع بصيرة">
      {/* شريط التنقل */}
      <nav aria-label="القائمة الرئيسية" className="main-nav">
        <div className="nav-container">
          <img 
            src="/images/logo.png" 
            alt="شعار بصيرة - العودة للصفحة الرئيسية" 
            className="nav-logo"
            role="img"
          />
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
            <Link to="/courses" className="nav-link">الدورات التعليمية</Link>
            <Link to="/resources" className="nav-link">الموارد التعليمية</Link>
            <Link to="/contact" className="nav-link">الاتصال بنا</Link>
          </div>

          {/* أيقونة الحساب مع القائمة المنسدلة */}
          <div className="profile-menu-container" ref={profileMenuRef}>
            <button 
              className="profile-button"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              aria-haspopup="true"
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

      {/* المحتوى الرئيسي */}
      <section id="main-content" className="hero-section" aria-labelledby="hero-heading" tabIndex="-1">
        <div className="hero-content">
          <h1 id="hero-heading" className="hero-heading">
            مرحبًا بكم في <span className="highlight">بصيرة</span> 
            <span role="text" aria-label="منصة التعليم المخصصة للمكفوفين">منصة التعليم المخصصة للمكفوفين</span>
          </h1>
          <p className="hero-description">
            منصة تعليمية متكاملة مع أدوات تفاعلية مصممة خصيصًا لتلبية احتياجات المكفوفين وضعاف البصر
          </p>
          <div className="cta-buttons">
            <Link 
              to="/signup" 
              className="cta-button primary"
              role="button"
              aria-label="إنشاء حساب جديد للبدء في التعلم"
            >
              ابدأ الرحلة التعليمية
            </Link>
            <Link 
              to="/login" 
              className="cta-button secondary"
              role="button"
              aria-label="الدخول إلى الحساب"
            >
              الدخول إلى الحساب
            </Link>
          </div>
        </div>
      </section>

      {/* ميزات المنصة */}
      <section className="features" aria-labelledby="features-heading">
        <h2 id="features-heading" className="section-heading">مميزات منصتنا</h2>
        <div className="features-grid">
          <article className="feature-card" aria-labelledby="feature1">
            <div className="feature-icon" aria-hidden="true">🎧</div>
            <h3 id="feature1">مواد تعليمية مسموعة</h3>
            <p>محتوى صوتي عالي الجودة مع إمكانية التحكم في السرعة</p>
          </article>
          
          <article className="feature-card" aria-labelledby="feature2">
            <div className="feature-icon" aria-hidden="true">🔍</div>
            <h3 id="feature2">واجهة قابلة للتكبير</h3>
            <p>تكبير النصوص والعناصر بنسبة تصل إلى 300% دون إفساد التنسيق</p>
          </article>

          <article className="feature-card" aria-labelledby="feature3">
            <div className="feature-icon" aria-hidden="true">⌨️</div>
            <h3 id="feature3">تحكم كامل بلوحة المفاتيح</h3>
            <p>تصميم متوافق مع التنقل عن طريق الأزرار واختصارات لوحة المفاتيح</p>
          </article>
        </div>
      </section>

      {/* تذييل الصفحة */}
      <footer className="main-footer" role="contentinfo">
        <div className="footer-content">
          <p>© 2024 بصيرة. جميع الحقوق محفوظة</p>
          <nav aria-label="روابط تذييل الصفحة">
            <Link to="/privacy" className="footer-link">سياسة الخصوصية</Link>
            <Link to="/accessibility" className="footer-link">إرشادات الوصولية</Link>
            <Link to="/contact" className="footer-link">الدعم الفني</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Home;