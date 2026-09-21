# Backend

The API is built with FastAPI and uses PostgreSQL through SQLAlchemy.

## Setup

```powershell
Copy-Item .env.example .env
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Set `DATABASE_URL` and `SECRET_KEY` in `.env` before starting the API. Never commit that file.

Generated uploads, exports, and barcode images are runtime data and intentionally ignored by Git.
