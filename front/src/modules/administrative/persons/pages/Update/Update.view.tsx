import { MainContainer, FormContainer, InputContainer, ButtonContainer } from '../../../../../shared/components/Containers'
import { TextInput } from '../../../../../shared/components/Inputs'
import { NavigationButton } from '../../../../../shared/components/Buttons'
import type { PersonBase, PersonUpdate } from '../../types'

interface PersonsUpdateViewProps {
    currentPerson: PersonBase | null
    updateData: PersonUpdate | null
    loading: boolean
    loadingMsg: string
    error: string | null
    onUpdateDataChange: (updateData: PersonUpdate) => void
    onSubmit: (e: React.FormEvent) => void
}

const PersonsUpdateView = ({
    currentPerson,
    updateData,
    loading,
    loadingMsg,
    error,
    onUpdateDataChange,
    onSubmit,
}: PersonsUpdateViewProps) => {
    if (!currentPerson) return

    return (
        <MainContainer>
            <h1>Editar Persona</h1>
            <h2>{loading ? loadingMsg : (`${currentPerson.firstName} ${currentPerson.lastName}`)}</h2>
            <FormContainer onSubmit={onSubmit}>
                <InputContainer>
                    <TextInput
                        type='number'
                        id='id'
                        placeholder='DNI'
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                id: parseInt(e.target.value, 10),
                            })
                        }
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='firstName'
                        placeholder='Nombre'
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                firstName: e.target.value,
                            })
                        }
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='lastName'
                        placeholder='Apellido'
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                lastName: e.target.value,
                            })
                        }
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='phone'
                        id='phone1'
                        placeholder='Teléfono 1'
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                phone1: e.target.value,
                            })
                        }
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='phone'
                        id='phone2'
                        placeholder='Teléfono 2'
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
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
                            onUpdateDataChange({
                                ...updateData,
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
                            onUpdateDataChange({
                                ...updateData,
                                address: e.target.value,
                            })
                        }
                    />
                </InputContainer>
                <p className='error'>{error}</p>
                <ButtonContainer>
                    <NavigationButton type='submit'>Guardar</NavigationButton>
                </ButtonContainer>
            </FormContainer>
        </MainContainer>
    )
}

export default PersonsUpdateView
