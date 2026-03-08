from pydantic import BaseModel, ConfigDict
from typing import Optional

# 1. Schema cơ sở chứa các trường chung
class StudentBase(BaseModel):
    name: str
    birth_year: Optional[int] = None
    major: Optional[str] = None
    gpa: Optional[float] = None

# 2. Schema dùng khi tạo mới sinh viên (yêu cầu phải có student_id)
class StudentCreate(StudentBase):
    student_id: str

# 3. Schema dùng khi cập nhật thông tin sinh viên (các trường đều có thể bỏ trống nếu không muốn cập nhật)
class StudentUpdate(BaseModel):
    name: Optional[str] = None
    birth_year: Optional[int] = None
    major: Optional[str] = None
    gpa: Optional[float] = None

# 4. Schema dùng để trả dữ liệu về cho Frontend (Response)
class Student(StudentBase):
    student_id: str

    # Cấu hình này giúp Pydantic có thể đọc được dữ liệu từ SQLAlchemy Model (ORM)
    model_config = ConfigDict(from_attributes=True)