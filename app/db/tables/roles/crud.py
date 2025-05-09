from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.core.exceptions import ValidationError
from app.db.tables import crud_utils as utils
from app.db.tables.roles.model import Role
from app.db.tables.roles.schemas import *
from app.db.tables.assignments.model import Assignment
from app.db.tables.users.crud import get_by_role_id as get_users_by_role_id

async def create(data: RoleCreate, db: AsyncSession) -> Role:
    should_exist = False
    fields = [
        ('name', data.name)
    ]
    
    for field, value in fields:
        stmt = select(Role).where(getattr(Role, field) == value)
        await utils.get_validated(stmt, should_exist, search_fields=[utils.SearchField(field=field, value=value)], db=db)
    
    role = Role(
        name=data.name
    )
    
    db.add(role)
    return await utils.commit_and_refresh(role, db)

async def get_by_id(id: int, db: AsyncSession) -> Role | None:
    stmt = select(Role).where(Role.id == id)
    should_exist = True
    search_fields = [utils.SearchField(field='id', value=id)]
    return await utils.get_validated(stmt, should_exist, search_fields, db)

async def get_by_name(name: str, db: AsyncSession) -> Role | None:
    stmt = select(Role).where(Role.name == name)
    should_exist = True
    search_fields = [utils.SearchField(field='name', value=name)]
    return await utils.get_validated(stmt, should_exist, search_fields, db)

async def get_by_assignment_id(assignment_id: int, db: AsyncSession) -> List[Role]:
    stmt = (select(Role)
        .join(Role.assignments)
        .where(Assignment.assignment_id == assignment_id)
    )
    return await utils.get_many(stmt, db)

async def get_all(db: AsyncSession) -> List[Role]:
    return await utils.get_all(Role, db)

async def update(id: int, data: RoleUpdate, db: AsyncSession) -> Role | None:
    role = await get_by_id(id, db)
    
    if data.name:
        role.name = data.name
    
    return await utils.commit_and_refresh(role, db)

async def delete(id: int, db: AsyncSession) -> None:
    role = await get_by_id(id, db)
    
    users = await get_users_by_role_id(id, db)
    if users:
        usernames = [user.username for user in users]
        raise ValidationError(f'Hay usuarios asociados: {usernames}')
    
    await utils.delete(role, db)
