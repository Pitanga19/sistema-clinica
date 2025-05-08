from fastapi import FastAPI

app = FastAPI(title='Sistema Clínica', version='0.0.2')

@app.get('/', tags=['Home'])
def root():
    return {'msg': 'Hola clinica'}
