from pydantic import BaseModel, Field
from typing import Annotated, Optional

class AssignmentBase(BaseModel):
    name: Annotated[str, Field(..., min_length=3, max_length=30)]
    
    model_config = {
        'from_attributes': True,
    }

class AssignmentCreate(AssignmentBase):
    pass

class AssignmentRead(AssignmentBase):
    id: Annotated[int, Field(..., gt=0)]

class AssignmentUpdate(BaseModel):
    name: Annotated[Optional[str], Field(..., min_length=3, max_length=30)] = None
