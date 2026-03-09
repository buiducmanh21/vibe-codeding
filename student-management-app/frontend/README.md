BÀI TẬP VIBE CODING - HỆ THỐNG QUẢN LÝ SINH VIÊN
👤 THÔNG TIN CÁ NHÂN
Họ và tên: Bùi Đức Mạnh
Mã sinh viên: 23001025
Lớp: KHDL19A
Học phần: Phát triển ứng dụng Web / Vibe Coding
🛠 TECH STACK & TOOLS
Tech Stack:
Backend: FastAPI (Python)
Frontend: React JS (Vite), Tailwind CSS
Database: SQLite
Libraries: SQLAlchemy (ORM), Pydantic, Axios, React Router DOM
Tools sử dụng:
AI Assistant: Google AI Studio (Hỗ trợ thiết kế kiến trúc, sinh code và fix bug)
IDE: Visual Studio Code / Cursor
Version Control: Git & GitHub
📝 NHẬT KÝ THỰC HIỆN (LOG)
Quá trình xây dựng hệ thống được chia làm 2 giai đoạn chính theo phương pháp Vibe Coding:
Giai đoạn 1: Xây dựng MVP (Phần 1)
Thiết kế Database: Khởi tạo bảng students với các trường cơ bản.
Xây dựng API: Hoàn thành các endpoint CRUD (Thêm, Xem, Sửa, Xóa) sinh viên.
Phát triển Frontend:
Tạo giao diện danh sách sinh viên dạng bảng.
Tạo form thêm/sửa sinh viên.
Kết nối API bằng Axios.
Fix Bug: Xử lý lỗi đồng bộ State trong React 19 khi sử dụng useEffect.
Giai đoạn 2: Mở rộng nghiệp vụ (Phần 2)
Thay đổi Database: Thêm bảng classes, thiết lập quan hệ 1-N (Một lớp có nhiều sinh viên).
Nâng cấp API:
Thêm logic tìm kiếm sinh viên theo tên.
Xây dựng endpoint thống kê (Tổng SV, GPA trung bình, SV theo ngành).
Tích hợp chức năng xuất dữ liệu ra file CSV.
Cập nhật UI/UX:
Thêm dropdown chọn lớp học trong Form.
Thêm thanh tìm kiếm thời gian thực.
Hiển thị các thẻ thống kê (Dashboard) trực quan.
Tối ưu hóa giao diện theo phong cách hiện đại (Pro UI).
📂 CẤU TRÚC DỮ LIỆU (DATA FILE)
Dữ liệu mẫu được quản lý thông qua file:
backend/seed.py: Script Python dùng để khởi tạo bảng và đổ dữ liệu mẫu (3 lớp học và 4 sinh viên ban đầu).
backend/student.db: File cơ sở dữ liệu SQLite (tự động sinh ra khi chạy ứng dụng).
🚀 HƯỚNG DẪN CHẠY ỨNG DỤNG
1. Chạy Backend:
code
Bash
cd backend
# Kích hoạt môi trường ảo (venv)
.\venv\Scripts\activate
# Cài đặt thư viện
pip install -r requirements.txt
# Khởi tạo dữ liệu mẫu
python seed.py
# Chạy server
uvicorn app.main:app --reload
API Documentation: http://127.0.0.1:8000/docs
2. Chạy Frontend:
code
Bash
cd frontend
# Cài đặt thư viện
npm install
# Chạy ứng dụng
npm run dev
Ứng dụng chạy tại: http://localhost:5173