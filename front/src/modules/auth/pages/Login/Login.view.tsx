import { MainContainer, CardContainer, FormContainer, InputContainer } from '../../../../shared/components/Containers'
import { TextInput, Label } from '../../../../shared/components/Inputs'
import { BaseButton } from '../../../../shared/components/Buttons'

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
        <MainContainer>
            <CardContainer>
                <h2>Iniciar sesión</h2>
                <FormContainer onSubmit={onSubmit}>
                    <InputContainer>
                        <Label htmlFor="username">Usuario</Label>
                        <TextInput
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => onUsernameChange(e.target.value)}
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <Label htmlFor="password">Contraseña</Label>
                        <TextInput
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => onPasswordChange(e.target.value)}
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        {error && <p className="error">{error}</p>}
                        <BaseButton type="submit">Acceder</BaseButton>
                    </InputContainer>
                </FormContainer>
            </CardContainer>
        </MainContainer>
    )
}

export default LoginView
