import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [educationType, setEducationType] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'الاسم الكامل مطلوب';
    if (!age || age < 15) newErrors.age = 'العمر يجب أن يكون 15 سنة على الأقل';
    if (!gender) newErrors.gender = 'الرجاء اختيار الجنس';
    if (!educationType) newErrors.educationType = 'يرجى اختيار نوع الدراسة';
    if (!academicYear) newErrors.academicYear = 'يرجى تحديد السنة الدراسية';
    if (password.length < 6) newErrors.password = 'كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate('/dashboard');
    }
  };

  return (
    <main role="main" className="signup-container">



      <div className="signup-box">


        <h1 className="signup-title">إنشاء حساب جديد لبصيرة</h1>

        <form onSubmit={handleSubmit} id="signup-form" noValidate>
          {/* حقل الاسم الكامل */}
          <div className="input-group">
            <label htmlFor="fullName">الاسم الكامل</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="الاسم الثلاثي"
              aria-describedby="name-error"
              className={errors.fullName ? 'error' : ''}
              required
            />
            {errors.fullName && (
              <p id="name-error" className="error-message" role="alert" aria-live="assertive">
                ⚠️ {errors.fullName}
              </p>
            )}
          </div>

          {/* حقل العمر */}
          <div className="input-group">
            <label htmlFor="age">العمر</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="أدخل عمرك"
              min="15"
              aria-describedby="age-error"
              className={errors.age ? 'error' : ''}
              required
            />
            {errors.age && (
              <p id="age-error" className="error-message" role="alert" aria-live="assertive">
                ⚠️ {errors.age}
              </p>
            )}
          </div>
          {/* حقل الجنس */}
          <div className="input-group">
            <label htmlFor="gender">الجنس</label>
            <select class="custom-select"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={errors.gender ? 'error' : ''}
              aria-describedby="gender-error"
              required
            >
              <option value="">اختر الجنس</option>
              <option value="بشري">ذكر</option>
              <option value="اسنان">انثى</option>

            </select>
            {errors.gender && (
              <p id="gender-error" className="error-message" role="alert" aria-live="assertive">
                ⚠️ {errors.gender}
              </p>
            )}
          </div>


          {/* حقل نوع الدراسة */}
          <div className="input-group">
            <label htmlFor="educationType">نوع الدراسة</label>
            <select class="custom-select"
              id="educationType"
              value={educationType}
              onChange={(e) => setEducationType(e.target.value)}
              className={errors.educationType ? 'error' : ''}
              aria-describedby="education-error"
              required
            >
              <option value="">اختر نوع الدراسة</option>
              <option value="بشري">طب بشري</option>
              <option value="اسنان"> طب أسنان</option>
              <option value="صيدلة"> صيدلة</option>
              <option value="مدنية"> هندسة مدنية</option>
              <option value="معمارية"> هندسة معمارية</option>
              <option value="معلوماتية"> هندسة معلوماتية</option>
              <option value="ميكانيك"> هندسة ميكانيك</option>
            </select>
            {errors.educationType && (
              <p id="education-error" className="error-message" role="alert" aria-live="assertive">
                ⚠️ {errors.educationType}
              </p>
            )}
          </div>

          {/* حقل السنة الدراسية */}
          <div className="input-group">
            <label htmlFor="academicYear">السنة الدراسية</label>
            <select 
              class="custom-select"
              id="academicYear"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className={errors.academicYear ? 'error' : ''}
              aria-describedby="year-error"
              required
            >
              <option value="">اختر السنة الدراسية</option>
              <option value="الأولى">السنة الأولى</option>
              <option value="الثانية">السنة الثانية</option>
              <option value="الثالثة">السنة الثالثة</option>
              <option value="الرابعة">السنة الرابعة</option>
              <option value="الخامسة">السنة الخامسة</option>
            </select>
            {errors.academicYear && (
              <p id="year-error" className="error-message" role="alert" aria-live="assertive">
                ⚠️ {errors.academicYear}
              </p>
            )}
          </div>
          {/* حقل البريد الإلكتروني */}

          <div className="input-group">
            <label htmlFor="email">البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="أدخل بريدك الإلكتروني"
              aria-describedby="email-error"
              className={errors.email ? 'error' : ''}
              required
            />
            {errors.email && (
              <p id="email-error" className="error-message" role="alert">
                ⚠️ {errors.email}
              </p>
            )}
          </div>

          {/* حقل كلمة المرور */}
          <div className="input-group">
            <label htmlFor="password">كلمة المرور</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              aria-describedby="password-error"
              className={errors.password ? 'error' : ''}
              required
            />
            {errors.password && (
              <p id="password-error" className="error-message" role="alert">
                ⚠️ {errors.password}
              </p>
            )}
          </div>

          <button type="submit" className="signup-button">
            إنشاء الحساب
          </button>

          <div className="links">
          <Link to="/Login" className="link">لديك حساب بالفعل؟ سجل الدخول</Link>          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;