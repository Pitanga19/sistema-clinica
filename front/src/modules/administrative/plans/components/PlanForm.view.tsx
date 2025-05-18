import { MainContainer, FormContainer, InputContainer, ButtonContainer } from '../../../../shared/components/Containers'
import { TextInput, Select } from '../../../../shared/components/Inputs'
import { NavigationButton } from '../../../../shared/components/Buttons'
import type { Plan, PlanFormData } from '../types'
import type { Entity } from '../../entities/types'

interface PlanFormViewProps {
    currentPlan: Plan | null
    data: PlanFormData
    entities: Entity[]
    loading: boolean
    error: string | null
    onDataChange: (data: Partial<PlanFormData>) => void
    onSubmit: (e: React.FormEvent) => void
}

const PlanFormView = ({
    currentPlan,
    data,
    entities,
    loading,
    error,
    onDataChange,
    onSubmit,
}: PlanFormViewProps) => {
    const isCreatePlan = (!currentPlan)
    const loadingMsg = 'Cargando formulario ...'
    const title = isCreatePlan ? 'Crear Plan' : 'Editar Plan'
    const subtitle = isCreatePlan ? 'Nuevo Plan' : currentPlan?.name
    const buttonText = isCreatePlan ? 'Crear' : 'Guardar'

    return (
        <MainContainer>
            <h1>{title}</h1>
            <h2>{loading ? loadingMsg : subtitle}</h2>

            <FormContainer onSubmit={onSubmit}>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='name'
                        placeholder='Nombre del Plan'
                        value={data.name}
                        onChange={(e) => onDataChange({ name: e.target.value })}
                        required={isCreatePlan}
                    />
                </InputContainer>
                <InputContainer>
                    <Select
                        id='entityId'
                        value={data.entityId}
                        onChange={(e) =>
                            onDataChange({ entityId: parseInt(e.target.value, 10) })}
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
                    <NavigationButton type='submit'>{buttonText}</NavigationButton>
                </ButtonContainer>
            </FormContainer>
        </MainContainer>
    )
}

export default PlanFormView
