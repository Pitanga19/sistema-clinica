from pydantic import BaseModel, Field
from typing import Optional, Annotated
from app.db.tables.professionals.schemas import ProfessionalRead, ProfessionalUpdate
from app.db.tables.users.schemas import UserRead, UserUpdate

class ProfessionalOut(ProfessionalRead):
    pass

class Staff(UserRead):
    professional: Optional[ProfessionalOut] = None

    class Config:
        from_attributes = True

class StaffCreate(Staff):
    pass

class StaffUpdate(UserUpdate, ProfessionalUpdate):
    pass

class StaffFilter(BaseModel):
    id: Optional[Annotated[int, Field(gt=0, lt=10000)]] = None
    username: Optional[Annotated[str, Field(min_length=3, max_length=30)]] = None
    full_name: Optional[Annotated[str, Field(min_length=3, max_length=120)]] = None
    is_professional: Optional[bool] = None
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None
    role_id: Optional[Annotated[int, Field(gt=0)]] = None
