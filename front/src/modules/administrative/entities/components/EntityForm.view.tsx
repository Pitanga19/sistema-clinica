import {
    MainContainer,
    FormContainer,
    InputContainer,
    ButtonContainer,
} from '../../../../shared/components/Containers'
import { TextInput } from '../../../../shared/components/Inputs'
import { NavigationButton } from '../../../../shared/components/Buttons'
import type { Entity, EntityFormData } from '../types'

interface EntityFormViewProps {
    currentEntity: Entity | null
    data: EntityFormData
    loading: boolean
    error: string | null
    onDataChange: (data: Partial<EntityFormData>) => void
    onSubmit: (e: React.FormEvent) => void
}

const EntityFormView = ({
    currentEntity,
    data,
    loading,
    error,
    onDataChange,
    onSubmit,
}: EntityFormViewProps) => {
    const isCreateMode = !currentEntity
    const loadingMsg = 'Cargando formulario ...'
    const title = isCreateMode ? 'Crear Obra Social' : 'Editar Obra Social'
    const subtitle = isCreateMode ? 'Nueva Obra Social' : data.name
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
                        placeholder='Nombre'
                        onChange={(e) =>
                            onDataChange({
                                ...data,
                                name: e.target.value,
                            })
                        }
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

export default EntityFormView
