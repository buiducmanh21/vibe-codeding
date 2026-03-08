import axios from 'axios';

// Địa chỉ URL của Backend FastAPI
// Lưu ý: Backend của chúng ta chạy ở port 8000 và có prefix là /api
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Tạo một instance của Axios để dùng chung
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- ĐỊNH NGHĨA CÁC HÀM GỌI API (SERVICE LAYER) ---

// 1. Lấy danh sách sinh viên
export const getStudents = async () => {
  const response = await api.get('/students/');
  return response.data;
};

// 2. Thêm sinh viên mới
export const addStudent = async (studentData) => {
  const response = await api.post('/students/', studentData);
  return response.data;
};

// 3. Lấy thông tin 1 sinh viên (để hiển thị lên form sửa)
export const getStudentById = async (id) => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};

// 4. Cập nhật thông tin sinh viên
export const updateStudent = async (id, studentData) => {
  const response = await api.put(`/students/${id}`, studentData);
  return response.data;
};

// 5. Xóa sinh viên
export const deleteStudent = async (id) => {
  const response = await api.delete(`/students/${id}`);
  return response.data;
};

export default api;