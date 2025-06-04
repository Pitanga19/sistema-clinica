from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from sqlalchemy import select, and_
from typing import List
from app.core.exceptions import ValidationError
from app.db.utils import crud as utils
from app.modules.staff.schemas import Staff, StaffCreate, StaffUpdate, StaffFilter
from app.db.tables.users import crud as users_crud
from app.db.tables.users.schemas import UserCreate, UserUpdate
from app.db.tables.users.model import User
from app.db.tables.professionals import crud as professionals_crud
from app.db.tables.professionals.schemas import ProfessionalCreate

def full_staff_load():
    return [joinedload(User.role), joinedload(User.professional)]

async def create(data: StaffCreate, db: AsyncSession) -> Staff:
    if data.id:
        make_professional = UserUpdate(is_professional=True)
        user = await users_crud.update(data.id, make_professional, db)
    else:
        user_data = UserCreate(
            file=data.file,
            username=data.username,
            full_name=data.full_name,
            is_professional=data.is_professional,
            is_active=data.is_active,
            is_superuser=data.is_superuser,
            role_id=data.role_id,
            password=data.password,
        )
        user = await users_crud.create(user_data, db)
    
    if user.is_professional:
        professional_data = ProfessionalCreate(
            signature=data.professional.signature,
            national_registration=data.professional.national_registration,
            provincial_registration=data.professional.provincial_registration,
            user_id=user.id,
        )
        await professionals_crud.create(professional_data, db)
    
    return await get_by_user_id(user.id, db)


async def get_by_user_id(user_id: int, db: AsyncSession) -> Staff | None:
    stmt = (
        select(User)
        .options(*full_staff_load())
        .where(User.id == user_id)
    )
    should_exist = True
    search_fields = [utils.SearchField(field='user_id', value=user_id)]
    return await utils.get_validated(stmt, should_exist, search_fields, db)

async def get_filtered(filter: StaffFilter, db: AsyncSession) -> List[Staff]:
    stmt = (
        select(User)
        .outerjoin(User.professional)
        .options(*full_staff_load())
    )
    
    filters = []
    
    if filter.file:
        filters.append(User.file == filter.file)
    if filter.username:
        filters.append(User.username.ilike(f'%{filter.username}%'))
    if filter.full_name:
        filters.append(User.full_name.ilike(f'%{filter.full_name}%'))
    if filter.is_professional is not None:
        filters.append(User.is_professional == filter.is_professional)
    if filter.is_active is not None:
        filters.append(User.is_active == filter.is_active)
    if filter.role_id:
        filters.append(User.role_id == filter.role_id)
    if filters:
        stmt = stmt.where(and_(*filters))
    
    return await utils.get_many(stmt, db)

async def update(user_id: int, data: StaffUpdate, db: AsyncSession) -> Staff:
    user = await users_crud.update(user_id, data, db)
    
    if user.is_professional:
        fetched_professional = await professionals_crud.get_by_user_id(user.id, db)
        await professionals_crud.update(fetched_professional.id, data.professional, db)
    
    return await get_by_user_id(user.id, db)

async def remove_professional(user_id: int, db: AsyncSession) -> None:
    user = await get_by_user_id(user_id, db)
    
    if not user.is_professional:
        raise ValidationError('User is not a professional')
    
    await professionals_crud.delete(user.professional.id, db)

async def delete(user_id: int, db: AsyncSession) -> None:
    user = await get_by_user_id(user_id, db)
    if user.is_professional:
        await remove_professional(user_id, db)
    await users_crud.delete(user_id, db)
