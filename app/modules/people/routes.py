from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.session import get_db
from app.modules.people import service
from app.modules.people.schemas import People, PeopleUpdate, PeopleFilter

router = APIRouter(
    prefix='/people',
    tags=['People'],
)

@router.post('/', response_model=People, status_code=201)
async def create_endpoint(
    data: People,
    db: AsyncSession=Depends(get_db)
) -> People:
    return await service.create(data, db)

@router.get('/{person_id}', response_model=People, status_code=200)
async def get_by_person_id_endpoint(
    person_id: int,
    db: AsyncSession = Depends(get_db)
) -> People:
    return await service.get_by_person_id(person_id, db)

@router.get('/', response_model=List[People], status_code=200)
async def get_people_endpoint(
    filter: PeopleFilter = Depends(),
    db: AsyncSession = Depends(get_db)
) -> List[People]:
    return await service.get_filtered(filter, db)

@router.patch('/patients/{person_id}', response_model=People, status_code=200)
async def update_patient_endpoint(
    person_id: int,
    data: PeopleUpdate,
    db: AsyncSession=Depends(get_db)
) -> People:
    return await service.update_patient(person_id, data, db)

@router.delete('/remove-patient/{person_id}', status_code=204)
async def remove_patient_endpoint(
    person_id: int,
    db: AsyncSession=Depends(get_db)
) -> None:
    return await service.remove_patient(person_id, db)

@router.delete('/{person_id}', status_code=204)
async def delete_endpoint(
    person_id: int,
    db: AsyncSession=Depends(get_db)
) -> None:
    return await service.delete(person_id, db)
