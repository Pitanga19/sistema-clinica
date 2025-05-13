from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import OAuth2PasswordRequestForm
from app.auth.schemas import Token
from app.auth.services import get_token
from app.db.session import get_db

router = APIRouter(
    prefix='/auth',
    tags=['Auth'],
)

@router.post('/login', response_model=Token)
async def login_endpoint(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db),
):
    return await get_token(form_data, db)
