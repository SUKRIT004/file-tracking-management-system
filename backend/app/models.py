from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base

class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True)

    file_number = Column(String, unique=True)

    file_name = Column(String)

    barcode = Column(String, unique=True)

    department = Column(String)

    current_holder = Column(String)

    status = Column(String)

    document_path = Column(String, nullable=True)

class Movement(Base):
    __tablename__ = "movements"

    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(Integer)
    from_holder = Column(String)
    to_holder = Column(String)
    from_department = Column(String)
    to_department = Column(String)
    remarks = Column(String)
    moved_at = Column(DateTime, default=datetime.utcnow)

class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, unique=True, nullable=False)

    description = Column(String, nullable=True)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String)

    username = Column(String, unique=True)

    email = Column(String, unique=True)

    password = Column(String)

    role = Column(String, default="Staff")
