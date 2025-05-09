from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from typing import List

# Clase base para errores personalizados
class CustomError(ValueError):
    status_code = 500

    @staticmethod
    async def handler(request: Request, exc: 'CustomError'):
        return JSONResponse(
            status_code=exc.status_code,
            content={'msg': str(exc)},
        )

# Error de validación
class ValidationError(CustomError):
    status_code = 422

# Error de valor no encontrado
class NotFoundError(CustomError):
    status_code = 404

# Error de valor ya existente
class AlreadyExistsError(CustomError):
    status_code = 409

# Lista de errores personalizados
custom_errors: List[CustomError] = [
    ValidationError,
    NotFoundError,
    AlreadyExistsError
]

# Función para registrar los manejadores de errores personalizados
def register_custom_errors(app: FastAPI):
    for error in custom_errors:
        app.add_exception_handler(error, error.handler)
