from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = 'Sistema Clínica'
    PROJECT_VERSION: str = '0.0.2'
    DATABASE_URL: str
    JWT_SECRET: str
    JWT_ALGORITHM: str
    JWT_EXPIRATION_MINUTES: int
    JWT_TIMEZONE: str

    class Config:
        env_file = '.env'

settings = Settings()
