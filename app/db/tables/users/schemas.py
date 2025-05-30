from pydantic import BaseModel, Field
from typing import Annotated, Optional

class UserBase(BaseModel):
    file: Annotated[str, Field(..., min_length=2, max_length=6)]
    username: Annotated[str, Field(..., min_length=3, max_length=30)]
    full_name: Annotated[str, Field(..., min_length=3, max_length=120)]
    is_professional: Annotated[bool, Field(default=True)]
    is_active: Annotated[bool, Field(default=True)]
    is_superuser: Annotated[bool, Field(default=False)]
    role_id: Annotated[int, Field(..., gt=0)]
    
    model_config = {
        'from_attributes': True,
    }

class UserCreate(UserBase):
    password: Annotated[str, Field(..., min_length=6, max_length=70)]

class UserRead(UserBase):
    id: Annotated[int, Field(..., gt=0)]

class UserUpdate(BaseModel):
    file: Annotated[Optional[str], Field(min_length=2, max_length=6)] = None
    username: Annotated[Optional[str], Field(min_length=3, max_length=30)] = None
    password: Annotated[Optional[str], Field(min_length=6, max_length=70)] = None
    full_name: Annotated[Optional[str], Field(min_length=3, max_length=120)] = None
    is_professional: Optional[bool] = None
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None
    role_id: Annotated[Optional[int], Field(gt=0)] = None

class UserInDB(UserRead):
    hashed_password: Annotated[str, Field(..., min_length=6, max_length=255)]
