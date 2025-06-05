import {
    LoginContainer,
    CardContainer,
    FormContainer,
    InputContainer,
    ButtonContainer,
} from '../../../../shared/components/Containers'
import { TextInput } from '../../../../shared/components/Inputs'
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
        <LoginContainer>
            <CardContainer>
                <h2>Iniciar sesión</h2>
                <FormContainer onSubmit={onSubmit}>
                    <InputContainer>
                        <TextInput
                            type='text'
                            id='username'
                            placeholder='Usuario'
                            value={username}
                            onChange={(e) => onUsernameChange(e.target.value)}
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <TextInput
                            type='password'
                            id='password'
                            placeholder='Contraseña'
                            value={password}
                            onChange={(e) => onPasswordChange(e.target.value)}
                            required
                        />
                    </InputContainer>
                    <ButtonContainer>
                        {error && <p className='error'>{error}</p>}
                        <BaseButton type='submit'>Acceder</BaseButton>
                    </ButtonContainer>
                </FormContainer>
            </CardContainer>
        </LoginContainer>
    )
}

export default LoginView
