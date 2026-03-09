from sqlalchemy.orm import Session
from . import models, schemas

# --- CRUD CHO CLASS ---
def get_classes(db: Session):
    return db.query(models.Class).all()

def get_class(db: Session, class_id: str):
    return db.query(models.Class).filter(models.Class.class_id == class_id).first()

def create_class(db: Session, classroom: schemas.ClassCreate):
    db_class = models.Class(**classroom.model_dump())
    db.add(db_class)
    db.commit()
    db.refresh(db_class)
    return db_class

# --- CRUD CHO STUDENT (CẬP NHẬT) ---
def get_students(db: Session, skip: int = 0, limit: int = 100, search: str = None):
    query = db.query(models.Student)
    if search:
        # Yêu cầu 3: Tìm kiếm theo tên
        query = query.filter(models.Student.name.contains(search))
    return query.offset(skip).limit(limit).all()

def get_student(db: Session, student_id: str):
    return db.query(models.Student).filter(models.Student.student_id == student_id).first()

def create_student(db: Session, student: schemas.StudentCreate):
    db_student = models.Student(**student.model_dump())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

def update_student(db: Session, student_id: str, student_update: schemas.StudentUpdate):
    db_student = get_student(db, student_id)
    if db_student:
        update_data = student_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_student, key, value)
        db.commit()
        db.refresh(db_student)
    return db_student

def delete_student(db: Session, student_id: str):
    db_student = get_student(db, student_id)
    if db_student:
        db.delete(db_student)
        db.commit()
    return db_student