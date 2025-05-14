import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../service'
import LoginView from './Login.view'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            await login({ username, password })
            navigate('/')
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.detail || 'Usuario o contraseña inválidos')
            } else {
                setError('Ocurrió un error inesperado')
            }
        }
    }

    return (
        <LoginView
            username={username}
            password={password}
            error={error}
            onUsernameChange={setUsername}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
        />
    )
}

export default Login
