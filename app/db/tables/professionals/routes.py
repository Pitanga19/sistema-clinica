from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.session import get_db
from app.db.tables.professionals.schemas import ProfessionalRead, ProfessionalCreate, ProfessionalUpdate
from app.db.tables.professionals import crud

router = APIRouter(
    prefix='/professionals',
    tags=['Professionals'],
)

@router.post('/', response_model=ProfessionalRead, status_code=201)
async def create_professional(data: ProfessionalCreate, db: AsyncSession=Depends(get_db)) -> ProfessionalRead:
    return await crud.create(data, db)

@router.get('/by_id/{id}', response_model=ProfessionalRead, status_code=200)
async def get_by_id(id: int, db: AsyncSession=Depends(get_db)) -> ProfessionalRead | None:
    return await crud.get_by_id(id, db)

@router.get('/by_user_id/{user_id}', response_model=ProfessionalRead, status_code=200)
async def get_by_user_id(user_id: int, db: AsyncSession=Depends(get_db)) -> ProfessionalRead | None:
    return await crud.get_by_user_id(user_id, db)

@router.get('/', response_model=List[ProfessionalRead], status_code=200)
async def get_all(db: AsyncSession=Depends(get_db)) -> List[ProfessionalRead]:
    return await crud.get_all(db)

@router.patch('/{id}', response_model=ProfessionalRead, status_code=200)
async def update(id: int, data: ProfessionalUpdate, db: AsyncSession=Depends(get_db)) -> ProfessionalRead | None:
    return await crud.update(id, data, db)

@router.delete('/{id}', status_code=204)
async def delete(id: int, db: AsyncSession=Depends(get_db)) -> None:
    return await crud.delete(id, db)
