from pydantic import BaseModel, Field
from typing import Optional, Annotated
from app.db.tables.users.schemas import UserRead, UserCreate, UserUpdate
from app.db.tables.roles.schemas import RoleRead
from app.db.tables.professionals.schemas import ProfessionalRead, ProfessionalCreate, ProfessionalUpdate

class RoleOut(RoleRead):
    pass

class ProfessionalOut(ProfessionalRead):
    pass

class Staff(UserRead):
    role: Optional[RoleOut] = None
    professional: Optional[ProfessionalOut] = None

    class Config:
        from_attributes = True

class StaffCreate(UserCreate):
    id: Annotated[Optional[int], Field(gt=0)] = None
    professional: Optional[ProfessionalCreate] = None

class StaffUpdate(UserUpdate, ProfessionalUpdate):
    pass

class StaffFilter(BaseModel):
    file: Optional[Annotated[str, Field(min_length=1)]] = None
    username: Optional[Annotated[str, Field(min_length=1)]] = None
    full_name: Optional[Annotated[str, Field(min_length=1)]] = None
    is_professional: Optional[bool] = None
    is_active: Optional[bool] = None
    role_id: Optional[Annotated[int, Field(gt=0)]] = None
