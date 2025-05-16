import { MainContainer, FormContainer, InputContainer, ButtonContainer } from '../../../../../shared/components/Containers'
import { TextInput, Select, Checkbox, Label } from '../../../../../shared/components/Inputs'
import { NavigationButton } from '../../../../../shared/components/Buttons'
import type { Role } from '../../../roles/types'
import type { UserBase, UserUpdate } from '../../types'

interface UsersUpdateViewProps {
    currentUser: UserBase | null
    updateData: UserUpdate | null
    roles: Role[]
    loading: boolean
    loadingMsg: string
    error: string | null
    onUpdateDataChange: (updateData: UserUpdate) => void
    onSubmit: (e: React.FormEvent) => void
}

const UsersUpdateView = ({
    currentUser,
    updateData,
    roles,
    loading,
    loadingMsg,
    error,
    onUpdateDataChange,
    onSubmit,
}: UsersUpdateViewProps) => {
    if (!currentUser) return

    return (
        <MainContainer>
            <h1>Editar Usuario</h1>
            <h2>{loading ? loadingMsg : currentUser.fullName}</h2>
            <FormContainer onSubmit={onSubmit}>
                <InputContainer>
                    <TextInput
                        type='number'
                        id='id'
                        placeholder='Legajo'
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
                        id='username'
                        placeholder='Usuario'
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                username: e.target.value,
                            })
                        }
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='password'
                        id='password'
                        placeholder='Contraseña'
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                password: e.target.value,
                            })
                        }
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='fullName'
                        placeholder='Nombre Completo'
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                fullName: e.target.value,
                            })
                        }
                    />
                </InputContainer>
                <InputContainer>
                    <Checkbox
                        type='checkbox'
                        id='isActive'
                        checked={updateData?.isActive ?? currentUser.isActive}
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                isActive: e.target.checked,
                            })
                        }
                    />
                    <Label htmlFor='isActive'>Es activo</Label>
                </InputContainer>
                <InputContainer>
                    <Checkbox
                        type='checkbox'
                        id='isSuperuser'
                        checked={updateData?.isSuperuser ?? currentUser.isSuperuser}
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                isSuperuser: e.target.checked,
                            })
                        }
                    />
                    <Label htmlFor='isSuperuser'>Es superusuario</Label>
                </InputContainer>
                <InputContainer>
                    <Select
                        id='roleId'
                        onChange={(e) =>
                            onUpdateDataChange({
                                ...updateData,
                                roleId: parseInt(e.target.value, 10),
                            })
                        }
                    >
                        <option value=''>Seleccione un rol</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
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

export default UsersUpdateView
