import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        age: '',
        gender: '',
        studyField: '',
        email: '',
        password: '',
        EducationLevel: '',
        telegramId: '',
        preferredRegistrationTime: '',
        registrationSection: '',
        knownLanguages: [],
        readingInterests: [],
        studyYear: ''
    });

    const [audioFile, setAudioFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const audioRef = useRef(null);
    const navigate = useNavigate();

    const qualifications = ['ثانوية عامة', 'دبلوم', 'بكالوريوس', 'ماجستير', 'دكتوراه'];
    const experienceOptions = ['تعليم', 'برمجة', 'تصميم', 'إدارة', 'كتابة محتوى'];
    const timePreferences = [' 2', '3', '4', '6'];
    const registrationSections = ['قسم القران','قسم الرياضيات', 'قسم الشعر','قسم الحقوق'];
    const languageOptions = ['العربية', 'الإنجليزية', 'الفرنسية', 'الألمانية', 'الإسبانية'];
    const educationTypes = ['طب بشري', 'طب أسنان', 'صيدلة', 'هندسات', 'حقوق', 'هندسة معلوماتية', ' اداب'];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'الاسم الكامل مطلوب';
            toast.error('الرجاء إدخال الاسم الكامل');
        }
        if (!formData.age || formData.age < 15 || formData.age > 100) {
            newErrors.age = 'العمر يجب أن يكون بين 15 و 100 سنة';
            toast.error('العمر يجب أن يكون بين 15 و 100 سنة');
        }
        if (!formData.gender) {
            newErrors.gender = 'الرجاء اختيار الجنس';
            toast.error('الرجاء اختيار الجنس');
        }
        if (!formData.studyField) {
            newErrors.studyField = 'يرجى اختيار نوع الدراسة';
            toast.error('يرجى اختيار نوع الدراسة');
        }
        if (formData.password.length < 6) {
            newErrors.password = 'كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل';
            toast.error('كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل');
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'بريد إلكتروني غير صالح';
            toast.error('بريد إلكتروني غير صالح');
        }
        if (!formData.EducationLevel) {
            newErrors.EducationLevel = 'المؤهل العلمي مطلوب';
            toast.error('المؤهل العلمي مطلوب');
        }
        if (!formData.telegramId.match(/^@?(\w){5,32}$/)) {
            newErrors.telegramId = 'معرّف تلغرام غير صالح';
            toast.error('معرّف تلغرام غير صالح');
        }
        if (!formData.preferredRegistrationTime) {
            newErrors.preferredRegistrationTime = 'يرجى تحديد التفضيلات الزمنية';
            toast.error('يرجى تحديد التفضيلات الزمنية');
        }
        if (!formData.registrationSection) {
            newErrors.registrationSection = 'يرجى اختيار قسم التسجيلات';
            toast.error('يرجى اختيار قسم التسجيلات');
        }
        if (formData.knownLanguages.length === 0) {
            newErrors.knownLanguages = 'الرجاء اختيار لغة واحدة على الأقل';
            toast.error('الرجاء اختيار لغة واحدة على الأقل');
        }
        if (formData.readingInterests.length === 0) {
            newErrors.readingInterests = 'الرجاء اختيار مجال واحد على الأقل';
            toast.error('الرجاء اختيار مجال واحد على الأقل');
        }
        if (!audioFile) {
            newErrors.audio = 'الرجاء رفع ملف صوتي';
            toast.error('الرجاء رفع ملف صوتي');
        }
        if (!formData.studyYear) {
            newErrors.studyYear = 'سنة الدراسة مطلوبة';
            toast.error('سنة الدراسة مطلوبة');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMultiSelect = (e, field) => {
        const options = [...e.target.selectedOptions].map(opt => opt.value);
        setFormData({ ...formData, [field]: options });
    };

    const handleDeselect = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter(item => item !== value)
        }));
    };

    const handleAudioUpload = (e) => {
        const file = e.target.files[0];
        setErrors({ ...errors, audio: '' });

        const validTypes = ['audio/mpeg', 'audio/wav'];
        const maxSize = 5 * 1024 * 1024;

        if (file) {
            if (!validTypes.includes(file.type)) {
                setErrors({ ...errors, audio: 'نوع الملف غير مدعوم (MP3/WAV فقط)' });
                toast.error('نوع الملف غير مدعوم (MP3/WAV فقط)');
                return;
            }
            if (file.size > maxSize) {
                setErrors({ ...errors, audio: 'الحجم الأقصى المسموح به: 5MB' });
                toast.error('الحجم الأقصى المسموح به: 5MB');
                return;
            }
            setAudioFile(file);
            toast.success('تم رفع الملف الصوتي بنجاح');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);

        try {
            const form = new FormData();
            
            // إضافة الحقول الأساسية
            Object.entries(formData).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach(item => form.append(key, item));
                } else {
                    form.append(key, value);
                }
            });
            
            // إضافة الملف الصوتي باسم 'file' كما يتوقع API
            form.append('file', audioFile);

            const response = await fetch('http://localhost:3000/api/volunteers/add-volunteer', {
                method: 'POST',
                body: form,
            });

            if (response.ok) {
                toast.success('تم التسجيل بنجاح! سيتم تحويلك إلى صفحة المتطوع ');
                setTimeout(() => navigate('/verify-otp'), 3000);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'فشل في عملية التسجيل');
            }
        } catch (error) {
            toast.error(error.message || 'حدث خطأ غير متوقع');
            console.error('API Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="signup-container">
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="signup-box">
                <h1 className="signup-title">الانضمام لعائلة بصيرة</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>الاسم الكامل</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className={errors.username ? 'error' : ''}
                        />
                        {errors.username && <span className="error-msg">⚠️ {errors.username}</span>}
                    </div>

                    <div className="input-group">
                        <label>العمر</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            min="15"
                            max="100"
                            className={errors.age ? 'error' : ''}
                        />
                        {errors.age && <span className="error-msg">⚠️ {errors.age}</span>}
                    </div>

                    <div className="input-group">
                        <label>سنة الدراسة</label>
                        <input
                            type="number"
                            name="studyYear"
                            value={formData.studyYear}
                            onChange={handleInputChange}
                            min="1"
                            className={errors.studyYear ? 'error' : ''}
                        />
                        {errors.studyYear && <span className="error-msg">⚠️ {errors.studyYear}</span>}
                    </div>

                    <div className="input-group">
                        <label>الجنس</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className={errors.gender ? 'error' : ''}
                        >
                            <option value="">اختر الجنس</option>
                            <option value="ذكر">ذكر</option>
                            <option value="أنثى">أنثى</option>
                        </select>
                        {errors.gender && <span className="error-msg">⚠️ {errors.gender}</span>}
                    </div>

                    <div className="input-group">
                        <label>نوع الدراسة</label>
                        <select
                            name="studyField"
                            value={formData.studyField}
                            onChange={handleInputChange}
                            className={errors.studyField ? 'error' : ''}
                        >
                            <option value="">اختر نوع الدراسة</option>
                            {educationTypes.map((type, i) => (
                                <option key={i} value={type}>{type}</option>
                            ))}
                        </select>
                        {errors.studyField && <span className="error-msg">⚠️ {errors.studyField}</span>}
                    </div>

                    <div className="input-group">
                        <label>البريد الإلكتروني</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-msg">⚠️ {errors.email}</span>}
                    </div>

                    <div className="input-group">
                        <label>كلمة المرور</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={errors.password ? 'error' : ''}
                        />
                        {errors.password && <span className="error-msg">⚠️ {errors.password}</span>}
                    </div>

                    <div className="input-group">
                        <label>المؤهل العلمي</label>
                        <select
                            name="EducationLevel"
                            value={formData.EducationLevel}
                            onChange={handleInputChange}
                            className={errors.EducationLevel ? 'error' : ''}
                        >
                            <option value="">اختر المؤهل</option>
                            {qualifications.map((q, i) => (
                                <option key={i} value={q}>{q}</option>
                            ))}
                        </select>
                        {errors.EducationLevel && <span className="error-msg">⚠️ {errors.EducationLevel}</span>}
                    </div>

                    <div className="input-group">
                        <label>معرّف التلغرام</label>
                        <input
                            type="text"
                            name="telegramId"
                            value={formData.telegramId}
                            onChange={handleInputChange}
                            placeholder="@username"
                        />
                    </div>

                    <div className="input-group">
                        <label>عدد الساعات</label>
                        <select
                            name="preferredRegistrationTime"
                            value={formData.preferredRegistrationTime}
                            onChange={handleInputChange}
                            className={errors.preferredRegistrationTime ? 'error' : ''}
                        >
                            <option value="">اختر عدد الساعات المخصصة للفريق</option>
                            {timePreferences.map((t, i) => (
                                <option key={i} value={t}>{t}</option>
                            ))}
                        </select>
                        {errors.preferredRegistrationTime && <span className="error-msg">⚠️ {errors.preferredRegistrationTime}</span>}
                    </div>

                    <div className="input-group">
                        <label>قسم التسجيلات</label>
                        <select
                            name="registrationSection"
                            value={formData.registrationSection}
                            onChange={handleInputChange}
                            className={errors.registrationSection ? 'error' : ''}
                        >
                            <option value="">اختر القسم</option>
                            {registrationSections.map((sec, i) => (
                                <option key={i} value={sec}>{sec}</option>
                            ))}
                        </select>
                        {errors.registrationSection && <span className="error-msg">⚠️ {errors.registrationSection}</span>}
                    </div>

                    <div className="input-group">
                        <label>اللغات التي تجيدها</label>
                        <div className="multi-select-container">
                            <select
                                multiple
                                value={formData.knownLanguages}
                                onChange={(e) => handleMultiSelect(e, 'knownLanguages')}
                                className={`multi-select ${errors.knownLanguages ? 'error' : ''}`}
                            >
                                {languageOptions.map((lang, i) => (
                                    <option key={i} value={lang}>{lang}</option>
                                ))}
                            </select>
                            <div className="selected-items">
                                {formData.knownLanguages.map(lang => (
                                    <span key={lang} className="selected-tag">
                                        {lang}
                                        <button
                                            type="button"
                                            onClick={() => handleDeselect('knownLanguages', lang)}
                                        >×</button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <small className="select-hint">استخدم Ctrl/Command لتحديد عدة خيارات</small>
                        {errors.knownLanguages && <span className="error-msg">⚠️ {errors.knownLanguages}</span>}
                    </div>

                    

                    <div className="input-group">
                        <label>رفع ملف صوتي (60 ثانية كحد أقصى)</label>
                        <div className="file-input-container">
                            <input
                                type="file"
                                id="audio-upload"
                                accept=".mp3,.wav"
                                onChange={handleAudioUpload}
                                className="visually-hidden"
                            />
                            <label htmlFor="audio-upload" className="upload-label">
                                اختر ملفًا صوتيًا
                            </label>
                            {audioFile && <span className="file-name">{audioFile.name}</span>}
                        </div>
                        {errors.audio && <span className="error-msg">⚠️ {errors.audio}</span>}
                    </div>

                    {audioFile && (
                        <div className="audio-preview">
                            <audio controls ref={audioRef}>
                                <source src={URL.createObjectURL(audioFile)} type={audioFile.type} />
                            </audio>
                        </div>
                    )}

                    <button type="submit" className="signup-button" disabled={isLoading}>
                        {isLoading ? 'جاري الإنشاء...' : 'ارسال الطلب'}
                    </button>
                </form>

                <div className="login-link">
                    <Link to="/login">لديك حساب بالفعل؟ سجل الدخول</Link>
                </div>
            </div>
        </main>
    );
};

export default Signup;