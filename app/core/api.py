from app.db.utils.routes import collect_db_routers
from app.modules.auth.routes import router as auth_router
from app.modules.people.routes import router as people_router

routers = collect_db_routers()
routers.append(auth_router)
routers.append(people_router)
