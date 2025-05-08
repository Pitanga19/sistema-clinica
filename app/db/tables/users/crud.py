from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.db.tables import crud_utils as utils
from app.db.tables.users.model import User
from app.db.tables.users.schemas import *
from app.core.security import hash_password

async def create(data: UserCreate, db: AsyncSession) -> User:
    # Verificar si ya existe ...
    should_exist = False
    fields = [
        ('id', data.id),            # por ID
        ('username', data.username) # por username
    ]
    
    for field, value in fields:
        stmt = select(User).where(getattr(User, field) == value)
        await utils.get_validated(stmt, should_exist, search_fields=[utils.SearchField(field=field, value=value)], db=db)
    
    user = User(
        id=data.id,
        username=data.username,
        hashed_password=hash_password(data.password),
        full_name=data.full_name,
        is_active=data.is_active,
        is_superuser=data.is_superuser,
        role_id=data.role_id,
    )
    
    db.add(user)
    return await utils.commit_and_refresh(user, db)

async def get_by_id(id: int, db: AsyncSession) -> User | None:
    stmt = select(User).where(User.id == id)
    should_exist = True
    search_fields = [utils.SearchField(field='id', value=id)]
    return await utils.get_validated(stmt, should_exist, search_fields, db)

async def get_by_username(username: str, db: AsyncSession) -> User | None:
    stmt = select(User).where(User.username == username)
    should_exist = True
    search_fields = [utils.SearchField(field='username', value=username)]
    return await utils.get_validated(stmt, should_exist, search_fields, db)

async def get_by_role_id(role_id: int, db: AsyncSession) -> List[User]:
    stmt = select(User).where(User.role_id == role_id)
    return await utils.get_many(stmt, db)

async def get_all(db: AsyncSession) -> List[User]:
    return await utils.get_all(User, db)

async def update(id: int, data: UserUpdate, db: AsyncSession) -> User | None:
    user = await get_by_id(id, db)
    
    if data.id:
        user.id = data.id
    if data.username:
        user.username = data.username
    if data.password:
        user.hashed_password = hash_password(data.password)
    if data.full_name:
        user.full_name = data.full_name
    if data.is_active is not None:
        user.is_active = data.is_active
    if data.is_superuser is not None:
        user.is_superuser = data.is_superuser
    if data.role_id:
        user.role_id = data.role_id
    
    return await utils.commit_and_refresh(user, db)

async def delete(id: int, db: AsyncSession) -> None:
    user = await get_by_id(id, db)
    await utils.delete(user, db)
