from fastapi import FastAPI
from app.core.config import settings as sett
from app.db import base
from app.db.tables.routes_utils import collect_routers
from app.db.tables.crud_utils import NotFoundError, AlreadyExistsError

app = FastAPI(title=sett.PROJECT_NAME, version=sett.PROJECT_VERSION)

app.add_exception_handler(NotFoundError, NotFoundError.handler)
app.add_exception_handler(AlreadyExistsError, AlreadyExistsError.handler)

@app.get('/', tags=['Home'])
def root():
    return {'msg': 'Hola clinica'}

for router in collect_routers():
    app.include_router(router)
