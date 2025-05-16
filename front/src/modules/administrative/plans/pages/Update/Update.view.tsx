import { MainContainer, FormContainer, InputContainer, ButtonContainer } from "../../../../../shared/components/Containers"
import { TextInput, Select } from "../../../../../shared/components/Inputs"
import { NavigationButton } from "../../../../../shared/components/Buttons"
import type { Plan, PlanUpdate } from "../../types"
import type { Entity } from "../../../entities/types"

interface PlansUpdateViewProps {
    currentPlan: Plan | null
    updateData: PlanUpdate | null
    entities: Entity[]
    loading: boolean
    loadingMsg: string
    error: string | null
    onUpdateDataChange: (data: PlanUpdate) => void
    onSubmit: (e: React.FormEvent) => void
}

const PlansUpdateView = ({
    currentPlan,
    updateData,
    entities,
    loading,
    loadingMsg,
    error,
    onUpdateDataChange,
    onSubmit,
}: PlansUpdateViewProps) => {
    if (!currentPlan) return

    return (
        <MainContainer>
            <h1>Editar Plan</h1>
            <h2>{loading ? loadingMsg : currentPlan?.name}</h2>
            <FormContainer onSubmit={onSubmit}>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='name'
                        placeholder="Nombre del Plan"
                        onChange={(e) => onUpdateDataChange({
                            ...updateData, name: e.target.value
                            })
                        }
                    />
                </InputContainer>
                <InputContainer>
                    <Select
                        id='entityId'
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData, entityId: parseInt(e.target.value, 10)
                            })
                        }
                    >
                        <option value=''>Seleccione una Obra Social</option>
                        {entities.map((entity) => (
                            <option key={entity.id} value={entity.id}>
                                {entity.name}
                            </option>
                        ))}
                    </Select>
                </InputContainer>
                {error && <p className='error'>{error}</p>}
                <ButtonContainer>
                    <NavigationButton type='submit'>Guardar</NavigationButton>
                </ButtonContainer>
            </FormContainer>
        </MainContainer>
    )
}

export default PlansUpdateView
