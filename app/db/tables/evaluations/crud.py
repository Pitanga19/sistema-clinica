from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.db.utils import crud as utils
from app.db.tables.evaluations.model import Evaluation
from app.db.tables.evaluations.schemas import *
from app.db.tables.plans.model import Plan

async def create(data: EvaluationCreate, db: AsyncSession) -> Evaluation:
    evaluation = Evaluation(
        report=data.report,
        closed_at=data.closed_at,
        patient_id=data.patient_id,
        professional_id=data.professional_id,
        mode_id=data.mode_id,
    )
    
    db.add(evaluation)
    return await utils.commit_and_refresh(evaluation, db)

async def get_by_id(id: int, db: AsyncSession) -> Evaluation | None:
    stmt = select(Evaluation).where(Evaluation.id == id)
    should_exist = True
    search_fields = [utils.SearchField(field='id', value=id)]
    return await utils.get_validated(stmt, should_exist, search_fields, db)

async def get_by_patient_id(patient_id: str, db: AsyncSession) -> List[Evaluation]:
    stmt = select(Evaluation).where(Evaluation.patient_id == patient_id)
    return await utils.get_many(stmt, db)

async def get_by_professional_id(professional_id: int, db: AsyncSession) -> List[Evaluation]:
    stmt = select(Evaluation).where(Evaluation.professional_id == professional_id)
    return await utils.get_many(stmt, db)

async def get_by_mode_id(mode_id: int, db: AsyncSession) -> List[Evaluation]:
    stmt = select(Evaluation).where(Evaluation.mode_id == mode_id)
    return await utils.get_many(stmt, db)

async def get_all(db: AsyncSession) -> List[Evaluation]:
    return await utils.get_all(Evaluation, db)

async def update(id: int, data: EvaluationUpdate, db: AsyncSession) -> Evaluation | None:
    evaluation = await get_by_id(id, db)
    
    if data.report:
        evaluation.report = data.report
    if data.patient_id:
        evaluation.patient_id = data.patient_id
    if data.professional_id:
        evaluation.professional_id = data.professional_id
    if data.mode_id:
        evaluation.mode_id = data.mode_id
    
    return await utils.commit_and_refresh(evaluation, db)

async def delete(id: int, db: AsyncSession) -> None:
    evaluation = await get_by_id(id, db)
    await utils.delete(evaluation, db)
