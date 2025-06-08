import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import '../styles/AdminDashboard.css';
import StatsButton from '../components/StatsButton/StatsButton';

const AdminDashboard = () => {
  // الحالات الحالية لإدارة الموظفين
  const [employees, setEmployees] = useState([
    { id: 1, name: 'أحمد محمد', email: 'ahmed@admin.com', role: 'مدير', permissions: ['إدارة الموظفين', 'إعدادات النظام'] },
    { id: 2, name: 'سارة علي', email: 'sara@coordinator.com', role: 'منسق', permissions: ['إدارة المتطوعين', 'معالجة الملفات'] },
    { id: 3, name: 'خالد حسن', email: 'khaled@volunteer.com', role: 'متطوع', permissions: ['تحويل الملفات', 'مساعدة المستخدمين'] },
    { id: 4, name: 'لمى عبد الله', email: 'lama@support.com', role: 'دعم فني', permissions: ['دعم المستخدمين', 'إصلاح المشاكل'] },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', role: '', permissions: [] });
  const [notification, setNotification] = useState('');

  // قائمة الصلاحيات المتاحة
  const availablePermissions = [
    'إدارة الموظفين',
    'إدارة المتطوعين',
    'معالجة الملفات',
    'تحويل الملفات',
    'إعدادات النظام',
    'دعم المستخدمين',
    'إصلاح المشاكل',
    'مساعدة المستخدمين',
    'مراجعة التقارير',
    'إدارة المحتوى'
  ];

  // تصفية الموظفين حسب البحث
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // معالجة إضافة موظف جديد
  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.role) {
      setNotification('الرجاء ملء جميع الحقول المطلوبة');
      setTimeout(() => setNotification(''), 3000);
      return;
    }

    const newEmp = {
      id: Date.now(),
      name: newEmployee.name,
      email: newEmployee.email,
      role: newEmployee.role,
      permissions: [...newEmployee.permissions]
    };

    setEmployees([...employees, newEmp]);
    setShowAddModal(false);
    setNewEmployee({ name: '', email: '', role: '', permissions: [] });
    setNotification('تمت إضافة الموظف بنجاح');
    setTimeout(() => setNotification(''), 3000);
  };

  // معالجة تحديث موظف
  const handleUpdateEmployee = () => {
    if (!currentEmployee) return;

    setEmployees(employees.map(emp => 
      emp.id === currentEmployee.id ? currentEmployee : emp
    ));
    
    setShowEditModal(false);
    setNotification('تم تحديث بيانات الموظف بنجاح');
    setTimeout(() => setNotification(''), 3000);
  };

  // معالجة حذف موظف
  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    setNotification('تم حذف الموظف بنجاح');
    setTimeout(() => setNotification(''), 3000);
  };

  // معالجة تغيير الصلاحيات
  const handlePermissionChange = (permission, isChecked) => {
    if (!currentEmployee) return;
    
    const updatedPermissions = isChecked
      ? [...currentEmployee.permissions, permission]
      : currentEmployee.permissions.filter(p => p !== permission);
    
    setCurrentEmployee({ ...currentEmployee, permissions: updatedPermissions });
  };

  // فتح نافذة تعديل الموظف
  const openEditModal = (employee) => {
    setCurrentEmployee({ ...employee });
    setShowEditModal(true);
  };

  return (
    <div className="admin-dashboard" role="main" aria-label="لوحة تحكم المدير">
      <Navbar />
      
      <div className="dashboard-container">
        <h1 className="dashboard-title">لوحة تحكم المدير</h1>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="ابحث عن موظف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="بحث عن موظفين"
          />
          <button 
            className="add-employee-btn"
            onClick={() => setShowAddModal(true)}
          >
            إضافة موظف جديد
          </button>
        </div>
        
        <div className="table-container">
          <table className="employees-table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>البريد الإلكتروني</th>
                <th>الدور</th>
                <th>الصلاحيات</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>
                  <td>
                    <div className="permissions-container">
                      {employee.permissions.map(permission => (
                        <span key={permission} className="permission-badge">
                          {permission}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="actions-container">
                      <button 
                        onClick={() => openEditModal(employee)}
                        className="edit-btn"
                        aria-label={`تعديل بيانات ${employee.name}`}
                      >
                        تعديل
                      </button>
                      <button 
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="delete-btn"
                        aria-label={`حذف ${employee.name}`}
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* نافذة إضافة موظف جديد */}
      {showAddModal && (
        <div className="modal" role="dialog" aria-labelledby="add-modal-title">
          <div className="modal-content">
            <div className="modal-header">
              <h2 id="add-modal-title">إضافة موظف جديد</h2>
              <button 
                onClick={() => {
                  setShowAddModal(false);
                  setNewEmployee({ name: '', email: '', role: '', permissions: [] });
                }}
                className="close-btn"
                aria-label="إغلاق النافذة"
              >
                &times;
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">الاسم الكامل</label>
                <input
                  id="name"
                  type="text"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                  placeholder="أدخل الاسم الكامل للموظف"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">البريد الإلكتروني</label>
                <input
                  id="email"
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                  placeholder="أدخل البريد الإلكتروني"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="role">الدور الوظيفي</label>
                <select
                  id="role"
                  value={newEmployee.role}
                  onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})}
                >
                  <option value="">اختر دور الموظف</option>
                  <option value="مدير">مدير</option>
                  <option value="منسق">منسق</option>
                  <option value="متطوع">متطوع</option>
                  <option value="دعم فني">دعم فني</option>
                  <option value="مشرف">مشرف</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>الصلاحيات</label>
                <div className="permissions-grid">
                  {availablePermissions.map(permission => (
                    <div key={permission} className="permission-item">
                      <input
                        type="checkbox"
                        id={`add-${permission}`}
                        checked={newEmployee.permissions.includes(permission)}
                        onChange={(e) => {
                          const updatedPermissions = e.target.checked
                            ? [...newEmployee.permissions, permission]
                            : newEmployee.permissions.filter(p => p !== permission);
                          
                          setNewEmployee({...newEmployee, permissions: updatedPermissions});
                        }}
                      />
                      <label htmlFor={`add-${permission}`}>{permission}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  onClick={handleAddEmployee}
                  className="save-btn"
                >
                  حفظ الموظف
                </button>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="cancel-btn"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* نافذة تعديل الموظف */}
      {showEditModal && currentEmployee && (
        <div className="modal" role="dialog" aria-labelledby="edit-modal-title">
          <div className="modal-content">
            <div className="modal-header">
              <h2 id="edit-modal-title">تعديل بيانات الموظف</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="close-btn"
                aria-label="إغلاق النافذة"
              >
                &times;
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="edit-name">الاسم الكامل</label>
                <input
                  id="edit-name"
                  type="text"
                  value={currentEmployee.name}
                  onChange={(e) => setCurrentEmployee({...currentEmployee, name: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="edit-email">البريد الإلكتروني</label>
                <input
                  id="edit-email"
                  type="email"
                  value={currentEmployee.email}
                  onChange={(e) => setCurrentEmployee({...currentEmployee, email: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="edit-role">الدور الوظيفي</label>
                <select
                  id="edit-role"
                  value={currentEmployee.role}
                  onChange={(e) => setCurrentEmployee({...currentEmployee, role: e.target.value})}
                >
                  <option value="مدير">مدير</option>
                  <option value="منسق">منسق</option>
                  <option value="متطوع">متطوع</option>
                  <option value="دعم فني">دعم فني</option>
                  <option value="مشرف">مشرف</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>الصلاحيات</label>
                <div className="permissions-grid">
                  {availablePermissions.map(permission => (
                    <div key={permission} className="permission-item">
                      <input
                        type="checkbox"
                        id={`edit-${permission}`}
                        checked={currentEmployee.permissions.includes(permission)}
                        onChange={(e) => handlePermissionChange(permission, e.target.checked)}
                      />
                      <label htmlFor={`edit-${permission}`}>{permission}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  onClick={handleUpdateEmployee}
                  className="save-btn"
                >
                  حفظ التعديلات
                </button>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="cancel-btn"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {notification && (
        <div className="notification" role="alert">
          {notification}
        </div>
      )}
            <StatsButton />
      
    </div>
  );
};

export default AdminDashboard;