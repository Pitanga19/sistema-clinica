from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.db.utils import crud as utils
from app.db.tables.professionals.model import Professional
from app.db.tables.professionals.schemas import *

async def create(data: ProfessionalCreate, db: AsyncSession) -> Professional:
    stmt = select(Professional).where(
        (Professional.signature == data.signature) |
        (Professional.national_registration == data.national_registration) |
        (Professional.provincial_registration == data.provincial_registration) |
        (Professional.user_id == data.user_id)
    )
    should_exist = False
    search_fields = [
        utils.SearchField(field='signature', value=data.signature),
        utils.SearchField(field='national_registration', value=data.national_registration),
        utils.SearchField(field='provincial_registration', value=data.provincial_registration),
        utils.SearchField(field='user_id', value=data.user_id)
    ]
    await utils.get_validated(stmt, should_exist, search_fields, db)
    
    professional = Professional(
        signature=data.signature,
        national_registration=data.national_registration,
        provincial_registration=data.provincial_registration,
        user_id=data.user_id,
    )
    
    db.add(professional)
    return await utils.commit_and_refresh(professional, db)

async def get_by_id(id: int, db: AsyncSession) -> Professional | None:
    stmt = select(Professional).where(Professional.id == id)
    should_exist = True
    search_fields = [utils.SearchField(field='id', value=id)]
    return await utils.get_validated(stmt, should_exist, search_fields, db)

async def get_by_user_id(user_id: int, db: AsyncSession) -> Professional | None:
    stmt = select(Professional).where(Professional.user_id == user_id)
    should_exist = True
    search_fields = [utils.SearchField(field='user_id', value=user_id)]
    return await utils.get_validated(stmt, should_exist, search_fields, db)

async def get_all(db: AsyncSession) -> List[Professional]:
    return await utils.get_all(Professional, db)

async def update(id: int, data: ProfessionalUpdate, db: AsyncSession) -> Professional | None:
    professional = await get_by_id(id, db)
    
    if data.signature:
        stmt = select(Professional).where(Professional.signature == data.signature)
        should_exist = False
        search_fields = [utils.SearchField(field='signature', value=data.signature)]
        await utils.get_validated(stmt, should_exist, search_fields, db)
        professional.signature = data.signature
    if data.national_registration is not None:
        stmt = select(Professional).where(Professional.national_registration == data.national_registration)
        should_exist = False
        search_fields = [utils.SearchField(field='national_registration', value=data.national_registration)]
        await utils.get_validated(stmt, should_exist, search_fields, db)
        professional.national_registration = data.national_registration
    if data.provincial_registration is not None:
        stmt = select(Professional).where(Professional.provincial_registration == data.provincial_registration)
        should_exist = False
        search_fields = [utils.SearchField(field='provincial_registration', value=data.provincial_registration)]
        await utils.get_validated(stmt, should_exist, search_fields, db)
        professional.provincial_registration = data.provincial_registration
    if data.user_id:
        stmt = select(Professional).where(Professional.user_id == data.user_id)
        should_exist = False
        search_fields = [utils.SearchField(field='user_id', value=data.user_id)]
        await utils.get_validated(stmt, should_exist, search_fields, db)
        professional.user_id = data.user_id
    
    return await utils.commit_and_refresh(professional, db)

async def delete(id: int, db: AsyncSession) -> None:
    professional = await get_by_id(id, db)
    await utils.delete(professional, db)
