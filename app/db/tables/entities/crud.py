from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.db.utils import crud as utils
from app.db.tables.entities.model import Entity
from app.db.tables.entities.schemas import *
from app.db.tables.roles.model import Role

async def create(data: EntityCreate, db: AsyncSession) -> Entity:
    should_exist = False
    fields = [
        ('name', data.name)
    ]
    
    for field, value in fields:
        stmt = select(Entity).where(getattr(Entity, field) == value)
        await utils.get_validated(stmt, should_exist, search_fields=[utils.SearchField(field=field, value=value)], db=db)
    
    entity = Entity(
        name=data.name
    )
    
    db.add(entity)
    return await utils.commit_and_refresh(entity, db)

async def get_by_id(id: int, db: AsyncSession) -> Entity | None:
    stmt = select(Entity).where(Entity.id == id)
    should_exist = True
    search_fields = [utils.SearchField(field='id', value=id)]
    return await utils.get_validated(stmt, should_exist, search_fields, db)

async def get_by_name(name: str, db: AsyncSession) -> Entity | None:
    stmt = select(Entity).where(Entity.name == name)
    should_exist = True
    search_fields = [utils.SearchField(field='name', value=name)]
    return await utils.get_validated(stmt, should_exist, search_fields, db)

async def get_by_role_id(role_id: int, db: AsyncSession) -> List[Entity]:
    stmt = (select(Entity)
        .join(Entity.roles)
        .where(Role.id == role_id)
    )
    return await utils.get_many(stmt, db)

async def get_all(db: AsyncSession) -> List[Entity]:
    return await utils.get_all(Entity, db)

async def update(id: int, data: EntityUpdate, db: AsyncSession) -> Entity | None:
    entity = await get_by_id(id, db)
    
    if data.name:
        entity.name = data.name
    
    return await utils.commit_and_refresh(entity, db)

async def delete(id: int, db: AsyncSession) -> None:
    entity = await get_by_id(id, db)
    await utils.delete(entity, db)
