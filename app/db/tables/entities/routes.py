from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.session import get_db
from app.db.tables.entities.schemas import EntityRead, EntityCreate, EntityUpdate
from app.db.tables.entities import crud

router = APIRouter(
    prefix='/entities',
    tags=['Entities'],
)

@router.post('/', response_model=EntityRead, status_code=201)
async def create_entities(data: EntityCreate, db: AsyncSession=Depends(get_db)) -> EntityRead:
    return await crud.create(data, db)

@router.get('/by_id/{id}', response_model=EntityRead, status_code=200)
async def get_by_id(id: int, db: AsyncSession=Depends(get_db)) -> EntityRead | None:
    return await crud.get_by_id(id, db)

@router.get('/by_name/{name}', response_model=EntityRead, status_code=200)
async def get_by_name(name: str, db: AsyncSession=Depends(get_db)) -> EntityRead | None:
    return await crud.get_by_name(name, db)

@router.get('/', response_model=List[EntityRead], status_code=200)
async def get_all(db: AsyncSession=Depends(get_db)) -> List[EntityRead]:
    return await crud.get_all(db)

@router.patch('/{id}', response_model=EntityRead, status_code=200)
async def update(id: int, data: EntityUpdate, db: AsyncSession=Depends(get_db)) -> EntityRead | None:
    return await crud.update(id, data, db)

@router.delete('/{id}', status_code=204)
async def delete(id: int, db: AsyncSession=Depends(get_db)) -> None:
    return await crud.delete(id, db)
