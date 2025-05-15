import type { UserCreate } from '../../types'
import type { Role } from '../../../roles/types'
import { MainContainer, FormContainer, InputContainer, ButtonContainer } from '../../../../../shared/components/Containers'
import { TextInput, Select, Checkbox, Label } from '../../../../../shared/components/Inputs'
import { BaseButton } from '../../../../../shared/components/Buttons'

interface UsersCreateViewProps {
    userData: UserCreate
    error: string | null
    roles: Role[]
    onUserDataChange: (data: UserCreate) => void
    onSubmit: (e: React.FormEvent) => void
}

const UsersCreateView = ({
    userData,
    error,
    roles,
    onUserDataChange,
    onSubmit,
}: UsersCreateViewProps) => {
    return (
        <MainContainer>
            <h1>Crear Usuario</h1>
            <FormContainer onSubmit={onSubmit}>
                <InputContainer>
                    <TextInput
                        type='number'
                        id='id'
                        placeholder='Legajo'
                        value={userData.id === 0 ? '' : userData.id}
                        onChange={(e) =>
                            onUserDataChange({
                                ...userData,
                                id: parseInt(e.target.value, 10),
                            })
                        }
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='username'
                        placeholder='Usuario'
                        value={userData.username}
                        onChange={(e) =>
                            onUserDataChange({
                                ...userData,
                                username: e.target.value,
                            })
                        }
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='password'
                        id='password'
                        placeholder='Contraseña'
                        value={userData.password}
                        onChange={(e) =>
                            onUserDataChange({
                                ...userData,
                                password: e.target.value,
                            })
                        }
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='fullName'
                        placeholder='Nombre Completo'
                        value={userData.fullName}
                        onChange={(e) =>
                            onUserDataChange({
                                ...userData,
                                fullName: e.target.value,
                            })
                        }
                        required
                    />
                </InputContainer>
                <InputContainer>
                    <Checkbox
                        type='checkbox'
                        id='isActive'
                        checked={userData.isActive}
                        onChange={(e) =>
                            onUserDataChange({
                                ...userData,
                                isActive: e.target.checked,
                            })
                        }
                        required
                    />
                    <Label htmlFor='isActive'>Es activo</Label>
                </InputContainer>
                <InputContainer>
                    <Checkbox
                        type='checkbox'
                        id='isSuperuser'
                        checked={userData.isSuperuser}
                        onChange={(e) =>
                            onUserDataChange({
                                ...userData,
                                isSuperuser: e.target.checked,
                            })
                        }
                        required
                    />
                    <Label htmlFor='isSuperuser'>Es superusuario</Label>
                </InputContainer>
                <InputContainer>
                    <Select
                        id='roleId'
                        value={userData.roleId}
                        onChange={(e) =>
                            onUserDataChange({
                                ...userData,
                                roleId: parseInt(e.target.value, 10),
                            })
                        }
                        required
                    >
                        <option value=''>Seleccione un Rol</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </Select>
                </InputContainer>
                <ButtonContainer>
                    <p className='error'>{error}</p>
                    <BaseButton type='submit'>Crear</BaseButton>
                </ButtonContainer>
            </FormContainer>
        </MainContainer>
    )
}

export default UsersCreateView
