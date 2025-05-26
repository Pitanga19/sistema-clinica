from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.session import get_db
from app.db.tables.plans.schemas import PlanRead, PlanCreate, PlanUpdate
from app.db.tables.plans import crud

router = APIRouter(
    prefix='/plans',
    tags=['Plans'],
)

@router.post('/', response_model=PlanRead, status_code=201)
async def create_plan(data: PlanCreate, db: AsyncSession=Depends(get_db)) -> PlanRead:
    return await crud.create(data, db)

@router.get('/by-id/{id}', response_model=PlanRead, status_code=200)
async def get_by_id(id: int, db: AsyncSession=Depends(get_db)) -> PlanRead | None:
    return await crud.get_by_id(id, db)

@router.get('/by-entity-id/{entity_id}', response_model=List[PlanRead], status_code=200)
async def get_by_entity_id(entity_id: int, db: AsyncSession=Depends(get_db)) -> List[PlanRead]:
    return await crud.get_by_entity_id(entity_id, db)

@router.get('/', response_model=List[PlanRead], status_code=200)
async def get_all(db: AsyncSession=Depends(get_db)) -> List[PlanRead]:
    return await crud.get_all(db)

@router.patch('/{id}', response_model=PlanRead, status_code=200)
async def update(id: int, data: PlanUpdate, db: AsyncSession=Depends(get_db)) -> PlanRead | None:
    return await crud.update(id, data, db)

@router.delete('/{id}', status_code=204)
async def delete(id: int, db: AsyncSession=Depends(get_db)) -> None:
    return await crud.delete(id, db)
