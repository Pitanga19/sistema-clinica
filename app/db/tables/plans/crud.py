from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.db.utils import crud as utils
from app.db.tables.plans.model import Plan
from app.db.tables.plans.schemas import *

async def create(data: PlanCreate, db: AsyncSession) -> Plan:
    stmt = select(Plan).where(
        (Plan.name == data.name) &          # por name
        (Plan.entity_id == data.entity_id)  # por ID
    )
    should_exist = False
    search_fields = [
        ('name', data.name),            # por name
        ('entity_id', data.entity_id)   # por ID
    ]
    await utils.get_validated(stmt, should_exist, search_fields, db)
    
    plan = Plan(
        name=data.name,
        entity_id=data.entity_id,
    )
    
    db.add(plan)
    return await utils.commit_and_refresh(plan, db)

async def get_by_id(id: int, db: AsyncSession) -> Plan | None:
    stmt = select(Plan).where(Plan.id == id)
    should_exist = True
    search_fields = [utils.SearchField(field='id', value=id)]
    return await utils.get_validated(stmt, should_exist, search_fields, db)

async def get_by_entity_id(entity_id: int, db: AsyncSession) -> List[Plan]:
    stmt = select(Plan).where(Plan.entity_id == entity_id)
    return await utils.get_many(stmt, db)

async def get_all(db: AsyncSession) -> List[Plan]:
    return await utils.get_all(Plan, db)

async def update(id: int, data: PlanUpdate, db: AsyncSession) -> Plan | None:
    plan = await get_by_id(id, db)
    should_exist = False
    search_fields = [
        ('name', data.name),            # por name
        ('entity_id', data.entity_id)   # por ID
    ]
    
    if data.name and data.entity_id:
        stmt = select(Plan).where(
            (Plan.name == data.name) &          # por name
            (Plan.entity_id == data.entity_id)  # por ID
        )
        await utils.get_validated(stmt, should_exist, search_fields, db)
        plan.name = data.name
        plan.entity_id = data.entity_id
    if data.name and data.entity_id is None:
        stmt = select(Plan).where(
            (Plan.name == data.name) &          # por name
            (Plan.entity_id == plan.entity_id)  # por ID
        )
        search_fields = [
            ('name', data.name),            # por name
            ('entity_id', data.entity_id)   # por ID
        ]
        await utils.get_validated(stmt, should_exist, search_fields, db)
        plan.name = data.name
    if data.entity_id and data.name is None:
        stmt = select(Plan).where(
            (Plan.name == plan.name) &          # por name
            (Plan.entity_id == data.entity_id)  # por ID
        )
        await utils.get_validated(stmt, should_exist, search_fields, db)
        plan.entity_id = data.entity_id
    
    return await utils.commit_and_refresh(plan, db)

async def delete(id: int, db: AsyncSession) -> None:
    plan = await get_by_id(id, db)
    await utils.delete(plan, db)
