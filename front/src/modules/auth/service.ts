import axios from 'axios'
import api from '../../shared/services/api'
import type { LoginData } from './types'

export const login = async (data: LoginData) => {
    const formData = new URLSearchParams()
    formData.append('username', data.username)
    formData.append('password', data.password)

    try {
        const response = await api.post('/auth/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })

        const { access_token } = response.data
        localStorage.setItem('access_token', access_token)

        return data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.detail || 'Error al iniciar sesión')
        }
        throw new Error('Error desconocido al iniciar sesión')
    }
}
