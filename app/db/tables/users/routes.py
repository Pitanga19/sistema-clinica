from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.session import get_db
from app.db.tables.users.schemas import UserRead, UserCreate, UserUpdate
from app.db.tables.users import crud

router = APIRouter(
    prefix='/users',
    tags=['Users'],
)

@router.post('/', response_model=UserRead, status_code=201)
async def create_user(data: UserCreate, db: AsyncSession=Depends(get_db)) -> UserRead:
    return await crud.create(data, db)

@router.get('/by_id/{id}', response_model=UserRead, status_code=200)
async def get_by_id(id: int, db: AsyncSession=Depends(get_db)) -> UserRead | None:
    return await crud.get_by_id(id, db)

@router.get('/by_username/{username}', response_model=UserRead, status_code=200)
async def get_by_username(username: str, db: AsyncSession=Depends(get_db)) -> UserRead | None:
    return await crud.get_by_username(username, db)

@router.get('/by_role_id/{role_id}', response_model=List[UserRead], status_code=200)
async def get_by_role_id(role_id: int, db: AsyncSession=Depends(get_db)) -> List[UserRead]:
    return await crud.get_by_role_id(role_id, db)

@router.get('/', response_model=List[UserRead], status_code=200)
async def get_all(db: AsyncSession=Depends(get_db)) -> List[UserRead]:
    return await crud.get_all(db)

@router.patch('/{id}', response_model=UserRead, status_code=200)
async def update(id: int, data: UserUpdate, db: AsyncSession=Depends(get_db)) -> UserRead | None:
    return await crud.update(id, data, db)

@router.delete('/{id}', status_code=204)
async def delete(id: int, db: AsyncSession=Depends(get_db)) -> None:
    return await crud.delete(id, db)
