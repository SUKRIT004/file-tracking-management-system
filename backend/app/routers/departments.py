from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

router = APIRouter(prefix="/departments", tags=["Departments"])


@router.get("")
def get_departments(db: Session = Depends(get_db)):
    return crud.get_departments(db)


@router.post("")
def create_department(
    department: schemas.DepartmentCreate,
    db: Session = Depends(get_db)
):
    return crud.create_department(db, department)


@router.put("/{dept_id}")
def update_department(
    dept_id: int,
    department: schemas.DepartmentCreate,
    db: Session = Depends(get_db)
):
    return crud.update_department(db, dept_id, department)


@router.delete("/{dept_id}")
def delete_department(
    dept_id: int,
    db: Session = Depends(get_db)
):
    return crud.delete_department(db, dept_id)