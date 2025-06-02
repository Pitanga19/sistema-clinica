from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.security import verify_password, create_access_token, verify_token
from app.core.exceptions import InactiveUserError, IncorrectPasswordError
from app.modules.auth.schemas import Token, TokenData, PasswordUpdate
from app.db.tables.users import crud as user_crud
from app.db.tables.users.schemas import UserUpdate

async def get_token(form_data: OAuth2PasswordBearer, db: AsyncSession) -> Token:
    user = await user_crud.get_by_username(form_data.username, db)
    
    if not user.is_active:
        raise InactiveUserError('Usuario inactivo')
    
    if not verify_password(form_data.password, user.hashed_password):
        raise IncorrectPasswordError('Contraseña incorrecta')
    
    token_data = TokenData(
        id=user.id,
        username=user.username,
        is_active=user.is_active,
        is_superuser=user.is_superuser,
        role_id=user.role_id,
    )
    access_token = create_access_token(data=token_data.model_dump())
    
    return Token(access_token=access_token, token_type='bearer')

async def update_password(
    req: PasswordUpdate,
    user_data,
    db: AsyncSession,
) -> Token:
    if not req.new_password == req.confirm_password:
        raise IncorrectPasswordError('Las contraseñas no coinciden')
    
    user = await user_crud.get_by_id(user_data.id, db)
    
    if not verify_password(req.current_password, user.hashed_password):
        raise IncorrectPasswordError('Contraseña actual incorrecta')
    
    id = user_data.id
    update_data = UserUpdate(password = req.new_password)
    user = await user_crud.update(id, update_data, db)
    
    new_token_data = TokenData(
        id=user.id,
        username=user.username,
        is_active=user.is_active,
        is_superuser=user.is_superuser,
        role_id=user.role_id,
    )
    access_token = create_access_token(data=new_token_data.model_dump())
    
    return Token(access_token=access_token, token_type='bearer')
