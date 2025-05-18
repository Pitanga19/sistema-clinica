import {
    MainContainer,
    FormContainer,
    InputContainer,
    ButtonContainer,
} from '../../../../shared/components/Containers'
import { Title, Subtitle, Error } from '../../../../shared/components/Typography'
import { TextInput } from '../../../../shared/components/Inputs'
import { NavigationButton } from '../../../../shared/components/Buttons'
import type { Person, PersonFormData } from '../types'

interface PersonFormViewProps {
    currentPerson: Person | null
    data: PersonFormData
    loading: boolean
    error: string | null
    onDataChange: (data: Partial<PersonFormData>) => void
    onSubmit: (e: React.FormEvent) => void
}

const PersonFormView = ({
    currentPerson,
    data,
    loading,
    error,
    onDataChange,
    onSubmit,
}: PersonFormViewProps) => {
    const isCreateMode = !currentPerson
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
                        value={data.id === 0 ? '' : data.id}
                        onChange={(e) => onDataChange({ id: parseInt(e.target.value, 10) })}
                        required={isCreateMode}
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='firstName'
                        placeholder='Nombre'
                        onChange={(e) =>
                            onDataChange({
                                ...data,
                                firstName: e.target.value,
                            })
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
                            onDataChange({
                                ...data,
                                lastName: e.target.value,
                            })
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
                            onDataChange({
                                ...data,
                                phone1: e.target.value,
                            })
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
                            onDataChange({
                                ...data,
                                phone2: e.target.value,
                            })
                        }
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='email'
                        id='email'
                        placeholder='E-mail'
                        onChange={(e) =>
                            onDataChange({
                                ...data,
                                email: e.target.value,
                            })
                        }
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='address'
                        placeholder='Dirección'
                        onChange={(e) =>
                            onDataChange({
                                ...data,
                                address: e.target.value,
                            })
                        }
                        required={isCreateMode}
                    />
                </InputContainer>
                <Error>{error}</Error>
                <ButtonContainer>
                    <NavigationButton type='submit'>{buttonText}</NavigationButton>
                </ButtonContainer>
            </FormContainer>
        </MainContainer>
    )
}

export default PersonFormView
