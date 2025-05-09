from pydantic import BaseModel, Field
from typing import Annotated, Optional

class RoleAssignmentBase(BaseModel):
    role_id: Annotated[int, Field(..., gt=0)]
    assignment_id: Annotated[int, Field(..., gt=0)]
    
    model_config = {
        'from_attributes': True,
    }

class RoleAssignmentCreate(RoleAssignmentBase):
    pass

class RoleAssignmentRead(RoleAssignmentBase):
    pass
