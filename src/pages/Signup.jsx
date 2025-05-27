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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'الاسم الكامل مطلوب';
    if (!age || age < 15) newErrors.age = 'العمر يجب أن يكون 15 سنة على الأقل';
    if (!gender) newErrors.gender = 'الرجاء اختيار الجنس';
    if (!educationType) newErrors.educationType = 'يرجى اختيار نوع الدراسة';
    if (!academicYear) newErrors.academicYear = 'يرجى تحديد السنة الدراسية';
    if (password.length < 6) newErrors.password = 'كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'بريد إلكتروني غير صالح';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const requestBody = {
        email: email,
        password: password,
        username: fullName,
        EducationLevel: "bacaloryos",
        gender: gender === "ذكر" ? "male" : "female",
        age: parseInt(age),
        studyField: educationType,
        studyYear: parseInt(academicYear.replace(/[^0-9]/g, '')) // تحويل "السنة الأولى" إلى 1
      };

      const response = await fetch('http://192.168.1.6:3000/api/students/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'فشل في عملية التسجيل');
      }

      navigate('/dashboard');
    } catch (error) {
      setErrors(prev => ({ ...prev, api: error.message }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main role="main" className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">إنشاء حساب جديد لبصيرة</h1>

        {errors.api && (
          <div className="api-error-message">
            ⚠️ {errors.api}
          </div>
        )}

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
              className={errors.fullName ? 'error' : ''}
              required
            />
            {errors.fullName && <p className="error-message">⚠️ {errors.fullName}</p>}
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
              className={errors.age ? 'error' : ''}
              required
            />
            {errors.age && <p className="error-message">⚠️ {errors.age}</p>}
          </div>

          {/* حقل الجنس */}
          <div className="input-group">
            <label htmlFor="gender">الجنس</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={errors.gender ? 'error' : ''}
              required
            >
              <option value="">اختر الجنس</option>
              <option value="ذكر">ذكر</option>
              <option value="أنثى">أنثى</option>
            </select>
            {errors.gender && <p className="error-message">⚠️ {errors.gender}</p>}
          </div>

          {/* حقل نوع الدراسة */}
          <div className="input-group">
            <label htmlFor="educationType">نوع الدراسة</label>
            <select
              id="educationType"
              value={educationType}
              onChange={(e) => setEducationType(e.target.value)}
              className={errors.educationType ? 'error' : ''}
              required
            >
              <option value="">اختر نوع الدراسة</option>
              <option value="بشري">طب بشري</option>
              <option value="اسنان">طب أسنان</option>
              <option value="صيدلة">صيدلة</option>
              <option value="مدنية">هندسة مدنية</option>
              <option value="معمارية">هندسة معمارية</option>
              <option value="معلوماتية">هندسة معلوماتية</option>
              <option value="ميكانيك">هندسة ميكانيك</option>
            </select>
            {errors.educationType && <p className="error-message">⚠️ {errors.educationType}</p>}
          </div>

          {/* حقل السنة الدراسية */}
          <div className="input-group">
            <label htmlFor="academicYear">السنة الدراسية</label>
            <select
              id="academicYear"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className={errors.academicYear ? 'error' : ''}
              required
            >
              <option value="">اختر السنة الدراسية</option>
              <option value="الأولى">السنة الأولى</option>
              <option value="الثانية">السنة الثانية</option>
              <option value="الثالثة">السنة الثالثة</option>
              <option value="الرابعة">السنة الرابعة</option>
              <option value="الخامسة">السنة الخامسة</option>
            </select>
            {errors.academicYear && <p className="error-message">⚠️ {errors.academicYear}</p>}
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
              className={errors.email ? 'error' : ''}
              required
            />
            {errors.email && <p className="error-message">⚠️ {errors.email}</p>}
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
              className={errors.password ? 'error' : ''}
              required
            />
            {errors.password && <p className="error-message">⚠️ {errors.password}</p>}
          </div>

          <button 
            type="submit" 
            className="signup-button"
            disabled={isLoading}
          >
            {isLoading ? 'جاري الإنشاء...' : 'إنشاء الحساب'}
          </button>

          <div className="links">
            <Link to="/Login" className="link">لديك حساب بالفعل؟ سجل الدخول</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;