from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.session import get_db
from app.db.tables.patients.schemas import PatientRead, PatientCreate, PatientUpdate
from app.db.tables.patients import crud

router = APIRouter(
    prefix='/patients',
    tags=['Patients'],
)

@router.post('/', response_model=PatientRead, status_code=201)
async def create_patient(data: PatientCreate, db: AsyncSession=Depends(get_db)) -> PatientRead:
    return await crud.create(data, db)

@router.get('/by_id/{id}', response_model=PatientRead, status_code=200)
async def get_by_id(id: int, db: AsyncSession=Depends(get_db)) -> PatientRead | None:
    return await crud.get_by_id(id, db)

@router.get('/by_person_id/{person_id}', response_model=PatientRead, status_code=200)
async def get_by_person_id(person_id: int, db: AsyncSession=Depends(get_db)) -> PatientRead | None:
    return await crud.get_by_person_id(person_id, db)

@router.get('/by_plan_id/{plan_id}', response_model=List[PatientRead], status_code=200)
async def get_by_plan_id(plan_id: int, db: AsyncSession=Depends(get_db)) -> List[PatientRead]:
    return await crud.get_by_plan_id(plan_id, db)

@router.get('/', response_model=List[PatientRead], status_code=200)
async def get_all(db: AsyncSession=Depends(get_db)) -> List[PatientRead]:
    return await crud.get_all(db)

@router.patch('/{id}', response_model=PatientRead, status_code=200)
async def update(id: int, data: PatientUpdate, db: AsyncSession=Depends(get_db)) -> PatientRead | None:
    return await crud.update(id, data, db)

@router.delete('/{id}', status_code=204)
async def delete(id: int, db: AsyncSession=Depends(get_db)) -> None:
    return await crud.delete(id, db)
