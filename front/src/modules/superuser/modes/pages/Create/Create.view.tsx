import { MainContainer, FormContainer, InputContainer, ButtonContainer } from "../../../../../shared/components/Containers"
import { TextInput } from "../../../../../shared/components/Inputs"
import { NavigationButton } from "../../../../../shared/components/Buttons"

interface ModesCreateViewProps {
    name: string
    error: string | null
    onNameChange: (name: string) => void
    onSubmit: (e: React.FormEvent) => void
}

const ModesCreateView = ({
    name,
    error,
    onNameChange,
    onSubmit,
}: ModesCreateViewProps) => {
    return (
        <MainContainer>
            <h1>Crear Modo</h1>
            <FormContainer onSubmit={onSubmit}>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='name'
                        placeholder="Nombre del Modo"
                        value={name}
                        onChange={(e) => onNameChange(e.target.value)}
                        required
                    />
                </InputContainer>
                {error && <p className='error'>{error}</p>}
                <ButtonContainer>
                    <NavigationButton type='submit'>Crear</NavigationButton>
                </ButtonContainer>
            </FormContainer>
        </MainContainer>
    )
}

export default ModesCreateView
