from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.session import get_db
from app.db.tables.assignments.schemas import AssignmentRead, AssignmentCreate, AssignmentUpdate
from app.db.tables.assignments import crud

router = APIRouter(
    prefix='/assignments',
    tags=['Assignments'],
)

@router.post('/', response_model=AssignmentRead, status_code=201)
async def create_assignment(data: AssignmentCreate, db: AsyncSession=Depends(get_db)) -> AssignmentRead:
    return await crud.create(data, db)

@router.get('/by_id/{id}', response_model=AssignmentRead, status_code=200)
async def get_by_id(id: int, db: AsyncSession=Depends(get_db)) -> AssignmentRead | None:
    return await crud.get_by_id(id, db)

@router.get('/by_name/{name}', response_model=AssignmentRead, status_code=200)
async def get_by_name(name: str, db: AsyncSession=Depends(get_db)) -> AssignmentRead | None:
    return await crud.get_by_name(name, db)

@router.get('/by_role_id/{role_id}', response_model=List[AssignmentRead], status_code=200)
async def get_by_role_id(role_id: int, db: AsyncSession=Depends(get_db)) -> List[AssignmentRead]:
    return await crud.get_by_role_id(role_id, db)

@router.get('/', response_model=List[AssignmentRead], status_code=200)
async def get_all(db: AsyncSession=Depends(get_db)) -> List[AssignmentRead]:
    return await crud.get_all(db)

@router.put('/{id}', response_model=AssignmentRead, status_code=200)
async def update(id: int, data: AssignmentUpdate, db: AsyncSession=Depends(get_db)) -> AssignmentRead | None:
    return await crud.update(id, data, db)

@router.delete('/{id}', status_code=204)
async def delete(id: int, db: AsyncSession=Depends(get_db)) -> None:
    return await crud.delete(id, db)
