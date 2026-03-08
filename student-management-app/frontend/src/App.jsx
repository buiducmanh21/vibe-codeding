import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentListPage from './pages/StudentListPage';
import AddStudentPage from './pages/AddStudentPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Định nghĩa các tuyến đường (Routes) của ứng dụng */}
        <Routes>
          {/* 1. Trang chủ: Hiển thị danh sách sinh viên */}
          <Route path="/" element={<StudentListPage />} />
          
          {/* 2. Trang thêm mới: Không có tham số ID */}
          <Route path="/add" element={<AddStudentPage />} />
          
          {/* 3. Trang sửa: Có tham số :id (ví dụ: /edit/SV001) */}
          <Route path="/edit/:id" element={<AddStudentPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;