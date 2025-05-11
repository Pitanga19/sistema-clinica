from pydantic import BaseModel, Field
from typing import Annotated, Optional

class ProfessionalBase(BaseModel):
    signature: Annotated[str, Field(..., min_length=3, max_length=120)]
    national_registration: Annotated[Optional[int], Field(gt=99999, lt=1000000)]
    provincial_registration: Annotated[Optional[int], Field(gt=99999, lt=1000000)]
    user_id: Annotated[int, Field(..., gt=0, lt=10000)]
    
    model_config = {
        'from_attributes': True,
    }

class ProfessionalCreate(BaseModel):
    signature: Annotated[str, Field(..., min_length=3, max_length=120)]
    national_registration: Annotated[Optional[int], Field(gt=99999, lt=1000000)] = None
    provincial_registration: Annotated[Optional[int], Field(gt=99999, lt=1000000)] = None
    user_id: Annotated[int, Field(..., gt=0, lt=10000)]
    
    model_config = {
        'from_attributes': True,
    }

class ProfessionalRead(ProfessionalBase):
    id: Annotated[int, Field(..., gt=0)]

class ProfessionalUpdate(BaseModel):
    signature: Annotated[Optional[str], Field(min_length=3, max_length=120)] = None
    national_registration: Annotated[Optional[int], Field(gt=99999, lt=1000000)] = None
    provincial_registration: Annotated[Optional[int], Field(gt=99999, lt=1000000)] = None
    user_id: Annotated[Optional[int], Field(gt=0, lt=10000)] = None
