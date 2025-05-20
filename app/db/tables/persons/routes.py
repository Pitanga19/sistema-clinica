from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.session import get_db
from app.db.tables.persons.schemas import PersonRead, PersonCreate, PersonUpdate
from app.db.tables.persons import crud

router = APIRouter(
    prefix='/persons',
    tags=['Persons'],
)

@router.post('/', response_model=PersonRead, status_code=201)
async def create_person(data: PersonCreate, db: AsyncSession=Depends(get_db)) -> PersonRead:
    return await crud.create(data, db)

@router.get('/by_id/{id}', response_model=PersonRead, status_code=200)
async def get_by_id(id: int, db: AsyncSession=Depends(get_db)) -> PersonRead | None:
    return await crud.get_by_id(id, db)

@router.get('/by_dni/{dni}', response_model=PersonRead, status_code=200)
async def get_by_dni(dni: str, db: AsyncSession=Depends(get_db)) -> PersonRead | None:
    return await crud.get_by_dni(dni, db)

@router.get('/by_last_name/{last_name}', response_model=List[PersonRead], status_code=200)
async def get_by_last_name(last_name: str, db: AsyncSession=Depends(get_db)) -> List[PersonRead]:
    return await crud.get_by_last_name(last_name, db)

@router.get('/patients', response_model=List[PersonRead], status_code=200)
async def get_patients(db: AsyncSession=Depends(get_db)) -> List[PersonRead]:
    return await crud.get_patients(db)

@router.get('/', response_model=List[PersonRead], status_code=200)
async def get_all(db: AsyncSession=Depends(get_db)) -> List[PersonRead]:
    return await crud.get_all(db)

@router.patch('/{id}', response_model=PersonRead, status_code=200)
async def update(id: int, data: PersonUpdate, db: AsyncSession=Depends(get_db)) -> PersonRead | None:
    return await crud.update(id, data, db)

@router.delete('/{id}', status_code=204)
async def delete(id: int, db: AsyncSession=Depends(get_db)) -> None:
    return await crud.delete(id, db)
