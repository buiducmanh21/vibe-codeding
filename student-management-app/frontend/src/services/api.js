import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// --- STUDENTS ---
export const getStudents = async (search = '') => {
  const response = await api.get(`/students/?search=${search}`);
  return response.data;
};

export const addStudent = async (data) => {
  const response = await api.post('/students/', data);
  return response.data;
};

export const getStudentById = async (id) => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};

export const updateStudent = async (id, data) => {
  const response = await api.put(`/students/${id}`, data);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await api.delete(`/students/${id}`);
  return response.data;
};

// --- CLASSES ---
export const getClasses = async () => {
  const response = await api.get('/classes/');
  return response.data;
};

// --- STATS ---
export const getStats = async () => {
  const response = await api.get('/stats/');
  return response.data;
};

// --- EXPORT ---
export const exportCSV = () => {
  window.open(`${API_BASE_URL}/export-csv/`, '_blank');
};

export default api;