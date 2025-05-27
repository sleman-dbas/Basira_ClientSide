import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        gender: '',
        educationType: '',
        email: '',
        password: '',
        qualification: '',
        countryCode: '+963',
        phone: '',
        telegramId: '',
        experience: '',
        preferredTimes: '',
        registrationSection: '',
        languages: [],
        readingFields: []
    });

    const [audioFile, setAudioFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const audioRef = useRef(null);
    const navigate = useNavigate();

    const countryCodes = ['+963', '+966', '+971', '+20', '+1'];
    const qualifications = ['ثانوية عامة', 'دبلوم', 'بكالوريوس', 'ماجستير', 'دكتوراه'];
    const experienceOptions = ['تعليم', 'برمجة', 'تصميم', 'إدارة', 'كتابة محتوى'];
    const timePreferences = ['صباحًا (8-12)', 'ظهرًا (12-4)', 'مساءً (4-8)', 'ليلًا (8-12)'];
    const registrationSections = ['القسم الأكاديمي', 'القسم الفني', 'القسم الإداري'];
    const languageOptions = ['العربية', 'الإنجليزية', 'الفرنسية', 'الألمانية', 'الإسبانية'];
    const readingFieldOptions = ['العلوم الطبية', 'الهندسة', 'العلوم الإنسانية', 'البرمجة', 'التصميم'];
    const educationTypes = ['طب بشري', 'طب أسنان', 'صيدلة', 'هندسة مدنية', 'هندسة معمارية', 'هندسة معلوماتية', 'هندسة ميكانيك'];

    const validateForm = () => {
        const newErrors = {};
        const phoneRegex = formData.countryCode === '+963' ? /^9\d{8}$/ : /^\d{8,15}$/;

        if (!formData.fullName.trim()) newErrors.fullName = 'الاسم الكامل مطلوب';
        if (!formData.age || formData.age < 15) newErrors.age = 'العمر يجب أن يكون 15 سنة على الأقل';
        if (!formData.gender) newErrors.gender = 'الرجاء اختيار الجنس';
        if (!formData.educationType) newErrors.educationType = 'يرجى اختيار نوع الدراسة';
        if (formData.password.length < 6) newErrors.password = 'كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'بريد إلكتروني غير صالح';
        if (!formData.qualification) newErrors.qualification = 'المؤهل العلمي مطلوب';
        if (!formData.phone.match(phoneRegex)) newErrors.phone = 'رقم هاتف غير صالح';
        if (!formData.telegramId.match(/^@?(\w){5,32}$/)) newErrors.telegramId = 'معرّف تلغرام غير صالح';
        if (!formData.preferredTimes) newErrors.preferredTimes = 'يرجى تحديد التفضيلات الزمنية';
        if (!formData.registrationSection) newErrors.registrationSection = 'يرجى اختيار قسم التسجيلات';
        if (formData.languages.length === 0) newErrors.languages = 'الرجاء اختيار لغة واحدة على الأقل';
        if (formData.readingFields.length === 0) newErrors.readingFields = 'الرجاء اختيار مجال واحد على الأقل';
        if (!audioFile) newErrors.audio = 'الرجاء رفع ملف صوتي';
        // التحقق من العمر
        if (!formData.age || formData.age < 15 || formData.age > 100) {
            newErrors.age = 'العمر يجب أن يكون بين 15 و 100 سنة';
        }

        // التحقق من مجال الخبرة
        if (!formData.experience) {
            newErrors.experience = 'يرجى اختيار مجال الخبرة';
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
                return;
            }
            if (file.size > maxSize) {
                setErrors({ ...errors, audio: 'الحجم الأقصى المسموح به: 5MB' });
                return;
            }
            setAudioFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);

        try {
            const form = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach(item => form.append(key, item));
                } else {
                    form.append(key, value);
                }
            });
            form.append('phone', formData.countryCode + formData.phone);
            form.append('audio', audioFile);

            const response = await fetch('http://192.168.1.6:3000/api/students/register', {
                method: 'POST',
                body: form,
            });

            if (response.ok) navigate('/dashboard');
            else throw new Error('فشل في عملية التسجيل');

        } catch (error) {
            setErrors({ ...errors, api: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="signup-container">
            <div className="signup-box">
                <h1 className="signup-title">الانضمام لعائلة بصيرة</h1>

                {errors.api && <div className="api-error">⚠️ {errors.api}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>الاسم الكامل</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className={errors.fullName ? 'error' : ''}
                        />
                        {errors.fullName && <span className="error-msg">⚠️ {errors.fullName}</span>}
                    </div>

                    <div className="input-group">
                        <label>العمر</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            min="15"
                            className={errors.age ? 'error' : ''}
                        />
                        {errors.age && <span className="error-msg">⚠️ {errors.age}</span>}
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
                            name="educationType"
                            value={formData.educationType}
                            onChange={handleInputChange}
                            className={errors.educationType ? 'error' : ''}
                        >
                            <option value="">اختر نوع الدراسة</option>
                            {educationTypes.map((type, i) => (
                                <option key={i} value={type}>{type}</option>
                            ))}
                        </select>
                        {errors.educationType && <span className="error-msg">⚠️ {errors.educationType}</span>}
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
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleInputChange}
                            className={errors.qualification ? 'error' : ''}
                        >
                            <option value="">اختر المؤهل</option>
                            {qualifications.map((q, i) => (
                                <option key={i} value={q}>{q}</option>
                            ))}
                        </select>
                        {errors.qualification && <span className="error-msg">⚠️ {errors.qualification}</span>}
                    </div>

                    <div className="input-group">
                        <label>رقم الهاتف (واتساب/تلغرام)</label>
                        <div className="phone-input">

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder={formData.countryCode === '+963' ? '9xxxxxxx' : 'xxxxxxxx'}
                                className={errors.phone ? 'error' : ''}
                            />
                        </div>
                        {formData.countryCode !== '+963' &&
                            <span className="info-text">الرجاء إضافة مفتاح الدولة المناسب</span>}
                        {errors.phone && <span className="error-msg">⚠️ {errors.phone}</span>}
                    </div>

                    <div className="input-group">
                        <label>معرّف التلغرام</label>
                        <input
                            type="text"
                            name="telegramId"
                            value={formData.telegramId}
                            onChange={handleInputChange}
                            placeholder="@username"
                            className={errors.telegramId ? 'error' : ''}
                        />
                        {errors.telegramId && <span className="error-msg">⚠️ {errors.telegramId}</span>}
                    </div>

                    <div className="input-group">
                        <label>مجال الخبرة</label>
                        <select
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            className={errors.experience ? 'error' : ''}
                        >
                            <option value="">اختر مجال الخبرة</option>
                            {experienceOptions.map((exp, i) => (
                                <option key={i} value={exp}>{exp}</option>
                            ))}
                        </select>
                        {errors.experience && <span className="error-msg">⚠️ {errors.experience}</span>}
                    </div>

                    <div className="input-group">
                        <label>الوقت المفضل للتسجيل</label>
                        <select
                            name="preferredTimes"
                            value={formData.preferredTimes}
                            onChange={handleInputChange}
                            className={errors.preferredTimes ? 'error' : ''}
                        >
                            <option value="">اختر الوقت المناسب</option>
                            {timePreferences.map((t, i) => (
                                <option key={i} value={t}>{t}</option>
                            ))}
                        </select>
                        {errors.preferredTimes && <span className="error-msg">⚠️ {errors.preferredTimes}</span>}
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
                                value={formData.languages}
                                onChange={(e) => handleMultiSelect(e, 'languages')}
                                className={`multi-select ${errors.languages ? 'error' : ''}`}
                            >
                                {languageOptions.map((lang, i) => (
                                    <option key={i} value={lang}>{lang}</option>
                                ))}
                            </select>
                            <div className="selected-items">
                                {formData.languages.map(lang => (
                                    <span key={lang} className="selected-tag">
                                        {lang}
                                        <button
                                            type="button"
                                            onClick={() => handleDeselect('languages', lang)}
                                        >×</button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <small className="select-hint">استخدم Ctrl/Command لتحديد عدة خيارات</small>
                        {errors.languages && <span className="error-msg">⚠️ {errors.languages}</span>}
                    </div>

                    <div className="input-group">
                        <label>مجالات القراءة</label>
                        <div className="multi-select-container">
                            <select
                                multiple
                                value={formData.readingFields}
                                onChange={(e) => handleMultiSelect(e, 'readingFields')}
                                className={`multi-select ${errors.readingFields ? 'error' : ''}`}
                            >
                                {readingFieldOptions.map((field, i) => (
                                    <option key={i} value={field}>{field}</option>
                                ))}
                            </select>
                            <div className="selected-items">
                                {formData.readingFields.map(field => (
                                    <span key={field} className="selected-tag">
                                        {field}
                                        <button
                                            type="button"
                                            onClick={() => handleDeselect('readingFields', field)}
                                        >×</button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <small className="select-hint">استخدم Ctrl/Command لتحديد عدة خيارات</small>
                        {errors.readingFields && <span className="error-msg">⚠️ {errors.readingFields}</span>}
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