from app.database import SessionLocal, engine
from app.models import Base, Student, Class

Base.metadata.drop_all(bind=engine) # Xóa hết bảng cũ
Base.metadata.create_all(bind=engine) # Tạo lại bảng mới

def seed_data():
    db = SessionLocal()
    try:
        # 1. Tạo dữ liệu lớp học mẫu
        classes = [
            Class(class_id="C01", class_name="Khoa học máy tính 1", advisor="Nguyen Van A"),
            Class(class_id="C02", class_name="Kỹ thuật phần mềm 2", advisor="Tran Thi B"),
            Class(class_id="C03", class_name="An toàn thông tin", advisor="Le Van C"),
        ]
        db.add_all(classes)
        db.commit()

        # 2. Tạo dữ liệu sinh viên mẫu (có class_id)
        students = [
            Student(student_id="SV001", name="Nguyen Van An", birth_year=2003, major="CS", gpa=3.8, class_id="C01"),
            Student(student_id="SV002", name="Tran Thi Binh", birth_year=2004, major="SE", gpa=3.5, class_id="C02"),
            Student(student_id="SV003", name="Le Van Cuong", birth_year=2003, major="CS", gpa=3.2, class_id="C01"),
            Student(student_id="SV004", name="Pham Minh Duc", birth_year=2005, major="IS", gpa=3.9, class_id="C03"),
        ]
        db.add_all(students)
        db.commit()
        print("Seed data thành công!")
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()