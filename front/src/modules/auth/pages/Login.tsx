import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../service'

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
        } catch (error: any) {
            setError(error.response?.data?.detail || 'Usuario o contraseña inválidos')
        }
    }

    return (
        <div className='main_container'>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Usuario</label>
                    <input
                        type='text'
                        id='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='password'>Contraseña</label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className='error'>{error}</p>}
                <button type='submit'>Acceder</button>
            </form>
        </div>
    )
}

export default Login
