from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from fastapi.responses import FileResponse
from openpyxl import Workbook
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet

import shutil
import os

from app import crud, schemas
from app.database import get_db
from app.auth.auth import get_current_user

router = APIRouter()


# ==========================
# CREATE FILE
# ==========================
@router.post("/files")
def create_file(
    file: schemas.FileCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return crud.create_file(db, file)


# ==========================
# GET ALL FILES
# ==========================
@router.get("/files")
def get_all_files(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return crud.get_files(db)


# ==========================
# GET FILE BY BARCODE
# ==========================
@router.get("/files/barcode/{barcode}")
def get_file_by_barcode(
    barcode: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    file = crud.get_file_by_barcode(db, barcode)

    if file is None:
        raise HTTPException(
            status_code=404,
            detail="Barcode not found"
        )

    return file


# ==========================
# GET FILE
# ==========================
@router.get("/files/{file_id}")
def get_file(
    file_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    file = crud.get_file(db, file_id)

    if file is None:
        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    return file


# ==========================
# FILE HISTORY
# ==========================
@router.get("/files/{file_id}/history")
def get_history(
    file_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return crud.get_file_history(db, file_id)


# ==========================
# TRANSFER FILE
# ==========================
@router.post("/files/{file_id}/transfer")
def transfer_file(
    file_id: int,
    transfer: schemas.FileTransfer,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    file = crud.transfer_file(db, file_id, transfer)

    if file is None:
        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    return file


# ==========================
# UPDATE FILE
# ==========================
@router.put("/files/{file_id}")
def update_file(
    file_id: int,
    file: schemas.FileUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    updated = crud.update_file(db, file_id, file)

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    return updated


# ==========================
# ARCHIVE FILE
# ==========================
@router.put("/files/{file_id}/archive")
def archive(
    file_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return crud.archive_file(db, file_id)


# ==========================
# DELETE FILE
# ==========================
@router.delete("/files/{file_id}")
def delete_file(
    file_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return crud.delete_file(db, file_id)


# ==========================
# UPLOAD DOCUMENT
# ==========================
@router.post("/files/{file_id}/upload")
def upload_document(
    file_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    upload_dir = "uploads"

    os.makedirs(upload_dir, exist_ok=True)

    file_path = os.path.join(upload_dir, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    db_file = crud.get_file(db, file_id)

    if db_file is None:
        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    db_file.document_path = file_path

    db.commit()
    db.refresh(db_file)

    return {
        "message": "Document uploaded successfully",
        "path": file_path,
    }


# ==========================
# EXPORT EXCEL
# ==========================
@router.get("/files/export/excel")
def export_excel(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    files = crud.get_files(db)

    wb = Workbook()
    ws = wb.active
    ws.title = "Files"

    ws.append([
        "File Number",
        "File Name",
        "Department",
        "Holder",
        "Status",
        "Barcode",
    ])

    for file in files:
        ws.append([
            file.file_number,
            file.file_name,
            file.department,
            file.current_holder,
            file.status,
            file.barcode,
        ])

    os.makedirs("exports", exist_ok=True)

    path = "exports/files.xlsx"

    wb.save(path)

    return FileResponse(
        path,
        filename="File_Report.xlsx"
    )


# ==========================
# EXPORT PDF
# ==========================
@router.get("/files/export/pdf")
def export_pdf(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    files = crud.get_files(db)

    os.makedirs("exports", exist_ok=True)

    pdf_path = "exports/File_Report.pdf"

    doc = SimpleDocTemplate(pdf_path)

    styles = getSampleStyleSheet()

    elements = []

    elements.append(
        Paragraph(
            "<b>FILE TRACKING SYSTEM REPORT</b>",
            styles["Title"]
        )
    )

    data = [[
        "File No",
        "Name",
        "Department",
        "Holder",
        "Status",
    ]]

    for file in files:
        data.append([
            file.file_number,
            file.file_name,
            file.department,
            file.current_holder,
            file.status,
        ])

    table = Table(data)

    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
        ("GRID", (0, 0), (-1, -1), 1, colors.black),
        ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 8),
    ]))

    elements.append(table)

    doc.build(elements)

    return FileResponse(
        pdf_path,
        filename="File_Report.pdf"
    )