import React, { useState } from 'react'; // Bỏ useEffect ở đây

const StudentForm = ({ initialData, onSubmit, onCancel }) => {
  // Giá trị mặc định
  const defaultValues = {
    student_id: '',
    name: '',
    birth_year: '',
    major: '',
    gpa: '',
  };

  // SỬA LỖI: Khởi tạo state trực tiếp từ initialData (nếu có) hoặc defaultValues
  // Chúng ta không cần useEffect để "lắng nghe" thay đổi nữa
  const [formData, setFormData] = useState(initialData || defaultValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
        ...formData,
        birth_year: parseInt(formData.birth_year),
        gpa: parseFloat(formData.gpa)
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {initialData ? 'Edit Student' : 'Add New Student'}
      </h2>
      
      {/* ... (Phần giao diện bên dưới giữ nguyên không đổi) ... */}
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        {/* Student ID */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Student ID</label>
          <input
            type="text"
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            disabled={!!initialData} 
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${initialData ? 'cursor-not-allowed opacity-50' : ''}`}
            required
          />
        </div>

        {/* Name */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        {/* Birth Year */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Birth Year</label>
          <input
            type="number"
            name="birth_year"
            value={formData.birth_year}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        {/* Major */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Major</label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        {/* GPA */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">GPA</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="4.0"
            name="gpa"
            value={formData.gpa}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {initialData ? 'Update Student' : 'Add Student'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default StudentForm;