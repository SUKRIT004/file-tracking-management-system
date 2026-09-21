from datetime import datetime
from sqlalchemy.orm import Session

from app import models


def generate_file_number(db: Session):

    year = datetime.now().year

    last_file = (
        db.query(models.File)
        .order_by(models.File.id.desc())
        .first()
    )

    if last_file is None:
        next_number = 1
    else:
        next_number = last_file.id + 1

    return f"FIN-{year}-{next_number:06d}"

def generate_barcode_number(db: Session):

    last_file = (
        db.query(models.File)
        .order_by(models.File.id.desc())
        .first()
    )

    if last_file is None:
        next_number = 1
    else:
        next_number = last_file.id + 1

    return f"BC{next_number:08d}"
