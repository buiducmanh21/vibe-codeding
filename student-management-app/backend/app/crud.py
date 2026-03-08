from sqlalchemy.orm import Session
from . import models, schemas

# 1. Lấy danh sách tất cả sinh viên
def get_students(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Student).offset(skip).limit(limit).all()

# 2. Lấy thông tin 1 sinh viên theo ID
def get_student(db: Session, student_id: str):
    return db.query(models.Student).filter(models.Student.student_id == student_id).first()

# 3. Thêm sinh viên mới
def create_student(db: Session, student: schemas.StudentCreate):
    # Tạo một đối tượng Model từ dữ liệu Schema gửi lên
    db_student = models.Student(
        student_id=student.student_id,
        name=student.name,
        birth_year=student.birth_year,
        major=student.major,
        gpa=student.gpa
    )
    db.add(db_student)      # Thêm vào session
    db.commit()             # Lưu thay đổi vào database
    db.refresh(db_student)  # Làm mới đối tượng để lấy dữ liệu mới nhất từ DB
    return db_student

# 4. Cập nhật thông tin sinh viên
def update_student(db: Session, student_id: str, student_update: schemas.StudentUpdate):
    db_student = get_student(db, student_id)
    if db_student:
        # model_dump(exclude_unset=True) giúp chỉ lấy những trường mà người dùng thực sự gửi lên để cập nhật
        update_data = student_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_student, key, value) # Cập nhật từng thuộc tính
        
        db.commit()
        db.refresh(db_student)
    return db_student

# 5. Xóa sinh viên
def delete_student(db: Session, student_id: str):
    db_student = get_student(db, student_id)
    if db_student:
        db.delete(db_student)
        db.commit()
    return db_student