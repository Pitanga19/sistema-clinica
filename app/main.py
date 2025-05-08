from fastapi import FastAPI
from app.core.config import settings as sett
from app.db import base

app = FastAPI(title=sett.PROJECT_NAME, version=sett.PROJECT_VERSION)

@app.get('/', tags=['Home'])
def root():
    return {'msg': 'Hola clinica'}
