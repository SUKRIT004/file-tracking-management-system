from pydantic import BaseModel

class FileCreate(BaseModel):
    file_name: str
    department: str
    current_holder: str
    status: str

class FileTransfer(BaseModel):
    to_holder: str
    to_department: str
    remarks: str

class FileUpdate(BaseModel):
    file_name: str
    department: str
    current_holder: str
    status: str
class DepartmentCreate(BaseModel):
    name: str
    description: str


class DepartmentResponse(DepartmentCreate):
    id: int

    class Config:
        from_attributes = True

class UserCreate(BaseModel):

    full_name: str

    username: str

    email: str

    password: str

    role: str


class UserLogin(BaseModel):

    username: str

    password: str
