import { MainContainer, FormContainer, InputContainer, ButtonContainer } from "../../../../../shared/components/Containers"
import { TextInput } from "../../../../../shared/components/Inputs"
import { NavigationButton } from "../../../../../shared/components/Buttons"

interface RolesCreateViewProps {
    name: string
    error: string | null
    onNameChange: (name: string) => void
    onSubmit: (e: React.FormEvent) => void
}

const RolesCreateView = ({
    name,
    error,
    onNameChange,
    onSubmit,
}: RolesCreateViewProps) => {
    return (
        <MainContainer>
            <h1>Crear Rol</h1>
            <FormContainer onSubmit={onSubmit}>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='name'
                        placeholder="Nombre del Rol"
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

export default RolesCreateView
