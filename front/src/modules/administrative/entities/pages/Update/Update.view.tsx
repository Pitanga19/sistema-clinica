import { MainContainer, FormContainer, InputContainer, ButtonContainer } from "../../../../../shared/components/Containers"
import { TextInput } from "../../../../../shared/components/Inputs"
import { NavigationButton } from "../../../../../shared/components/Buttons"
import type { Entity, EntityUpdate } from "../../types"

interface EntitiesUpdateViewProps {
    currentEntity: Entity | null
    updateData: EntityUpdate | null
    loading: boolean
    loadingMsg: string
    error: string | null
    onUpdateDataChange: (data: EntityUpdate) => void
    onSubmit: (e: React.FormEvent) => void
}

const EntitiesUpdateView = ({
    currentEntity,
    updateData,
    loading,
    loadingMsg,
    error,
    onUpdateDataChange,
    onSubmit,
}: EntitiesUpdateViewProps) => {
    return (
        <MainContainer>
            <h1>Editar Obra Social</h1>
            <h2>{loading ? loadingMsg : currentEntity?.name}</h2>
            <FormContainer onSubmit={onSubmit}>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='name'
                        placeholder="Nombre de la Obra Social"
                        onChange={(e) => 
                            onUpdateDataChange({
                                ...updateData,
                                name: e.target.value,
                            })
                        }
                    />
                </InputContainer>
                {error && <p className='error'>{error}</p>}
                <ButtonContainer>
                    <NavigationButton type='submit'>Guardar</NavigationButton>
                </ButtonContainer>
            </FormContainer>
        </MainContainer>
    )
}

export default EntitiesUpdateView
