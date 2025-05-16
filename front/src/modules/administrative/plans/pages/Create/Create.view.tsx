import { MainContainer, FormContainer, InputContainer, ButtonContainer } from "../../../../../shared/components/Containers"
import { TextInput, Select } from "../../../../../shared/components/Inputs"
import { NavigationButton } from "../../../../../shared/components/Buttons"
import type { PlanCreate } from "../../types"
import type { Entity } from "../../../entities/types"

interface PlansCreateViewProps {
    planData: PlanCreate
    entities: Entity[]
    error: string | null
    onPlanDataChange: (data: PlanCreate) => void
    onSubmit: (e: React.FormEvent) => void
}

const PlansCreateView = ({
    planData,
    entities,
    error,
    onPlanDataChange,
    onSubmit,
}: PlansCreateViewProps) => {
    return (
        <MainContainer>
            <h1>Crear Plan</h1>
            <FormContainer onSubmit={onSubmit}>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='name'
                        placeholder="Nombre del Plan"
                        onChange={(e) => onPlanDataChange({
                            ...planData, name: e.target.value })
                        }
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <Select
                        id='entityId'
                        value={planData.entityId}
                        onChange={(e) =>
                            onPlanDataChange({
                                ...planData,
                                entityId: parseInt(e.target.value, 10),
                            })
                        }
                        required
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
                    <NavigationButton type='submit'>Crear</NavigationButton>
                </ButtonContainer>
            </FormContainer>
        </MainContainer>
    )
}

export default PlansCreateView
