from pydantic import BaseModel, Field
from typing import Annotated, Optional

class EntityBase(BaseModel):
    name: Annotated[str, Field(..., min_length=3, max_length=30)]
    
    model_config = {
        'from_attributes': True,
    }

class EntityCreate(EntityBase):
    pass

class EntityRead(EntityBase):
    id: Annotated[int, Field(..., gt=0)]

class EntityUpdate(BaseModel):
    name: Annotated[Optional[str], Field(..., min_length=3, max_length=30)] = None
