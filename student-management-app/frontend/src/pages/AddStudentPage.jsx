import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addStudent, getStudentById, updateStudent } from '../services/api';
import StudentForm from '../components/StudentForm';

const AddStudentPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        try {
          const data = await getStudentById(id);
          setStudent(data);
        } catch (error) {
          console.error("Failed to fetch student:", error);
          alert("Could not load student data");
          navigate('/');
        }
      };
      fetchStudent();
    }
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    try {
      if (id) {
        await updateStudent(id, formData);
        alert('Student updated successfully!');
      } else {
        await addStudent(formData);
        alert('Student added successfully!');
      }
      navigate('/'); 
    } catch (error) {
      console.error("Failed to save student:", error);
      const message = error.response?.data?.detail || "Failed to save student";
      alert(message);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {id ? 'Edit Student' : 'Add New Student'}
      </h1>
      
      <StudentForm 
        key={student ? student.student_id : 'new'} 
        initialData={student} 
        onSubmit={handleSubmit} 
        onCancel={() => navigate('/')} 
      />
    </div>
  );
};

export default AddStudentPage;