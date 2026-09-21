from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from sqlalchemy import func
from app.auth.auth import create_access_token
from app.services.number_generator import (


    generate_file_number,
    generate_barcode_number
)
from app.auth.security import (
    hash_password,
    verify_password,
)
from app.auth.security import (
    hash_password,
    verify_password,
)

from app.services.barcode_service import generate_barcode
from app import models, schemas


# ==========================
# CREATE FILE
# ==========================
def create_file(db: Session, file: schemas.FileCreate):

    # Generate File Number
    file_number = generate_file_number(db)

    # Generate Barcode
    barcode = generate_barcode_number(db)

    # Generate Barcode Image
    barcode_image = generate_barcode(barcode)

    db_file = models.File(
        file_number=file_number,
        file_name=file.file_name,
        barcode=barcode,
        department=file.department,
        current_holder=file.current_holder,
        status=file.status
    )

    db.add(db_file)

    try:
        db.commit()
        db.refresh(db_file)

        return {
            "message": "File Created Successfully",
            "file": db_file,
            "barcode_image": barcode_image
        }

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=409,
            detail="File number or barcode already exists."
        )


# ==========================
# GET ALL FILES
# ==========================
def get_files(db: Session):
    return db.query(models.File).all()


# ==========================
# GET FILE BY ID
# ==========================
def get_file(db: Session, file_id: int):
    return (
        db.query(models.File)
        .filter(models.File.id == file_id)
        .first()
    )


# ==========================
# GET FILE BY BARCODE
# ==========================
def get_file_by_barcode(db: Session, barcode: str):
    return (
        db.query(models.File)
        .filter(models.File.barcode == barcode)
        .first()
    )


# ==========================
# TRANSFER FILE
# ==========================
def transfer_file(db: Session, file_id: int, transfer: schemas.FileTransfer):

    file = (
        db.query(models.File)
        .filter(models.File.id == file_id)
        .first()
    )

    if file is None:
        return None

    movement = models.Movement(
        file_id=file.id,
        from_holder=file.current_holder,
        to_holder=transfer.to_holder,
        from_department=file.department,
        to_department=transfer.to_department,
        remarks=transfer.remarks
    )

    # Update Current File Status
    file.current_holder = transfer.to_holder
    file.department = transfer.to_department

    db.add(movement)

    try:
        db.commit()
        db.refresh(file)
        return file

    except Exception:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail="File transfer failed."
        )


# ==========================
# FILE HISTORY
# ==========================
def get_file_history(db: Session, file_id: int):
    return (
        db.query(models.Movement)
        .filter(models.Movement.file_id == file_id)
        .order_by(models.Movement.moved_at.asc())
        .all()
    )


{
  "total_files": 2,
  "active_files": 2,
  "archived_files": 0
}


{
  "total_files": 2,
  "active_files": 2,
  "archived_files": 0,
  "department_stats": [...]
}

def get_dashboard_data(db: Session):

    total_files = db.query(models.File).count()

    active_files = (
        db.query(models.File)
        .filter(models.File.status == "Active")
        .count()
    )

    archived_files = (
        db.query(models.File)
        .filter(models.File.status == "Archived")
        .count()
    )

    department_stats = (
        db.query(
            models.File.department,
            func.count(models.File.id)
        )
        .group_by(models.File.department)
        .all()
    )

    department_stats = [
        {
            "department": dept,
            "count": count
        }
        for dept, count in department_stats
    ]

    return {
        "total_files": total_files,
        "active_files": active_files,
        "archived_files": archived_files,
        "department_stats": department_stats
    }
def update_file(
    db: Session,
    file_id: int,
    file_update: schemas.FileUpdate
):
    file = (
        db.query(models.File)
        .filter(models.File.id == file_id)
        .first()
    )

    if file is None:
        return None

    file.file_name = file_update.file_name
    file.department = file_update.department
    file.current_holder = file_update.current_holder
    file.status = file_update.status

    db.commit()
    db.refresh(file)

    return file
def archive_file(db, file_id):

    file = db.query(models.File)\
        .filter(models.File.id == file_id)\
        .first()

    file.status = "Archived"

    db.commit()

    return file
def delete_file(db: Session, file_id: int):

    file = db.query(models.File).filter(
        models.File.id == file_id
    ).first()

    if not file:
        return None

    db.delete(file)

    db.commit()

    return True
def create_department(db, department):
    dept = models.Department(**department.dict())

    db.add(dept)

    db.commit()

    db.refresh(dept)

    return dept


def get_departments(db):
    return db.query(models.Department).all()


def update_department(db, dept_id, department):

    dept = db.query(models.Department)\
        .filter(models.Department.id == dept_id)\
        .first()

    dept.name = department.name
    dept.description = department.description

    db.commit()

    db.refresh(dept)

    return dept


def delete_department(db, dept_id):

    dept = db.query(models.Department)\
        .filter(models.Department.id == dept_id)\
        .first()

    db.delete(dept)

    db.commit()

    return True

from fastapi import HTTPException

def create_user(db, user):

    existing = db.query(models.User).filter(
        (models.User.username == user.username) |
        (models.User.email == user.email)
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Username or Email already exists"
        )

    db_user = models.User(
        full_name=user.full_name,
        username=user.username,
        email=user.email,
        password=hash_password(user.password),
        role=user.role,
    )

    db.add(db_user)

    db.commit()

    db.refresh(db_user)

    return db_user

def login_user(db, login):

    user = db.query(models.User).filter(
        models.User.username == login.username
    ).first()

    if not user:
        return None

    if not verify_password(
        login.password,
        user.password
    ):
        return None

    token = create_access_token({

        "sub": user.username,

        "role": user.role,

    })

    return {

        "access_token": token,

        "token_type": "bearer",

        "role": user.role,

        "username": user.username,

    }