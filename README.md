# 📂 File Tracker

> A modern, end-to-end workspace for tracking files, ownership, movement, and records—without losing the story behind the document.

[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react&logoColor=white)](#tech-stack)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white)](#tech-stack)
[![Database](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql&logoColor=white)](#tech-stack)
[![Git Safe](https://img.shields.io/badge/Git-Secrets%20Excluded-success?logo=git&logoColor=white)](#security)

## Why File Tracker?

Documents move quickly. Accountability should not disappear with them.

File Tracker gives teams one place to register files, assign responsibility, transfer custody, inspect movement history, and generate reports. The interface is built for day-to-day use; the API provides a clean foundation for integrations and future growth.

## Highlights

- **Live dashboard** — quick visibility into file activity and department-level data.
- **File lifecycle management** — create, edit, archive, delete, and search records.
- **Chain of custody** — transfer files between holders and departments with an auditable history.
- **Barcode lookup** — locate a record using its barcode.
- **Attachments and exports** — upload documents and export reports to Excel or PDF.
- **Role-aware access** — JWT-based sign-in protects authenticated routes.
- **Polished UI** — responsive React interface with reusable components, tables, charts, and notifications.

## Tech stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS, React Router, Axios, Recharts |
| Backend | FastAPI, SQLAlchemy, Pydantic, Uvicorn |
| Database | PostgreSQL |
| Authentication | JWT, password hashing |

## Project structure

```text
File Tracker/
├── backend/
│   ├── app/
│   │   ├── auth/          # JWT and password-security helpers
│   │   ├── routers/       # API route modules
│   │   ├── services/      # Barcode and number-generation services
│   │   └── main.py        # FastAPI application entry point
│   ├── .env.example       # Safe configuration template
│   └── requirements.txt
├── frontend-v2/
│   ├── src/
│   │   ├── components/    # Layout, dashboard, file, and UI components
│   │   ├── pages/         # Application screens
│   │   └── services/      # API client
│   └── package.json
├── .gitignore
└── README.md
```

## Quick start

### 1. Configure the backend

```powershell
cd backend
Copy-Item .env.example .env
```

Edit `backend/.env` with your own database connection and JWT secret. Keep this file local—it is ignored by Git.

### 2. Run the API

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API starts at `http://127.0.0.1:8000`.

### 3. Run the frontend

Open a second terminal:

```powershell
cd frontend-v2
npm install
npm run dev
```

The Vite development server will display the local URL in the terminal. It is configured to use the local API at `http://127.0.0.1:8000`.

## Useful commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the frontend development server |
| `npm run lint` | Check frontend code quality |
| `npm run build` | Create an optimized frontend production build |
| `uvicorn app.main:app --reload` | Start the backend with automatic reloads |

## API capabilities

The FastAPI backend includes endpoints for:

- User registration and login
- Dashboard summaries
- Department management
- File creation, search, updates, archival, and deletion
- File transfers and movement history
- Barcode lookup
- File uploads and Excel/PDF report exports

Interactive API documentation is available locally at `/docs` while the backend is running.

## Security

- Database and JWT configuration are loaded from environment variables.
- `.env` files, private keys, dependency folders, build output, runtime uploads, exports, barcode images, and archives are excluded from Git.
- Only `backend/.env.example` is versioned, and it contains placeholders—not private values.

Before publishing, review staged changes with:

```powershell
git status
git diff --cached
```

## Roadmap

- [ ] Deployment configuration
- [ ] Automated backend tests
- [ ] Configurable frontend API URL for deployed environments
- [ ] Role and permission management UI

---

Built to make every file movement traceable, searchable, and accountable.
=======
# file-tracking-management-system
Digitizing how organizations track, manage, and move physical files. Built with React, FastAPI &amp; PostgreSQL.
>>>>>>> c785b0f649650650eeac5998f68b3f99d59936df
