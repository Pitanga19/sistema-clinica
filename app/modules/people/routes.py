from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.session import get_db
from app.modules.people import service
from app.modules.people.schemas import People, PeopleFilter
from app.db.tables.persons.schemas import PersonCreate, PersonUpdate
from app.db.tables.patients.schemas import PatientCreate, PatientUpdate

router = APIRouter(
    prefix='/people',
    tags=['People'],
)

@router.post('/patients', response_model=People, status_code=201)
async def create_patient_endpoint(person_data: PersonCreate, patient_data: PatientCreate, db: AsyncSession=Depends(get_db)) -> People:
    return await service.create_patient(person_data, patient_data, db)

@router.post('/non_patients', response_model=People, status_code=201)
async def create_non_patient_endpoint(person_data: PersonCreate, db: AsyncSession=Depends(get_db)) -> People:
    return await service.create_non_patient(person_data, db)

@router.post('/patients/{person_id}', response_model=People, status_code=201)
async def create_patient_from_person_endpoint(person_id: int, patient_data: PatientCreate, db: AsyncSession=Depends(get_db)) -> People:
    return await service.create_patient_from_person(person_id, patient_data, db)

@router.get('/', response_model=List[People], status_code=200)
async def get_people_endpoint(
    filter: PeopleFilter = Depends(),
    db: AsyncSession = Depends(get_db)
) -> List[People]:
    return await service.get_patient_filtered(filter, db)

@router.patch('/patients/{person_id}', response_model=People, status_code=200)
async def update_patient_endpoint(
    person_id: int,
    patient_id: int,
    person_data: PersonUpdate,
    patient_data: PatientUpdate,
    db: AsyncSession=Depends(get_db)
) -> People:
    return await service.update_patient(person_id, patient_id, person_data, patient_data, db)

@router.patch('/non_patients/{person_id}', response_model=People, status_code=200)
async def update_non_patient_endpoint(person_id: int, person_data: PersonUpdate, db: AsyncSession=Depends(get_db)) -> People:
    return await service.update_non_patient(person_id, person_data, db)

@router.delete('/patients/{person_id}', status_code=204)
async def delete_patient_endpoint(person_id: int, patient_id: int, db: AsyncSession=Depends(get_db)) -> None:
    return await service.delete_patient(person_id, patient_id, db)

@router.delete('/non_patients/{person_id}', status_code=204)
async def delete_non_patient_endpoint(person_id: int, db: AsyncSession=Depends(get_db)) -> None:
    return await service.delete_non_patient(person_id, db)
