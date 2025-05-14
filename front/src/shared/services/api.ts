import axios from 'axios'
import { API_URL } from '../constants'

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

// Interceptor de request: agrega token JWT si existe
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Interceptor de response: maneja errores globalmente
api.interceptors.response.use(
    (response) => {
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
