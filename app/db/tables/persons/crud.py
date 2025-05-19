from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.db.utils import crud as utils
from app.db.tables.persons.model import Person
from app.db.tables.persons.schemas import *

async def create(data: PersonCreate, db: AsyncSession) -> Person:
    should_exist = False
    search_fields = [utils.SearchField(field='id', value=data.id)]
    stmt = select(Person).where(Person.id == data.id)
    await utils.get_validated(stmt, should_exist, search_fields, db)
    
    person = Person(
        id=data.id,
        first_name=data.first_name,
        last_name=data.last_name,
        phone_1=data.phone_1,
        phone_2=data.phone_2,
        email=data.email,
        address=data.address,
        is_patient=data.is_patient
    )
    
    db.add(person)
    return await utils.commit_and_refresh(person, db)

async def get_by_id(id: int, db: AsyncSession) -> Person | None:
    stmt = select(Person).where(Person.id == id)
    should_exist = True
    search_fields = [utils.SearchField(field='id', value=id)]
    return await utils.get_validated(stmt, should_exist, search_fields, db)

async def get_by_last_name(last_name: str, db: AsyncSession) -> List[Person]:
    stmt = select(Person).where(Person.last_name == last_name)
    return await utils.get_many(stmt, db)

async def get_patients(db: AsyncSession) -> List[Person]:
    stmt = select(Person).where(Person.is_patient == True)
    return await utils.get_many(stmt, db)

async def get_all(db: AsyncSession) -> List[Person]:
    return await utils.get_all(Person, db)

async def update(id: int, data: PersonUpdate, db: AsyncSession) -> Person | None:
    person = await get_by_id(id, db)
    
    if data.id:
        should_exist = False
        search_fields = [('id', data.id)]
        stmt = select(Person).where(Person.id == data.id)
        await utils.get_validated(stmt, should_exist, search_fields, db)
        person.id = data.id
    if data.first_name:
        person.first_name = data.first_name
    if data.last_name:
        person.last_name = data.last_name
    if data.phone_1:
        person.phone_1 = data.phone_1
    if data.phone_2:
        person.phone_2 = data.phone_2
    if data.email:
        person.email = data.email
    if data.address:
        person.address = data.address
    if data.is_patient is not None:
        person.is_patient = data.is_patient
    
    return await utils.commit_and_refresh(person, db)

async def delete(id: int, db: AsyncSession) -> None:
    person = await get_by_id(id, db)
    await utils.delete(person, db)
