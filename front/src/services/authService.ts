import api from './api'

export interface LoginData {
    username: string
    password: string
}

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
    } catch (error: any) {
        throw new Error(error.response?.data?.detail || 'Error al iniciar sesión')
    }
}
