import api from './api'

export interface LoginData {
    username: string
    password: string
}

export const login = async (data: LoginData) => {
    try {
        const response = await api.post('/auth/login', data)
        const { access_token } = response.data

        localStorage.setItem('access_token', access_token)

        return data
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || 'Error al iniciar sesión')
    }
}
