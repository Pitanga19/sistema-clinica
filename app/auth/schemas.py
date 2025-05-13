from pydantic import BaseModel, Field
from typing import Annotated

class Token(BaseModel):
    access_token: str
    token_type: str = Field(default="bearer")

class TokenData(BaseModel):
    id: Annotated[int, Field(...)]
    username: Annotated[str, Field(...)]
    is_active: Annotated[bool, Field(...)]
    is_superuser: Annotated[bool, Field(...)]
    role_id: Annotated[int, Field(...)]

class PasswordUpdate(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str
