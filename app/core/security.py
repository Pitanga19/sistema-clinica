from passlib.context import CryptContext
from datetime import datetime, timedelta
import pytz
from jose import JWTError, jwt
from app.core.config import settings
from app.core.exceptions import InvalidTokenError
from app.modules.auth.schemas import TokenData

# Contexto para hash de contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Función para hashear contraseña
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Función para verificar contraseña
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Función para crear JWT
def create_access_token(
    data: dict,
    expires_delta: timedelta = timedelta(minutes=settings.JWT_EXPIRATION_MINUTES)
) -> str:
    to_encode = data.copy()
    tz = pytz.timezone(settings.JWT_TIMEZONE)
    expire = datetime.now(tz) + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode,
        settings.JWT_SECRET,
        algorithm=settings.JWT_ALGORITHM,
    )
    return encoded_jwt

# Función para verificar el JWT
def verify_token(token: str) -> TokenData:
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=[settings.JWT_ALGORITHM]
        )
        return TokenData(**payload)
    except JWTError:
        raise InvalidTokenError("Token inválido o expirado")
