from pydantic import BaseModel, Field
from typing import Annotated, Optional

class PatientBase(BaseModel):
    clinical_history_number: Annotated[int, Field(..., gt=0)]
    entity_code: Annotated[str, Field(..., min_length=3, max_length=120)]
    plan_id: Annotated[int, Field(..., gt=0)]
    person_id: Annotated[int, Field(..., gt=1000000, lt=99999999)]
    
    model_config = {
        'from_attributes': True,
    }

class PatientCreate(PatientBase):
    pass

class PatientRead(PatientBase):
    id: Annotated[int, Field(..., gt=0)]

class PatientUpdate(BaseModel):
    clinical_history_number: Annotated[int, Field(..., min_length=3, max_length=120)]
    entity_code: Annotated[Optional[str], Field(min_length=3, max_length=120)] = None
    plan_id: Annotated[Optional[int], Field(gt=0)] = None
    person_id: Annotated[Optional[int], Field(gt=1000000, lt=99999999)] = None
