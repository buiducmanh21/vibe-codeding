from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from typing import List, Optional
import csv
import io

from . import crud, models, schemas
from .database import engine, get_db

# Tạo bảng trong database
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Student Management System Pro")

# Cấu hình CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- TRANG CHỦ (ROOT) ---
@app.get("/")
def read_root():
    return {
        "message": "Welcome to Student Management API",
        "documentation": "/docs",
        "status": "Running"
    }

# --- API CHO LỚP HỌC (CLASSES) ---

@app.get("/api/classes/", response_model=List[schemas.Class])
def read_classes(db: Session = Depends(get_db)):
    return crud.get_classes(db)

@app.post("/api/classes/", response_model=schemas.Class)
def create_class(classroom: schemas.ClassCreate, db: Session = Depends(get_db)):
    db_class = crud.get_class(db, class_id=classroom.class_id)
    if db_class:
        raise HTTPException(status_code=400, detail="Class ID already exists")
    return crud.create_class(db=db, classroom=classroom)

# --- API CHO SINH VIÊN (STUDENTS) ---

@app.get("/api/students/", response_model=List[schemas.Student])
def read_students(
    search: Optional[str] = Query(None), 
    db: Session = Depends(get_db)
):
    # Tìm kiếm sinh viên theo tên (Yêu cầu 3)
    return crud.get_students(db, search=search)

@app.get("/api/students/{student_id}", response_model=schemas.Student)
def read_student(student_id: str, db: Session = Depends(get_db)):
    db_student = crud.get_student(db, student_id=student_id)
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    return db_student

@app.post("/api/students/", response_model=schemas.Student)
def create_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    # Kiểm tra lớp học có tồn tại không (Yêu cầu 2)
    db_class = crud.get_class(db, class_id=student.class_id)
    if not db_class:
        raise HTTPException(status_code=400, detail="Class ID does not exist")
    
    db_student = crud.get_student(db, student_id=student.student_id)
    if db_student:
        raise HTTPException(status_code=400, detail="Student ID already exists")
    return crud.create_student(db=db, student=student)

@app.put("/api/students/{student_id}", response_model=schemas.Student)
def update_student(student_id: str, student: schemas.StudentUpdate, db: Session = Depends(get_db)):
    return crud.update_student(db=db, student_id=student_id, student_update=student)

@app.delete("/api/students/{student_id}")
def delete_student(student_id: str, db: Session = Depends(get_db)):
    crud.delete_student(db=db, student_id=student_id)
    return {"message": "Deleted"}

# --- THỐNG KÊ (STATISTICS - Yêu cầu 4) ---

@app.get("/api/stats/")
def get_stats(db: Session = Depends(get_db)):
    total_students = db.query(models.Student).count()
    avg_gpa = db.query(func.avg(models.Student.gpa)).scalar() or 0
    
    # Số sinh viên theo ngành
    major_stats = db.query(
        models.Student.major, func.count(models.Student.student_id)
    ).group_by(models.Student.major).all()
    
    return {
        "total_students": total_students,
        "average_gpa": round(avg_gpa, 2),
        "students_by_major": {major: count for major, count in major_stats}
    }

# --- XUẤT CSV (EXPORT CSV - Yêu cầu 5) ---

@app.get("/api/export-csv/")
def export_csv(db: Session = Depends(get_db)):
    students = db.query(models.Student).all()
    
    output = io.StringIO()
    writer = csv.writer(output)
    
    # Viết tiêu đề cột
    writer.writerow(["Student ID", "Name", "Birth Year", "Major", "GPA", "Class ID"])
    
    # Viết dữ liệu
    for s in students:
        writer.writerow([s.student_id, s.name, s.birth_year, s.major, s.gpa, s.class_id])
    
    output.seek(0)
    
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=students.csv"}
    )