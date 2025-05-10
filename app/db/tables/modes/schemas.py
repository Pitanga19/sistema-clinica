from pydantic import BaseModel, Field
from typing import Annotated, Optional

class ModeBase(BaseModel):
    name: Annotated[str, Field(..., min_length=3, max_length=30)]
    
    model_config = {
        'from_attributes': True,
    }

class ModeCreate(ModeBase):
    pass

class ModeRead(ModeBase):
    id: Annotated[int, Field(..., gt=0)]

class ModeUpdate(BaseModel):
    name: Annotated[Optional[str], Field(..., min_length=3, max_length=30)] = None
