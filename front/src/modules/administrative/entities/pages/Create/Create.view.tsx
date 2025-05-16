import { MainContainer, FormContainer, InputContainer, ButtonContainer } from "../../../../../shared/components/Containers"
import { TextInput } from "../../../../../shared/components/Inputs"
import { NavigationButton } from "../../../../../shared/components/Buttons"

interface EntitiesCreateViewProps {
    name: string
    error: string | null
    onNameChange: (name: string) => void
    onSubmit: (e: React.FormEvent) => void
}

const EntitiesCreateView = ({
    name,
    error,
    onNameChange,
    onSubmit,
}: EntitiesCreateViewProps) => {
    return (
        <MainContainer>
            <h1>Crear Obra Social</h1>
            <FormContainer onSubmit={onSubmit}>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='name'
                        placeholder="Nombre de la Obra Social"
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

export default EntitiesCreateView
