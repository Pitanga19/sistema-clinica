from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.db.utils import crud as utils
from app.db.tables.assignments.model import Assignment
from app.db.tables.assignments.schemas import *
from app.db.tables.roles.model import Role

async def create(data: AssignmentCreate, db: AsyncSession) -> Assignment:
    should_exist = False
    fields = [
        ('name', data.name)
    ]
    
    for field, value in fields:
        stmt = select(Assignment).where(getattr(Assignment, field) == value)
        await utils.get_validated(stmt, should_exist, search_fields=[utils.SearchField(field=field, value=value)], db=db)
    
    assignment = Assignment(
        name=data.name
    )
    
    db.add(assignment)
    return await utils.commit_and_refresh(assignment, db)

async def get_by_id(id: int, db: AsyncSession) -> Assignment | None:
    stmt = select(Assignment).where(Assignment.id == id)
    should_exist = True
    search_fields = [utils.SearchField(field='id', value=id)]
    return await utils.get_validated(stmt, should_exist, search_fields, db)

async def get_by_name(name: str, db: AsyncSession) -> Assignment | None:
    stmt = select(Assignment).where(Assignment.name == name)
    should_exist = True
    search_fields = [utils.SearchField(field='name', value=name)]
    return await utils.get_validated(stmt, should_exist, search_fields, db)

async def get_by_role_id(role_id: int, db: AsyncSession) -> List[Assignment]:
    stmt = (select(Assignment)
        .join(Assignment.roles)
        .where(Role.id == role_id)
    )
    return await utils.get_many(stmt, db)

async def get_all(db: AsyncSession) -> List[Assignment]:
    return await utils.get_all(Assignment, db)

async def update(id: int, data: AssignmentUpdate, db: AsyncSession) -> Assignment | None:
    assignment = await get_by_id(id, db)
    
    if data.name:
        assignment.name = data.name
    
    return await utils.commit_and_refresh(assignment, db)

async def delete(id: int, db: AsyncSession) -> None:
    assignment = await get_by_id(id, db)
    await utils.delete(assignment, db)
