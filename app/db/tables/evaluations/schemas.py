from pydantic import BaseModel, Field, field_validator
from typing import Annotated, Optional
from datetime import datetime

class EvaluationBase(BaseModel):
    report: Annotated[str, Field(..., min_length=3, max_length=1200)]
    closed_at: Annotated[Optional[datetime], Field()] = None
    patient_id: Annotated[int, Field(..., gt=0)]
    professional_id: Annotated[int, Field(..., gt=0)]
    mode_id: Annotated[int, Field(..., gt=0)]
    
    @field_validator("closed_at", mode="before")
    @classmethod
    def parse_closed_at(cls, value):
        if value in (None, ""):
            return None
        if isinstance(value, datetime):
            return value
        try:
            return datetime.strptime(value, "%d/%m/%y %H:%M")
        except ValueError:
            raise ValueError("closed_at debe tener formato DD/MM/AA HH:MM")
    
    model_config = {
        'from_attributes': True,
    }

class EvaluationCreate(EvaluationBase):
    pass

class EvaluationRead(EvaluationBase):
    id: Annotated[int, Field(..., gt=0)]
    
    def model_dump(self, **kwargs):
        data = super().model_dump(**kwargs)
        if self.closed_at:
            data["closed_at"] = self.closed_at.strftime("%d/%m/%y %H:%M")
        return data


class EvaluationUpdate(BaseModel):
    report: Annotated[Optional[str], Field(min_length=3, max_length=1200)] = None
    closed_at: Annotated[Optional[datetime], Field()] = None
    patient_id: Annotated[Optional[int], Field(gt=0)] = None
    professional_id: Annotated[Optional[int], Field(gt=0)] = None
    mode_id: Annotated[Optional[int], Field(gt=0)] = None
