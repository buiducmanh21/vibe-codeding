from pydantic import BaseModel, ConfigDict
from typing import Optional, List

# --- SCHEMA CHO CLASS ---
class ClassBase(BaseModel):
    class_id: str
    class_name: str
    advisor: Optional[str] = None

class ClassCreate(ClassBase):
    pass

class Class(ClassBase):
    model_config = ConfigDict(from_attributes=True)

# --- SCHEMA CHO STUDENT (CẬP NHẬT) ---
class StudentBase(BaseModel):
    name: str
    birth_year: Optional[int] = None
    major: Optional[str] = None
    gpa: Optional[float] = None
    class_id: str  # Yêu cầu bắt buộc theo nghiệp vụ mới

class StudentCreate(StudentBase):
    student_id: str

class StudentUpdate(BaseModel):
    name: Optional[str] = None
    birth_year: Optional[int] = None
    major: Optional[str] = None
    gpa: Optional[float] = None
    class_id: Optional[str] = None

class Student(StudentBase):
    student_id: str
    model_config = ConfigDict(from_attributes=True)