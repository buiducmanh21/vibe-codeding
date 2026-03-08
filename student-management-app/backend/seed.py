from app.database import SessionLocal, engine
from app.models import Base, Student

# Đảm bảo các bảng đã được tạo
Base.metadata.create_all(bind=engine)

def seed_data():
    # Mở kết nối database
    db = SessionLocal()
    try:
        # Kiểm tra xem database đã có dữ liệu chưa. Nếu có rồi thì không thêm nữa để tránh lỗi trùng ID.
        if db.query(Student).count() > 0:
            print("Database đã có dữ liệu. Bỏ qua bước đổ dữ liệu mẫu.")
            return

        # Danh sách dữ liệu mẫu
        dummy_students =[
            {"student_id": "SV001", "name": "Nguyễn Văn A", "birth_year": 2003, "major": "Khoa học máy tính", "gpa": 3.8},
            {"student_id": "SV002", "name": "Trần Thị B", "birth_year": 2004, "major": "Hệ thống thông tin", "gpa": 3.5},
            {"student_id": "SV003", "name": "Lê Văn C", "birth_year": 2003, "major": "Kỹ thuật phần mềm", "gpa": 3.2},
            {"student_id": "SV004", "name": "Phạm Thị D", "birth_year": 2005, "major": "Khoa học dữ liệu", "gpa": 3.9},
            {"student_id": "SV005", "name": "Hoàng Văn E", "birth_year": 2004, "major": "An toàn thông tin", "gpa": 3.1},
        ]

        # Thêm từng sinh viên vào session
        for student_data in dummy_students:
            student = Student(**student_data)
            db.add(student)

        # Lưu thay đổi vào database
        db.commit()
        print("Đã đổ dữ liệu mẫu (dummy data) thành công! 🎉")

    except Exception as e:
        print(f"Có lỗi xảy ra: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Đang tiến hành đổ dữ liệu...")
    seed_data()