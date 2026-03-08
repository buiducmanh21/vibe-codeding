from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Đường dẫn tới file database SQLite. 
# File student.db sẽ tự động được tạo ra ở thư mục backend.
SQLALCHEMY_DATABASE_URL = "sqlite:///./student.db"

# Tạo engine kết nối tới database
# check_same_thread=False là bắt buộc đối với SQLite trong FastAPI 
# để cho phép nhiều request truy cập cùng lúc.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Tạo một class SessionLocal. Mỗi instance của class này sẽ là một phiên làm việc (session) với database.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class để các model (bảng trong database) kế thừa
Base = declarative_base()

# Hàm dependency để cung cấp database session cho mỗi request của FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()