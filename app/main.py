from fastapi import FastAPI
from app.core.config import settings as sett
from app.db import base
from app.db.tables.routes_utils import collect_routers

app = FastAPI(title=sett.PROJECT_NAME, version=sett.PROJECT_VERSION)

@app.get('/', tags=['Home'])
def root():
    return {'msg': 'Hola clinica'}

for router in collect_routers():
    app.include_router(router)
