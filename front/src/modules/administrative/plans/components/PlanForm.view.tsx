import { MainContainer, FormContainer, InputContainer, ButtonContainer } from '../../../../shared/components/Containers'
import { Title, Subtitle, Error } from '../../../../shared/components/Typography'
import { TextInput, Select, Option } from '../../../../shared/components/Inputs'
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
            <Title>{title}</Title>
            <Subtitle>{loading ? loadingMsg : subtitle}</Subtitle>

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
                        <Option value=''>Seleccione una Obra Social</Option>
                        {entities.map((entity) => (
                            <Option key={entity.id} value={entity.id}>
                                {entity.name}
                            </Option>
                        ))}
                    </Select>
                </InputContainer>
                <Error>{error}</Error>
                <ButtonContainer>
                    <NavigationButton type='submit'>{buttonText}</NavigationButton>
                </ButtonContainer>
            </FormContainer>
        </MainContainer>
    )
}

export default PlanFormView
