from pydantic import BaseModel, Field
from typing import Annotated, Optional

class PlanBase(BaseModel):
    name: Annotated[str, Field(..., min_length=3, max_length=30)]
    entity_id: Annotated[int, Field(..., gt=0)]
    
    model_config = {
        'from_attributes': True,
    }

class PlanCreate(PlanBase):
    pass

class PlanRead(PlanBase):
    id: Annotated[int, Field(..., gt=0, lt=10000)]

class PlanUpdate(BaseModel):
    name: Annotated[Optional[str], Field(min_length=3, max_length=30)] = None
    entity_id: Annotated[Optional[int], Field(gt=0)] = None
