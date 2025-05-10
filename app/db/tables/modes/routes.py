from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.session import get_db
from app.db.tables.modes.schemas import ModeRead, ModeCreate, ModeUpdate
from app.db.tables.modes import crud

router = APIRouter(
    prefix='/modes',
    tags=['Modes'],
)

@router.post('/', response_model=ModeRead, status_code=201)
async def create_mode(data: ModeCreate, db: AsyncSession=Depends(get_db)) -> ModeRead:
    return await crud.create(data, db)

@router.get('/by_id/{id}', response_model=ModeRead, status_code=200)
async def get_by_id(id: int, db: AsyncSession=Depends(get_db)) -> ModeRead | None:
    return await crud.get_by_id(id, db)

@router.get('/by_name/{name}', response_model=ModeRead, status_code=200)
async def get_by_name(name: str, db: AsyncSession=Depends(get_db)) -> ModeRead | None:
    return await crud.get_by_name(name, db)

@router.get('/', response_model=List[ModeRead], status_code=200)
async def get_all(db: AsyncSession=Depends(get_db)) -> List[ModeRead]:
    return await crud.get_all(db)

@router.put('/{id}', response_model=ModeRead, status_code=200)
async def update(id: int, data: ModeUpdate, db: AsyncSession=Depends(get_db)) -> ModeRead | None:
    return await crud.update(id, data, db)

@router.delete('/{id}', status_code=204)
async def delete(id: int, db: AsyncSession=Depends(get_db)) -> None:
    return await crud.delete(id, db)
