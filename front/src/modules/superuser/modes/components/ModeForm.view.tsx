import { MainContainer, FormContainer, InputContainer, ButtonContainer } from '../../../../shared/components/Containers'
import { Title, Subtitle, Error } from '../../../../shared/components/Typography'
import { TextInput } from '../../../../shared/components/Inputs'
import { NavigationButton } from '../../../../shared/components/Buttons'
import type { Mode, ModeFormData } from '../types'

interface ModeFormViewProps {
    currentMode: Mode | null
    data: ModeFormData
    loading: boolean
    error: string | null
    onDataChange: (data: Partial<ModeFormData>) => void
    onSubmit: (e: React.FormEvent) => void
}

const ModeFormView = ({
    currentMode,
    data,
    loading,
    error,
    onDataChange,
    onSubmit,
}: ModeFormViewProps) => {
    const isCreateMode = (!currentMode)
    const loadingMsg = 'Cargando formulario ...'
    const title = isCreateMode ? 'Crear Modo' : 'Editar Modo'
    const subtitle = isCreateMode ? 'Nuevo Modo' : currentMode?.name
    const buttonText = isCreateMode ? 'Crear' : 'Guardar'

    return (
        <MainContainer>
            <Title>{title}</Title>
            <Subtitle>{loading ? loadingMsg : subtitle}</Subtitle>

            <FormContainer onSubmit={onSubmit}>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='name'
                        placeholder='Nombre del Modo'
                        value={data.name}
                        onChange={(e) => onDataChange({ name: e.target.value })}
                        required={isCreateMode}
                    />
                </InputContainer>
                <Error>{error}</Error>
                <ButtonContainer>
                    <NavigationButton type='submit'>{buttonText}</NavigationButton>
                </ButtonContainer>
            </FormContainer>
        </MainContainer>
    )
}

export default ModeFormView
