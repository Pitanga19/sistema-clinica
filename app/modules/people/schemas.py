from pydantic import BaseModel, Field
from typing import Annotated, Optional
from app.db.tables.entities.schemas import EntityRead
from app.db.tables.plans.schemas import PlanRead
from app.db.tables.persons.schemas import PersonRead, PersonCreate, PersonUpdate
from app.db.tables.patients.schemas import PatientUpdate

class EntityOut(EntityRead):
    class Config:
        from_attributes = True

class PlanOut(PlanRead):
    entity: EntityOut

    class Config:
        from_attributes = True

class PatientOut(BaseModel):
    id: Annotated[int, Field(..., gt=0)]
    clinical_history_number: Annotated[int, Field(..., gt=0)]
    entity_code: Annotated[str, Field(..., min_length=3, max_length=120)]
    plan_id: Annotated[int, Field(..., gt=0)]
    plan: PlanOut
    
    class Config:
        from_attributes = True

class PeopleOut(PersonRead):
    patient: Optional[PatientOut] = None
    
    class Config:
        from_attributes = True

class PatientFromPerson(BaseModel):
    clinical_history_number: Annotated[int, Field(..., gt=0)]
    entity_code: Annotated[str, Field(..., min_length=3, max_length=120)]
    plan_id: Annotated[int, Field(..., gt=0)]

    class Config:
        from_attributes = True

class PeopleCreate(PersonCreate):
    id: Annotated[Optional[int], Field(..., gt=0)] = None
    patient: Optional[PatientFromPerson] = None

class PeopleUpdate(PersonUpdate, PatientUpdate):
    pass

class PeopleFilter(BaseModel):
    dni: Annotated[Optional[str], Field(min_length=1)] = None
    first_name: Annotated[Optional[str], Field(min_length=1)] = None
    last_name: Annotated[Optional[str], Field(min_length=1)] = None
    is_patient: Optional[bool] = None
    entity_id: Annotated[Optional[int], Field(gt=0)] = None
    plan_id: Annotated[Optional[int], Field(gt=0)] = None
