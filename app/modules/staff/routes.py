from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.session import get_db
from app.modules.staff import service
from app.modules.staff.schemas import Staff, StaffCreate, StaffUpdate, StaffFilter

router = APIRouter(
    prefix="/staff",
    tags=["Staff"],
)

@router.post('/', response_model=Staff, status_code=201)
async def create_endpoint(data: StaffCreate, db: AsyncSession = Depends(get_db)) -> Staff:
    return await service.create(data, db)