from fastapi import FastAPI
from app.core.config import settings as sett
from app.core.exceptions import register_custom_errors
from app.db import base
from app.db.utils.routes import collect_routers

app = FastAPI(title=sett.PROJECT_NAME, version=sett.PROJECT_VERSION)

register_custom_errors(app)

@app.get('/', tags=['Home'])
def root():
    return {'msg': 'Hola clinica'}

for router in collect_routers():
    app.include_router(router)
