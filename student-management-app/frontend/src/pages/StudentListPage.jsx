import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudents, deleteStudent } from '../services/api';
import StudentTable from '../components/StudentTable';

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  // SỬA LỖI: Định nghĩa hàm fetch ngay bên trong useEffect
  // Cách này đảm bảo an toàn nhất, tránh mọi lỗi cảnh báo của React
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    fetchStudents();
  }, []); // Dependency rỗng [] đảm bảo chỉ chạy 1 lần khi load trang

  // Xử lý xóa sinh viên
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        
        // Sau khi xóa xong, chúng ta gọi lại API để cập nhật danh sách mới nhất
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error("Failed to delete student:", error);
        alert("Failed to delete student");
      }
    }
  };

  // Xử lý chuyển sang trang sửa
  const handleEdit = (student) => {
    navigate(`/edit/${student.student_id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Student Management</h1>
        <button
          onClick={() => navigate('/add')}
          className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          + Add New Student
        </button>
      </div>
      
      <StudentTable 
        students={students} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default StudentListPage;