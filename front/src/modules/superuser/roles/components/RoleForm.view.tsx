import { MainContainer, FormContainer, InputContainer, ButtonContainer } from '../../../../shared/components/Containers'
import { TextInput } from '../../../../shared/components/Inputs'
import { NavigationButton } from '../../../../shared/components/Buttons'
import type { Role, RoleFormData } from '../types'

interface RoleFormViewProps {
    currentRole: Role | null
    data: RoleFormData
    loading: boolean
    error: string | null
    onDataChange: (data: Partial<RoleFormData>) => void
    onSubmit: (e: React.FormEvent) => void
}

const RoleFormView = ({
    currentRole,
    data,
    loading,
    error,
    onDataChange,
    onSubmit,
}: RoleFormViewProps) => {
    const isCreateMode = (!currentRole)
    const loadingMsg = 'Cargando formulario ...'
    const title = isCreateMode ? 'Crear Rol' : 'Editar Rol'
    const subtitle = isCreateMode ? 'Nuevo Rol' : currentRole?.name
    const buttonText = isCreateMode ? 'Crear' : 'Guardar'

    return (
        <MainContainer>
            <h1>{title}</h1>
            <h2>{loading ? loadingMsg : subtitle}</h2>

            <FormContainer onSubmit={onSubmit}>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='name'
                        placeholder='Nombre del Rol'
                        value={data.name}
                        onChange={(e) => onDataChange({ name: e.target.value })}
                        required={isCreateMode}
                    />
                </InputContainer>
                {error && <p className='error'>{error}</p>}
                <ButtonContainer>
                    <NavigationButton type='submit'>{buttonText}</NavigationButton>
                </ButtonContainer>
            </FormContainer>
        </MainContainer>
    )
}

export default RoleFormView
