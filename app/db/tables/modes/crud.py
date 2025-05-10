from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.db.utils import crud as utils
from app.db.tables.modes.model import Mode
from app.db.tables.modes.schemas import *
from app.db.tables.roles.model import Role

async def create(data: ModeCreate, db: AsyncSession) -> Mode:
    should_exist = False
    fields = [
        ('name', data.name)
    ]
    
    for field, value in fields:
        stmt = select(Mode).where(getattr(Mode, field) == value)
        await utils.get_validated(stmt, should_exist, search_fields=[utils.SearchField(field=field, value=value)], db=db)
    
    mode = Mode(
        name=data.name
    )
    
    db.add(mode)
    return await utils.commit_and_refresh(mode, db)

async def get_by_id(id: int, db: AsyncSession) -> Mode | None:
    stmt = select(Mode).where(Mode.id == id)
    should_exist = True
    search_fields = [utils.SearchField(field='id', value=id)]
    return await utils.get_validated(stmt, should_exist, search_fields, db)

async def get_by_name(name: str, db: AsyncSession) -> Mode | None:
    stmt = select(Mode).where(Mode.name == name)
    should_exist = True
    search_fields = [utils.SearchField(field='name', value=name)]
    return await utils.get_validated(stmt, should_exist, search_fields, db)

async def get_by_role_id(role_id: int, db: AsyncSession) -> List[Mode]:
    stmt = (select(Mode)
        .join(Mode.roles)
        .where(Role.id == role_id)
    )
    return await utils.get_many(stmt, db)

async def get_all(db: AsyncSession) -> List[Mode]:
    return await utils.get_all(Mode, db)

async def update(id: int, data: ModeUpdate, db: AsyncSession) -> Mode | None:
    mode = await get_by_id(id, db)
    
    if data.name:
        mode.name = data.name
    
    return await utils.commit_and_refresh(mode, db)

async def delete(id: int, db: AsyncSession) -> None:
    mode = await get_by_id(id, db)
    await utils.delete(mode, db)
