import { MainContainer, FormContainer, InputContainer, ButtonContainer } from '../../../../shared/components/Containers'
import { Title, Subtitle, Error } from '../../../../shared/components/Typography'
import { TextInput, Select, Option, Checkbox, Label } from '../../../../shared/components/Inputs'
import { NavigationButton } from '../../../../shared/components/Buttons'
import type { User, UserFormData } from '../types'
import type { Role } from '../../roles/types'

interface UserFormViewProps {
    currentUser: User | null
    data: UserFormData
    roles: Role[]
    loading: boolean
    error: string | null
    onDataChange: (data: Partial<UserFormData>) => void
    onSubmit: (e: React.FormEvent) => void
}

const UserFormView = ({
    currentUser,
    data,
    roles,
    loading,
    error,
    onDataChange,
    onSubmit,
}: UserFormViewProps) => {
    const isCreateMode = (!currentUser)
    const loadingMsg = 'Cargando formulario ...'
    const title = isCreateMode ? 'Crear Usuario' : 'Editar Usuario'
    const subtitle = isCreateMode ? 'Nuevo Usuario' : currentUser?.fullName
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
                        placeholder='Legajo'
                        value={data.id === 0 ? '' : data.id}
                        onChange={(e) => onDataChange({ id: parseInt(e.target.value, 10) })}
                        required={isCreateMode}
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='username'
                        placeholder='Usuario'
                        value={data.username}
                        onChange={(e) => onDataChange({ username: e.target.value })}
                        required={isCreateMode}
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='password'
                        id='password'
                        placeholder='Contraseña'
                        value={data.password}
                        onChange={(e) => onDataChange({ password: e.target.value })}
                        required={isCreateMode}
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        type='text'
                        id='fullName'
                        placeholder='Nombre Completo'
                        value={data.fullName}
                        onChange={(e) => onDataChange({ fullName: e.target.value })}
                        required={isCreateMode}
                    />
                </InputContainer>
                <InputContainer>
                    <Checkbox
                        type='checkbox'
                        id='isActive'
                        checked={data.isActive}
                        onChange={(e) => onDataChange({ isActive: e.target.checked })}
                        required={isCreateMode}
                    />
                    <Label htmlFor='isActive'>Es activo</Label>
                </InputContainer>
                <InputContainer>
                    <Checkbox
                        type='checkbox'
                        id='isSuperuser'
                        checked={data.isSuperuser}
                        onChange={(e) =>
                            onDataChange({ isSuperuser: e.target.checked })}
                    />
                    <Label htmlFor='isSuperuser'>Es superusuario</Label>
                </InputContainer>
                <InputContainer>
                    <Select
                        id='roleId'
                        value={data.roleId}
                        onChange={(e) =>
                            onDataChange({ roleId: parseInt(e.target.value, 10) })}
                    >
                        <Option value=''>Seleccione un Rol</Option>
                        {roles.map((role) => (
                            <Option key={role.id} value={role.id}>
                                {role.name}
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

export default UserFormView;
