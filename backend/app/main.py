from fastapi import FastAPI
from app.routers import users
from app.database import engine, Base
from app import models
from app.routers import departments
from app.routers import files
from app.routers import dashboard
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(files.router)
app.include_router(dashboard.router)
app.include_router(departments.router)
app.include_router(users.router)

@app.get("/")
def home():
    return {
        "message": "File Tracking API Running"
    }