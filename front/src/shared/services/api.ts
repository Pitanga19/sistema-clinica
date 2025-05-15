import axios from 'axios'
import { API_URL } from '../constants'
import { toSnake, toCamel } from '../utils/apiTransform'

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

// Interceptor de request
api.interceptors.request.use(
    (config) => {
        // Agregar token JWT si existe en localStorage
        const token = localStorage.getItem('access_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        // Convertir datos del body a snake_case
        if (config.data) {
            config.data = toSnake(config.data)
        }

        // Convertir parámetros de consulta a snake_case
        if (config.params) {
            config.params = toSnake(config.params)
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Interceptor de response
api.interceptors.response.use(
    (response) => {
        // Convertir el body de la respuesta a camelCase
        if (response.data) {
            response.data = toCamel(response.data)
        }
        
        return response
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn('No autorizado. Redirigiendo a login...')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default api
