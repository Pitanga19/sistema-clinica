from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.session import get_db
from app.db.tables.evaluations.schemas import EvaluationRead, EvaluationCreate, EvaluationUpdate
from app.db.tables.evaluations import crud

router = APIRouter(
    prefix='/evaluations',
    tags=['Evaluations'],
)

@router.post('/', response_model=EvaluationRead, status_code=201)
async def create_evaluation(data: EvaluationCreate, db: AsyncSession=Depends(get_db)) -> EvaluationRead:
    return await crud.create(data, db)

@router.get('/by_id/{id}', response_model=EvaluationRead, status_code=200)
async def get_by_id(id: int, db: AsyncSession=Depends(get_db)) -> EvaluationRead | None:
    return await crud.get_by_id(id, db)

@router.get('/by_patient_id/{patient_id}', response_model=List[EvaluationRead], status_code=200)
async def get_by_patient_id(patient_id: int, db: AsyncSession=Depends(get_db)) -> List[EvaluationRead]:
    return await crud.get_by_patient_id(patient_id, db)

@router.get('/by_professional_id/{professional_id}', response_model=List[EvaluationRead], status_code=200)
async def get_by_professional_id(professional_id: int, db: AsyncSession=Depends(get_db)) -> List[EvaluationRead]:
    return await crud.get_by_professional_id(professional_id, db)

@router.get('/by_mode_id/{mode_id}', response_model=List[EvaluationRead], status_code=200)
async def get_by_mode_id(mode_id: int, db: AsyncSession=Depends(get_db)) -> List[EvaluationRead]:
    return await crud.get_by_mode_id(mode_id, db)

@router.get('/', response_model=List[EvaluationRead], status_code=200)
async def get_all(db: AsyncSession=Depends(get_db)) -> List[EvaluationRead]:
    return await crud.get_all(db)

@router.put('/{id}', response_model=EvaluationRead, status_code=200)
async def update(id: int, data: EvaluationUpdate, db: AsyncSession=Depends(get_db)) -> EvaluationRead | None:
    return await crud.update(id, data, db)

@router.delete('/{id}', status_code=204)
async def delete(id: int, db: AsyncSession=Depends(get_db)) -> None:
    return await crud.delete(id, db)
