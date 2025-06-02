from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.session import get_db
from app.modules.staff import service
from app.modules.staff.schemas import Staff, StaffCreate, StaffUpdate, StaffFilter

router = APIRouter(
    prefix='/staff',
    tags=['Staff'],
)

@router.post('/', response_model=Staff, status_code=201)
async def create_endpoint(data: StaffCreate, db: AsyncSession = Depends(get_db)) -> Staff:
    return await service.create(data, db)

@router.get('/by-user-id/{user_id}', response_model=Staff, status_code=200)
async def get_by_user_id_endpoint(user_id: int, db: AsyncSession = Depends(get_db)) -> Staff | None:
    return await service.get_by_user_id(user_id, db)

@router.get('/', response_model=List[Staff], status_code=200)
async def get_staff_endpoint(
    filter: StaffFilter = Depends(),
    db: AsyncSession = Depends(get_db)
) -> List[Staff]:
    return await service.get_filtered(filter, db)

@router.patch('/{user_id}', response_model=Staff, status_code=200)
async def update_staff_endpoint(
    user_id: int,
    data: StaffUpdate,
    db: AsyncSession = Depends(get_db)
) -> Staff:
    return await service.update(user_id, data, db)

@router.delete('/remove-professional/{user_id}', status_code=204)
async def remove_professional_endpoint(
    user_id: int,
    db: AsyncSession = Depends(get_db)
) -> None:
    return await service.remove_professional(user_id, db)

@router.delete('/{user_id}', status_code=204)
async def delete_endpoint(
    user_id: int,
    db: AsyncSession = Depends(get_db)
) -> None:
    return await service.delete(user_id, db)
