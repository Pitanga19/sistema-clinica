from pydantic import BaseModel, Field
from typing import Annotated, Optional

class PersonBase(BaseModel):
    id: Annotated[int, Field(..., gt=1000000, lt=99999999)]
    first_name: Annotated[str, Field(..., min_length=3, max_length=60)]
    last_name: Annotated[str, Field(..., min_length=3, max_length=60)]
    phone_1: Annotated[str, Field(..., min_length=10, max_length=15)]
    phone_2: Annotated[Optional[str], Field(min_length=10, max_length=15)] = None
    email: Annotated[Optional[str], Field(min_length=3, max_length=120)] = None
    address: Annotated[str, Field(..., min_length=3, max_length=120)]
    is_patient: Annotated[bool, Field(default=False)]
    
    model_config = {
        'from_attributes': True,
    }

class PersonCreate(PersonBase):
    pass

class PersonRead(PersonBase):
    pass

class PersonUpdate(BaseModel):
    id: Annotated[Optional[int], Field(ge=1000000, le=99999999)] = None
    first_name: Annotated[Optional[str], Field(min_length=3, max_length=60)] = None
    last_name: Annotated[Optional[str], Field(min_length=3, max_length=60)] = None
    phone_1: Annotated[Optional[str], Field(min_length=10, max_length=15)] = None
    phone_2: Annotated[Optional[str], Field(min_length=10, max_length=15)] = None
    email: Annotated[Optional[str], Field(min_length=3, max_length=120)] = None
    address: Annotated[Optional[str], Field(min_length=3, max_length=120)] = None
    is_patient: Optional[bool] = None
    