from pydantic import BaseModel, Field
from typing import Optional, Annotated
from app.db.tables.users.schemas import UserRead, UserCreate, UserUpdate
from app.db.tables.roles.schemas import RoleRead
from app.db.tables.professionals.schemas import ProfessionalRead, ProfessionalUpdate

class RoleOut(RoleRead):
    pass

class ProfessionalOut(ProfessionalRead):
    pass

class ProfessionalCreateData(BaseModel):
    signature: Annotated[str, Field(..., min_length=3, max_length=120)]
    national_registration: Annotated[Optional[int], Field(gt=99999, lt=1000000)] = None
    provincial_registration: Annotated[Optional[int], Field(gt=99999, lt=1000000)] = None

class Staff(UserRead):
    role: Optional[RoleOut] = None
    professional: Optional[ProfessionalOut] = None

    class Config:
        from_attributes = True

class StaffCreate(UserCreate):
    id: Annotated[Optional[int], Field(gt=0)] = None
    professional: Optional[ProfessionalCreateData] = None

class StaffUpdate(UserUpdate, ProfessionalUpdate):
    pass

class StaffFilter(BaseModel):
    file: Optional[Annotated[str, Field(min_length=1)]] = None
    username: Optional[Annotated[str, Field(min_length=1)]] = None
    full_name: Optional[Annotated[str, Field(min_length=1)]] = None
    is_professional: Optional[bool] = None
    is_active: Optional[bool] = None
    role_id: Optional[Annotated[int, Field(gt=0)]] = None
