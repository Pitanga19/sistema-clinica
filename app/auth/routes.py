from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import OAuth2PasswordRequestForm
from app.auth.schemas import Token, TokenData, PasswordUpdate
from app.auth.dependencies import get_current_user
from app.auth.services import get_token, update_password
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

@router.patch('/password', response_model=Token)
async def update_password_endpoint(
    req: PasswordUpdate,
    user_data: TokenData = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await update_password(req, user_data, db)
