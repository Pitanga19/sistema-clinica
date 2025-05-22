import {
    MainContainer,
    FormContainer,
    InputContainer,
    ButtonContainer,
    ConditionalContainer,
} from '../../../../shared/components/Containers'
import { Title, Subtitle, Error } from '../../../../shared/components/Typography'
import { Checkbox, Label, Option, Select, TextInput } from '../../../../shared/components/Inputs'
import { NavigationButton } from '../../../../shared/components/Buttons'
import type { People, PeopleFormData } from '../types'
import type { Entity } from '../../entities/types'
import type { Plan } from '../../plans/types'

interface PeopleFormViewProps {
    currentPeople: People | null
    data: PeopleFormData
    entities: Entity[]
    selectedEntity: Entity | null
    plans: Plan[]
    loading: boolean
    error: string | null
    onDataChange: (data: Partial<PeopleFormData>) => void
    onEntityChange: (id: string) => void
    onSubmit: (e: React.FormEvent) => void
}

const PeopleFormView = ({
    currentPeople,
    data,
    entities,
    selectedEntity,
    plans,
    loading,
    error,
    onDataChange,
    onEntityChange,
    onSubmit,
}: PeopleFormViewProps) => {
    const isCreateMode = !currentPeople
    const loadingMsg = 'Cargando formulario ...'
    const title = isCreateMode ? 'Crear Persona' : 'Editar Persona'
    const fullName = `${data.firstName} ${data.lastName}`
    const subtitle = isCreateMode ? 'Nueva Persona' : fullName
    const buttonText = isCreateMode ? 'Crear' : 'Guardar'

    return (
        <MainContainer>
            <Title>{title}</Title>
            <Subtitle>{loading ? loadingMsg : subtitle}</Subtitle>

            <FormContainer onSubmit={onSubmit}>
                <InputContainer>
                    <TextInput
                        type='number'
                        id='id'
                        placeholder='DNI'
                        onChange={(e) => onDataChange({ dni: e.target.value })}
                        required={isCreateMode}
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='firstName'
                        placeholder='Nombre'
                        onChange={(e) =>
                            onDataChange({ firstName: e.target.value })
                        }
                        required={isCreateMode}
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='lastName'
                        placeholder='Apellido'
                        onChange={(e) =>
                            onDataChange({ lastName: e.target.value })
                        }
                        required={isCreateMode}
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='phone'
                        id='phone1'
                        placeholder='Teléfono 1'
                        onChange={(e) =>
                            onDataChange({ phone1: e.target.value })
                        }
                        required={isCreateMode}
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='phone'
                        id='phone2'
                        placeholder='Teléfono 2'
                        onChange={(e) =>
                            onDataChange({ phone2: e.target.value })
                        }
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='email'
                        id='email'
                        placeholder='E-mail'
                        onChange={(e) =>
                            onDataChange({ email: e.target.value })
                        }
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='address'
                        placeholder='Dirección'
                        onChange={(e) =>
                            onDataChange({ address: e.target.value })
                        }
                        required={isCreateMode}
                    />
                </InputContainer>
                <InputContainer>
                    <Checkbox
                        type='checkbox'
                        id='isSuperuser'
                        checked={data.isPatient}
                        onChange={(e) =>
                            onDataChange({ isPatient: e.target.checked })}
                    />
                    <Label htmlFor='isPatient'>Es paciente</Label>
                </InputContainer>
                <ConditionalContainer show={data.isPatient}>
                    <InputContainer>
                        <TextInput
                            type='text'
                            id='clinicalHistoryNumber'
                            placeholder='Número de HC'
                            onChange={(e) =>
                                onDataChange({
                                    patient: {
                                        ...(data.patient || {}),
                                        clinicalHistoryNumber: e.target.value,
                                    },
                                })
                            }
                            required={isCreateMode && data.isPatient}
                        />
                    </InputContainer>
                </ConditionalContainer>
                <ConditionalContainer show={data.isPatient}>
                    <InputContainer>
                        <TextInput
                            type='text'
                            id='entityCode'
                            placeholder='Número de Afiliado'
                            onChange={(e) =>
                                onDataChange({
                                    patient: {
                                        ...data.patient,
                                        entityCode: e.target.value,
                                    },
                                })
                            }
                            required={isCreateMode && data.isPatient}
                        />
                    </InputContainer>
                </ConditionalContainer>
                <ConditionalContainer show={data.isPatient}>
                    <InputContainer>
                        <Select
                            id='entityId'
                            value={selectedEntity ? selectedEntity.id : ''}
                            onChange={(e) => { onEntityChange(e.target.value) }}
                            required={isCreateMode && data.isPatient}
                        >
                            <Option value=''>Seleccione una obra social</Option>
                            {entities.map((entity) => (
                                <Option key={entity.id} value={entity.id}>
                                    {entity.name}
                                </Option>
                            ))}
                        </Select>
                    </InputContainer>
                </ConditionalContainer>
                <ConditionalContainer show={data.isPatient}>
                    <InputContainer>
                        <Select
                            id='planId'
                            value={data.patient ? data.patient.planId : ''}
                            onChange={(e) =>
                                onDataChange({
                                    patient: {
                                        ...(data.patient || {}),
                                        planId: parseInt(e.target.value, 10),
                                    },
                                })
                            }
                            required={isCreateMode && data.isPatient}
                        >
                            <Option value=''>Seleccione un plan</Option>
                            {plans.map((plan) => (
                                <Option key={plan.id} value={plan.id}>
                                    {plan.name}
                                </Option>
                            ))}
                        </Select>
                    </InputContainer>
                </ConditionalContainer>
                <Error>{error}</Error>
                <ButtonContainer>
                    <NavigationButton type='submit'>{buttonText}</NavigationButton>
                </ButtonContainer>
            </FormContainer>
        </MainContainer>
    )
}

export default PeopleFormView
