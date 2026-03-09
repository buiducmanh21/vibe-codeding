from sqlalchemy import Column, String, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Class(Base):
    __tablename__ = "classes"

    class_id = Column(String, primary_key=True, index=True)
    class_name = Column(String, nullable=False)
    advisor = Column(String)

    # Quan hệ: Một lớp có nhiều sinh viên
    students = relationship("Student", back_populates="classroom")

class Student(Base):
    __tablename__ = "students"

    student_id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    birth_year = Column(Integer)
    major = Column(String)
    gpa = Column(Float)
    
    # THÊM MỚI: Khóa ngoại liên kết tới bảng classes
    class_id = Column(String, ForeignKey("classes.class_id"), nullable=False)
    
    # Quan hệ ngược lại: Sinh viên thuộc về một lớp
    classroom = relationship("Class", back_populates="students")