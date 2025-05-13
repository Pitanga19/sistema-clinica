from fastapi import FastAPI
from app.core.config import settings as sett
from app.core.exceptions import register_custom_errors
from app.db import base
from app.db.utils.routes import collect_routers
from app.auth.routes import router as auth_router

app = FastAPI(title=sett.PROJECT_NAME, version=sett.PROJECT_VERSION)

register_custom_errors(app)

@app.get('/', tags=['Home'])
def root():
    return {'msg': 'Hola clinica'}

routers = collect_routers()
routers.append(auth_router)

for router in routers:
    app.include_router(router)
