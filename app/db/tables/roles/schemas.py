from pydantic import BaseModel, Field
from typing import Annotated, Optional

class RoleBase(BaseModel):
    name: Annotated[str, Field(..., min_length=3, max_length=30)]
    
    model_config = {
        'from_attributes': True,
    }

class RoleCreate(RoleBase):
    pass

class RoleRead(RoleBase):
    id: Annotated[int, Field(..., gt=0)]

class RoleUpdate(BaseModel):
    name: Annotated[Optional[str], Field(..., min_length=3, max_length=30)] = None
