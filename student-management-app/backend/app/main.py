from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from . import crud, models, schemas
from .database import engine, get_db

# Lệnh này sẽ tự động tạo các bảng trong SQLite dựa trên models.py nếu chúng chưa tồn tại
models.Base.metadata.create_all(bind=engine)

# Khởi tạo ứng dụng FastAPI
app = FastAPI(title="Student Management API")

# CẤU HÌNH CORS: Rất quan trọng! 
# Cho phép Frontend (React chạy ở port khác) có thể gọi API tới Backend mà không bị trình duyệt chặn.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả các domain gọi tới (trong thực tế nên giới hạn lại)
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả các method (GET, POST, PUT, DELETE...)
    allow_headers=["*"],
)

# --- ĐỊNH NGHĨA CÁC API ENDPOINTS ---

# 1. Lấy danh sách sinh viên
@app.get("/api/students/", response_model=List[schemas.Student])
def read_students(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    students = crud.get_students(db, skip=skip, limit=limit)
    return students

# 2. Lấy thông tin 1 sinh viên
@app.get("/api/students/{student_id}", response_model=schemas.Student)
def read_student(student_id: str, db: Session = Depends(get_db)):
    db_student = crud.get_student(db, student_id=student_id)
    if db_student is None:
        raise HTTPException(status_code=404, detail="Student not found")
    return db_student

# 3. Thêm sinh viên mới
@app.post("/api/students/", response_model=schemas.Student, status_code=201)
def create_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    # Kiểm tra xem ID đã tồn tại chưa
    db_student = crud.get_student(db, student_id=student.student_id)
    if db_student:
        raise HTTPException(status_code=400, detail="Student ID already registered")
    return crud.create_student(db=db, student=student)

# 4. Cập nhật thông tin sinh viên
@app.put("/api/students/{student_id}", response_model=schemas.Student)
def update_student(student_id: str, student: schemas.StudentUpdate, db: Session = Depends(get_db)):
    db_student = crud.get_student(db, student_id=student_id)
    if db_student is None:
        raise HTTPException(status_code=404, detail="Student not found")
    return crud.update_student(db=db, student_id=student_id, student_update=student)

# 5. Xóa sinh viên
@app.delete("/api/students/{student_id}")
def delete_student(student_id: str, db: Session = Depends(get_db)):
    db_student = crud.get_student(db, student_id=student_id)
    if db_student is None:
        raise HTTPException(status_code=404, detail="Student not found")
    crud.delete_student(db=db, student_id=student_id)
    return {"message": "Student deleted successfully"}