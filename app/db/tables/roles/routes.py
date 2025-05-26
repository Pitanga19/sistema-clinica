from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.session import get_db
from app.db.tables.roles.schemas import RoleRead, RoleCreate, RoleUpdate
from app.db.tables.roles import crud

router = APIRouter(
    prefix='/roles',
    tags=['Roles'],
)

@router.post('/', response_model=RoleRead, status_code=201)
async def create_role(data: RoleCreate, db: AsyncSession=Depends(get_db)) -> RoleRead:
    return await crud.create(data, db)

@router.get('/by-id/{id}', response_model=RoleRead, status_code=200)
async def get_by_id(id: int, db: AsyncSession=Depends(get_db)) -> RoleRead | None:
    return await crud.get_by_id(id, db)

@router.get('/by-name/{name}', response_model=RoleRead, status_code=200)
async def get_by_name(name: str, db: AsyncSession=Depends(get_db)) -> RoleRead | None:
    return await crud.get_by_name(name, db)

@router.get('/by-assignment-id/{assignment_id}', response_model=List[RoleRead], status_code=200)
async def get_by_assignment_id(assignment_id: int, db: AsyncSession=Depends(get_db)) -> List[RoleRead]:
    return await crud.get_by_assignment_id(assignment_id, db)

@router.get('/', response_model=List[RoleRead], status_code=200)
async def get_all(db: AsyncSession=Depends(get_db)) -> List[RoleRead]:
    return await crud.get_all(db)

@router.patch('/{id}', response_model=RoleRead, status_code=200)
async def update(id: int, data: RoleUpdate, db: AsyncSession=Depends(get_db)) -> RoleRead | None:
    return await crud.update(id, data, db)

@router.delete('/{id}', status_code=204)
async def delete(id: int, db: AsyncSession=Depends(get_db)) -> None:
    return await crud.delete(id, db)
