from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from sqlalchemy import select, and_
from typing import List
from app.core.exceptions import ValidationError
from app.db.utils import crud as utils
from app.db.tables.persons.schemas import PersonCreate, PersonUpdate
from app.db.tables.persons.model import Person
from app.db.tables.persons import crud as persons_crud
from app.db.tables.patients.schemas import PatientCreate
from app.db.tables.patients.model import Patient
from app.db.tables.patients import crud as patients_crud
from app.db.tables.plans.model import Plan
from app.modules.people.schemas import People, PeopleUpdate, PeopleFilter

def full_patient_load():
    return joinedload(Person.patient).joinedload(Patient.plan).joinedload(Plan.entity)

async def create(data: People, db: AsyncSession) -> Person:
    if data.id:
        make_patient = PersonUpdate(is_patient=True)
        person = await persons_crud.update(data.id, make_patient, db)
    else:
        person_data = PersonCreate(
            dni=data.dni,
            first_name=data.first_name,
            last_name=data.last_name,
            phone_1=data.phone_1,
            phone_2=data.phone_2,
            email=data.email,
            address=data.address,
            is_patient=data.is_patient,
        )
        person = await persons_crud.create(person_data, db)
    
    if person.is_patient:
        patient_data = PatientCreate(
            clinical_history_number=data.patient.clinical_history_number,
            entity_code=data.patient.entity_code,
            plan_id=data.patient.plan_id,
            person_id=person.id,
        )
        await patients_crud.create(patient_data, db)

    return await get_by_person_id(person.id, db)

async def get_by_person_id(person_id: int, db: AsyncSession) -> Person | None:
    person = await persons_crud.get_by_id(person_id, db)
    
    if person.is_patient:
        stmt = (
            select(Person)
            .options(full_patient_load())
            .where(Person.id == person_id)
        )
        should_exist = True
        search_fields = [utils.SearchField(field='person_id', value=person_id)]
        return await utils.get_validated(stmt, should_exist, search_fields, db)
    
    return person

async def get_filtered(filter: PeopleFilter, db: AsyncSession) -> List[Person]:
    stmt = (
        select(Person)
        .outerjoin(Person.patient)
        .outerjoin(Patient.plan)
        .outerjoin(Plan.entity)
        .options(
            joinedload(Person.patient)
            .joinedload(Patient.plan)
            .joinedload(Plan.entity)
        )
    )
    
    filters = []
    
    if filter.dni:
        filters.append(Person.dni.ilike(f'%{filter.dni}%'))
    
    if filter.first_name:
        filters.append(Person.first_name.ilike(f'%{filter.first_name}%'))
    
    if filter.last_name:
        filters.append(Person.last_name.ilike(f'%{filter.last_name}%'))
    
    is_patient_filter = filter.is_patient
    if filter.plan_id or filter.entity_id:
        is_patient_filter = True
    
    if is_patient_filter is not None:
        filters.append(Person.is_patient == is_patient_filter)
        if filter.plan_id:
            filters.append(Patient.plan_id == filter.plan_id)
        if filter.entity_id:
            filters.append(Plan.entity_id == filter.entity_id)
    if filters:
        stmt = stmt.where(and_(*filters))
    
    return await utils.get_many(stmt, db)

async def update(person_id: int, data: PeopleUpdate, db: AsyncSession) -> Person:
    person = await persons_crud.update(person_id, data, db)
    
    if person.is_patient:
        fetched_patient = await patients_crud.get_by_person_id(person.id, db)
        await patients_crud.update(fetched_patient.id, data, db)
    
    return await get_by_person_id(person_id, db)

async def remove_patient(person_id: int, db: AsyncSession) -> None:
    person = await get_by_person_id(person_id, db)
    
    if not person.is_patient:
        raise ValidationError("Person is not a patient")
    
    await patients_crud.delete(person.patient.id, db)

async def delete(person_id: int, db: AsyncSession) -> None:
    person = await get_by_person_id(person_id, db)
    if person.is_patient:
        await patients_crud.delete(person.patient.id, db)
    await persons_crud.delete(person.id, db)
