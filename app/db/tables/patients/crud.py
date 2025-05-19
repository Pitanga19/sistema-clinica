from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.db.utils import crud as utils
from app.db.tables.patients.model import Patient
from app.db.tables.patients.schemas import *
from app.db.tables.plans.model import Plan

async def create(data: PatientCreate, db: AsyncSession) -> Patient:
    should_exist = False
    search_fields = [
        utils.SearchField(field='clinical_history_number', value=data.clinical_history_number),
        utils.SearchField(field='person_id', value=data.person_id),
    ]
    stmt = select(Patient).where(
        (Patient.clinical_history_number == data.clinical_history_number) &
        (Patient.person_id == data.person_id)
    )
    await utils.get_validated(stmt, should_exist, search_fields, db)
    
    patient = Patient(
        clinical_history_number=data.clinical_history_number,
        entity_code=data.entity_code,
        plan_id=data.plan_id,
        person_id=data.person_id,
    )
    
    db.add(patient)
    return await utils.commit_and_refresh(patient, db)

async def get_by_id(id: int, db: AsyncSession) -> Patient | None:
    stmt = select(Patient).where(Patient.id == id)
    should_exist = True
    search_fields = [utils.SearchField(field='id', value=id)]
    return await utils.get_validated(stmt, should_exist, search_fields, db)

async def get_by_clinical_history_number(clinical_history_number: int, db: AsyncSession) -> Patient | None:
    stmt = select(Patient).where(Patient.clinical_history_number == clinical_history_number)
    should_exist = True
    search_fields = [utils.SearchField(field='clinical_history_number', value=clinical_history_number)]
    return await utils.get_validated(stmt, should_exist, search_fields, db)

async def get_by_person_id(person_id: str, db: AsyncSession) -> Patient | None:
    stmt = select(Patient).where(Patient.person_id == person_id)
    should_exist = True
    search_fields = [utils.SearchField(field='person_id', value=person_id)]
    return await utils.get_validated(stmt, should_exist, search_fields, db)

async def get_by_plan_id(plan_id: int, db: AsyncSession) -> List[Patient]:
    stmt = select(Patient).where(Patient.plan_id == plan_id)
    return await utils.get_many(stmt, db)

async def get_all(db: AsyncSession) -> List[Patient]:
    return await utils.get_all(Patient, db)

async def update(id: int, data: PatientUpdate, db: AsyncSession) -> Patient | None:
    patient = await get_by_id(id, db)
    
    if data.clinical_history_number:
        should_exist = False
        search_fields = [('clinical_history_number', data.clinical_history_number)]
        stmt = select(Patient).where(Patient.clinical_history_number == data.clinical_history_number)
        await utils.get_validated(stmt, should_exist, search_fields, db)
        patient.clinical_history_number = data.clinical_history_number
    if data.entity_code:
        patient.entity_code = data.entity_code
    if data.plan_id:
        patient.plan_id = data.plan_id
    if data.person_id:
        should_exist = False
        search_fields = [('person_id', data.person_id)]
        stmt = select(Patient).where(Patient.person_id == data.person_id)
        await utils.get_validated(stmt, should_exist, search_fields, db)
        patient.person_id = data.person_id
    
    return await utils.commit_and_refresh(patient, db)

async def delete(id: int, db: AsyncSession) -> None:
    patient = await get_by_id(id, db)
    await utils.delete(patient, db)
