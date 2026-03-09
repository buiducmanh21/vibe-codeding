import React, { useState, useEffect } from 'react';
import { getClasses } from '../services/api';

const StudentForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    student_id: '', name: '', birth_year: '', major: '', gpa: '', class_id: ''
  });
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Lấy danh sách lớp học để đổ vào dropdown
    getClasses().then(setClasses).catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      birth_year: parseInt(formData.birth_year),
      gpa: parseFloat(formData.gpa)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-medium">Student ID</label>
          <input type="text" name="student_id" value={formData.student_id} onChange={handleChange} disabled={!!initialData} className="bg-gray-50 border w-full p-2.5 rounded-lg" required />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border w-full p-2.5 rounded-lg" required />
        </div>
        
        {/* Ô CHỌN LỚP HỌC (Yêu cầu 2) */}
        <div>
          <label className="block mb-2 text-sm font-medium">Class</label>
          <select name="class_id" value={formData.class_id} onChange={handleChange} className="bg-gray-50 border w-full p-2.5 rounded-lg" required>
            <option value="">-- Select Class --</option>
            {classes.map(c => (
              <option key={c.class_id} value={c.class_id}>{c.class_name} ({c.class_id})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Major</label>
          <input type="text" name="major" value={formData.major} onChange={handleChange} className="bg-gray-50 border w-full p-2.5 rounded-lg" required />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Birth Year</label>
          <input type="number" name="birth_year" value={formData.birth_year} onChange={handleChange} className="bg-gray-50 border w-full p-2.5 rounded-lg" required />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">GPA</label>
          <input type="number" step="0.1" name="gpa" value={formData.gpa} onChange={handleChange} className="bg-gray-50 border w-full p-2.5 rounded-lg" required />
        </div>
      </div>
      <div className="flex space-x-4">
        <button type="submit" className="bg-blue-700 text-white px-5 py-2.5 rounded-lg">Save</button>
        <button type="button" onClick={onCancel} className="border border-red-600 text-red-600 px-5 py-2.5 rounded-lg">Cancel</button>
      </div>
    </form>
  );
};

export default StudentForm;