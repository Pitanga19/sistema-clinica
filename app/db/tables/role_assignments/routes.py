from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.session import get_db
from app.db.tables.role_assignments.schemas import RoleAssignmentCreate, RoleAssignmentRead
from app.db.tables.role_assignments import crud

router = APIRouter(
    prefix='/role_assignments',
    tags=['Role Assignments'],
)

@router.post('/', response_model=RoleAssignmentRead, status_code=201)
async def create_role_assignments(data: RoleAssignmentCreate, db: AsyncSession=Depends(get_db)) -> RoleAssignmentRead:
    return await crud.create(data, db)

@router.get('/', response_model=List[RoleAssignmentRead], status_code=200)
async def get_all_role_assignments(db: AsyncSession=Depends(get_db)) -> List[RoleAssignmentRead]:
    return await crud.get_all(db)

@router.delete('/{role_id}/{assignment_id}', status_code=204)
async def delete_role_assignments(data: RoleAssignmentRead, db: AsyncSession=Depends(get_db)) -> None:
    return await crud.delete(data, db)
