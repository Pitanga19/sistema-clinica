interface LoginViewProps {
    username: string
    password: string
    error: string
    onUsernameChange: (value: string) => void
    onPasswordChange: (value: string) => void
    onSubmit: (e: React.FormEvent) => void
}

const LoginView = ({
    username,
    password,
    error,
    onUsernameChange,
    onPasswordChange,
    onSubmit,
}: LoginViewProps) => {
    return (
        <div className="main_container">
            <h2>Iniciar sesión</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="username">Usuario</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => onUsernameChange(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => onPasswordChange(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Acceder</button>
            </form>
        </div>
    )
}

export default LoginView
