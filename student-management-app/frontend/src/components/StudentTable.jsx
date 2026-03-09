import React from 'react';

const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Student ID</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3 text-blue-600">Class</th>
            <th scope="col" className="px-6 py-3">Major</th>
            <th scope="col" className="px-6 py-3">GPA</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {student.student_id}
              </td>
              <td className="px-6 py-4 font-bold">{student.name}</td>
              <td className="px-6 py-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {student.class_id}
                </span>
              </td>
              <td className="px-6 py-4">{student.major}</td>
              <td className="px-6 py-4">{student.gpa}</td>
              <td className="px-6 py-4 flex gap-3">
                <button
                  onClick={() => onEdit(student)}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(student.student_id)}
                  className="font-medium text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;