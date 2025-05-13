from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.core.security import verify_token
from app.auth.schemas import TokenData

# Esquema del header de autorización
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/auth/login')

# Obtener data del token
async def get_current_user(token: str = Depends(oauth2_scheme)) -> TokenData:
    user = verify_token(token)
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario inactivo"
        )
    return user
