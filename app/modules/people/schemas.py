from pydantic import BaseModel, Field
from typing import Annotated, Optional
from app.db.tables.persons.schemas import PersonBase


class EntityOut(BaseModel):
    name: Annotated[str, Field(..., min_length=1)]

    class Config:
        orm_mode = True
        from_attributes = True


class PlanOut(BaseModel):
    name: Annotated[str, Field(..., min_length=1)]
    entity: EntityOut

    class Config:
        orm_mode = True
        from_attributes = True

class PatientOut(BaseModel):
    id: Annotated[int, Field(..., gt=0)]
    clinical_history_number: Annotated[int, Field(..., gt=0)]
    entity_code: Annotated[str, Field(..., min_length=3, max_length=120)]
    plan: PlanOut
    
    class Config:
        orm_mode = True
        from_attributes = True

class PatientComplete(PersonBase):
    patient: PatientOut
    
    class Config:
        orm_mode = True
        from_attributes = True
