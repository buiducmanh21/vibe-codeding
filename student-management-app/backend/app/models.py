from sqlalchemy import Column, String, Integer, Float
from .database import Base

class Student(Base):
    __tablename__ = "students"

    # Định nghĩa các cột trong bảng dựa trên yêu cầu của đề bài
    student_id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    birth_year = Column(Integer)
    major = Column(String)
    gpa = Column(Float)