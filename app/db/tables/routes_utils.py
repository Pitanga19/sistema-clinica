import importlib
from pathlib import Path

def collect_routers() -> list:
    routers = []
    for path in Path(__file__).parent.glob('*/routes.py'):  # Busca routes.py en las subcarpetas directas
        module_name = f'app.db.tables.{path.parent.name}.routes'  # Genera el nombre del módulo basado en la carpeta
        module = importlib.import_module(module_name)

        if hasattr(module, 'router'):
            routers.append(module.router)

    return routers
