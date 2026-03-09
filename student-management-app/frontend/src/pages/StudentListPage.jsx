import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudents, deleteStudent, getStats, exportCSV } from '../services/api';
import StudentTable from '../components/StudentTable';

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // SỬA LỖI TRIỆT ĐỂ: Sử dụng pattern "ignore" của React 19
  useEffect(() => {
    let ignore = false; // Biến cờ để ngăn chặn cập nhật state sai thời điểm

    async function fetchData() {
      try {
        const [studentData, statData] = await Promise.all([
          getStudents(searchTerm),
          getStats()
        ]);
        
        // Chỉ cập nhật state nếu component vẫn còn "mount" và không bị ignore
        if (!ignore) {
          setStudents(studentData);
          setStats(statData);
        }
      } catch (err) {
        console.error("Failed to load data:", err);
      }
    }

    fetchData();

    // Hàm cleanup: sẽ chạy khi component bị unmount hoặc searchTerm thay đổi
    return () => {
      ignore = true;
    };
  }, [searchTerm]); // Chạy lại khi người dùng gõ tìm kiếm

  // Hàm load lại dữ liệu sau khi xóa (không dùng useEffect)
  const refreshData = async () => {
    try {
      const [studentData, statData] = await Promise.all([
        getStudents(searchTerm),
        getStats()
      ]);
      setStudents(studentData);
      setStats(statData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        await refreshData(); 
      } catch (err) {
        console.error(err);
        alert("Failed to delete student");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Student Management System Pro</h1>

      {/* THỐNG KÊ */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white">
            <p className="text-blue-100 font-semibold uppercase text-xs">Total Students</p>
            <p className="text-3xl font-bold">{stats.total_students}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white">
            <p className="text-green-100 font-semibold uppercase text-xs">Average GPA</p>
            <p className="text-3xl font-bold">{stats.average_gpa}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white">
            <p className="text-purple-100 font-semibold uppercase text-xs">Students by Major</p>
            <div className="text-sm mt-1">
              {Object.entries(stats.students_by_major).map(([major, count]) => (
                <span key={major} className="inline-block bg-white/20 rounded px-2 py-1 mr-2 mb-1">
                  {major}: {count}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
        <div className="relative w-full md:max-w-md">
          <input 
            type="text" 
            placeholder="🔍 Search student by name..." 
            className="w-full border border-gray-300 p-3 pl-10 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button onClick={() => navigate('/add')} className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-md">
            + Add Student
          </button>
          <button onClick={exportCSV} className="flex-1 md:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl border border-gray-300">
            📥 Export CSV
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <StudentTable 
          students={students} 
          onEdit={(s) => navigate(`/edit/${s.student_id}`)} 
          onDelete={handleDelete} 
        />
      </div>
    </div>
  );
};

export default StudentListPage;