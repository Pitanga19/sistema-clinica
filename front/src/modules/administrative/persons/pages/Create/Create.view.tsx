import { MainContainer, FormContainer, InputContainer, ButtonContainer } from '../../../../../shared/components/Containers'
import { TextInput } from '../../../../../shared/components/Inputs'
import { NavigationButton } from '../../../../../shared/components/Buttons'
import type { PersonCreate } from '../../types'

interface PersonsCreateViewProps {
    personData: PersonCreate
    error: string | null
    onPersonDataChange: (data: PersonCreate) => void
    onSubmit: (e: React.FormEvent) => void
}

const PersonsCreateView = ({
    personData,
    error,
    onPersonDataChange,
    onSubmit,
}: PersonsCreateViewProps) => {
    return (
        <MainContainer>
            <h1>Crear Persona</h1>
            <FormContainer onSubmit={onSubmit}>
                <InputContainer>
                    <TextInput
                        type='number'
                        id='id'
                        placeholder='DNI'
                        onChange={(e) =>
                            onPersonDataChange({
                                ...personData,
                                id: parseInt(e.target.value, 10),
                            })
                        }
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='firstName'
                        placeholder='Nombre'
                        onChange={(e) =>
                            onPersonDataChange({
                                ...personData,
                                firstName: e.target.value,
                            })
                        }
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='lastName'
                        placeholder='Apellido'
                        onChange={(e) =>
                            onPersonDataChange({
                                ...personData,
                                lastName: e.target.value,
                            })
                        }
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='phone'
                        id='phone1'
                        placeholder='Teléfono 1'
                        onChange={(e) =>
                            onPersonDataChange({
                                ...personData,
                                phone1: e.target.value,
                            })
                        }
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='phone'
                        id='phone2'
                        placeholder='Teléfono 2'
                        onChange={(e) =>
                            onPersonDataChange({
                                ...personData,
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
                            onPersonDataChange({
                                ...personData,
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
                            onPersonDataChange({
                                ...personData,
                                address: e.target.value,
                            })
                        }
                        required
                    />
                </InputContainer>
                <p className='error'>{error}</p>
                <ButtonContainer>
                    <NavigationButton type='submit'>Crear</NavigationButton>
                </ButtonContainer>
            </FormContainer>
        </MainContainer>
    )
}

export default PersonsCreateView
