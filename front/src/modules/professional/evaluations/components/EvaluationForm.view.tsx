import {
    MainContainer,
    FormContainer,
    InputContainer,
    ButtonContainer,
} from '../../../../shared/components/Containers'
import { Title, Subtitle, Error } from '../../../../shared/components/Typography'
import { TextArea, Select, Option } from '../../../../shared/components/Inputs'
import { NavigationButton } from '../../../../shared/components/Buttons'
import type { Evaluation, EvaluationFormData } from '../types'
import type { People } from '../../../administrative/people/types'
import type { User } from '../../../superuser/users/types'
import type { Mode } from '../../../superuser/modes/types'

interface EvaluationFormViewProps {
    currentEvaluation: Evaluation | null
    data: EvaluationFormData
    patient: People | null
    professional: User | null
    modes: Mode[] | null
    loading: boolean
    error: string | null
    onDataChange: (data: Partial<EvaluationFormData>) => void
    onSubmit: (e: React.FormEvent) => void
}

const EvaluationFormView = ({
    currentEvaluation,
    data,
    patient,
    professional,
    modes,
    loading,
    error,
    onDataChange,
    onSubmit,
}: EvaluationFormViewProps) => {
    const isCreateMode = !currentEvaluation
    const loadingMsg = 'Cargando formulario ...'
    const title = isCreateMode ? 'Crear Evaluación' : 'Editar Evaluación'
    const subtitle = patient ? `${patient.firstName} ${patient.lastName}` : 'Paciente no seleccionado'
    const buttonText = isCreateMode ? 'Crear' : 'Guardar'

    return (
        <MainContainer>
            <Title>{title}</Title>
            <Subtitle>{loading ? loadingMsg : subtitle}</Subtitle>

            <FormContainer onSubmit={onSubmit}>
                <InputContainer>
                    <TextArea
                        id='report'
                        placeholder='Evolución'
                        onChange={(e) =>
                            onDataChange({
                                ...data,
                                report: e.target.value,
                            })
                        }
                        required={isCreateMode}
                    />
                </InputContainer>
                <InputContainer>
                    <Select>
                        <Option value=''>Seleccione un modo</Option>
                        {modes?.map((mode) => (
                            <Option
                                key={mode.id}
                                value={mode.id}
                                onChange={() => onDataChange({ ...data, modeId: mode.id })}
                            >
                                {mode.name}
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

export default EvaluationFormView
