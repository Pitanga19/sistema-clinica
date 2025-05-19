from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from sqlalchemy import select, and_
from typing import List
from app.core.exceptions import ValidationError
from app.db.utils import crud as utils
from app.db.tables.persons.schemas import PersonCreate, PersonUpdate
from app.db.tables.persons.model import Person
from app.db.tables.persons import crud as persons_crud
from app.db.tables.patients.schemas import PatientCreate, PatientUpdate
from app.db.tables.patients.model import Patient
from app.db.tables.patients import crud as patients_crud
from app.db.tables.plans.model import Plan
from app.modules.people.schemas import People, PeopleFilter

async def create_patient(person_data: PersonCreate, patient_data: PatientCreate, db: AsyncSession) -> Person:
    if (person_data.id != patient_data.person_id):
        raise ValidationError('El paciente hace referencia a una persona diferente')
    
    await persons_crud.create(person_data, db)
    await patients_crud.create(patient_data, db)
    
    return await get_patient_by_person_id(person_data.id, db)

async def create_non_patient(person_data: PersonCreate, db: AsyncSession) -> People:
    return await persons_crud.create(person_data, db)

async def create_patient_from_person(person_id: int, patient_data: PatientCreate, db: AsyncSession) -> Person:
    if (person_id != patient_data.person_id):
        raise ValidationError('El paciente hace referencia a una persona diferente')
    await persons_crud.get_by_id(person_id, db)
    
    return await patients_crud.create(patient_data, db)

async def get_patient_by_person_id(person_id: int, db: AsyncSession) -> Person | None:
    stmt = (
        select(Person)
        .options(
            joinedload(Person.patient)
            .joinedload(Patient.plan)
            .joinedload(Plan.entity)
        )
        .where(Person.id == person_id)
    )
    should_exist = True
    search_fields = [utils.SearchField(field='person_id', value=person_id)]
    return await utils.get_validated(stmt, should_exist, search_fields, db)

async def get_patient_filtered(filter: PeopleFilter, db: AsyncSession) -> List[Person]:
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
    
    if filter.id:
        filters.append(Person.id == filter.id)
    
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

async def update_patient(person_id: int, patient_id: int, person_data: PersonUpdate, patient_data: PatientUpdate, db: AsyncSession) -> Person:
    person = await persons_crud.update(person_id, person_data, db)
    patient = await patients_crud.update(patient_id, patient_data, db)
    
    if not person or not patient:
        raise ValueError('No se pudo actualizar la persona o el paciente')
    
    return await get_patient_by_person_id(person_id, db)

async def update_non_patient(person_id: int, person_data: PersonUpdate, db: AsyncSession) -> Person | None:
    return await persons_crud.update(person_id, person_data, db)

async def delete_patient(person_id: int, patient_id: int, db: AsyncSession) -> None:
    await persons_crud.delete(person_id, db)
    await patients_crud.delete(patient_id, db)

async def delete_non_patient(person_id: int, db: AsyncSession) -> None:
    return await persons_crud.delete(person_id, db)
