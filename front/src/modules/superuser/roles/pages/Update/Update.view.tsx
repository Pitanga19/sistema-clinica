import { MainContainer, FormContainer, InputContainer, ButtonContainer } from "../../../../../shared/components/Containers"
import { TextInput } from "../../../../../shared/components/Inputs"
import { NavigationButton } from "../../../../../shared/components/Buttons"
import type { Role, RoleUpdate } from "../../types"

interface RolesUpdateViewProps {
    currentRole: Role | null
    updateData: RoleUpdate | null
    loading: boolean
    loadingMsg: string
    error: string | null
    onUpdateDataChange: (data: RoleUpdate) => void
    onSubmit: (e: React.FormEvent) => void
}

const RolesUpdateView = ({
    currentRole,
    updateData,
    loading,
    loadingMsg,
    error,
    onUpdateDataChange,
    onSubmit,
}: RolesUpdateViewProps) => {
    return (
        <MainContainer>
            <h1>Editar Rol</h1>
            <h2>{loading ? loadingMsg : currentRole?.name}</h2>
            <FormContainer onSubmit={onSubmit}>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='name'
                        placeholder="Nombre del Rol"
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

export default RolesUpdateView
