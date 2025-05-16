import { MainContainer, FormContainer, InputContainer, ButtonContainer } from "../../../../../shared/components/Containers"
import { TextInput } from "../../../../../shared/components/Inputs"
import { NavigationButton } from "../../../../../shared/components/Buttons"
import type { Mode, ModeUpdate } from "../../types"

interface ModesUpdateViewProps {
    currentMode: Mode | null
    updateData: ModeUpdate | null
    loading: boolean
    loadingMsg: string
    error: string | null
    onUpdateDataChange: (data: ModeUpdate) => void
    onSubmit: (e: React.FormEvent) => void
}

const ModesUpdateView = ({
    currentMode,
    updateData,
    loading,
    loadingMsg,
    error,
    onUpdateDataChange,
    onSubmit,
}: ModesUpdateViewProps) => {
    return (
        <MainContainer>
            <h1>Editar Modo</h1>
            <h2>{loading ? loadingMsg : currentMode?.name}</h2>
            <FormContainer onSubmit={onSubmit}>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='name'
                        placeholder="Nombre del Modo"
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

export default ModesUpdateView
