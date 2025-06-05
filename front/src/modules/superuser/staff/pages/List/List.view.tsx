import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faAdd } from '@fortawesome/free-solid-svg-icons'
import {
    MainContainer,
    TableFilterFormContainer,
    TableFilterInputContainer,
} from '../../../../../shared/components/Containers'
import { Title, Text, Error } from '../../../../../shared/components/Typography'
import { BaseButton, InLineButton, DeleteButton } from '../../../../../shared/components/Buttons'
import { ListItem } from '../../../../../shared/components/Lists'
import type { Staff, StaffFilter } from '../../types'
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
} from '../../../../../shared/components/Tables'
import { booleanToString } from '../../../../../shared/utils/functions'
import type { Role } from '../../../roles/types'
import {
    Option,
    TableFilterSelect,
    TableFilterTextInput,
} from '../../../../../shared/components/Inputs'

interface StaffListViewProps {
    filters: StaffFilter
    staff: Staff[]
    roles: Role[]
    selectedRole: Role | null
    loading: boolean
    error: string | null
    onFiltersChange: (filters: StaffFilter) => void
    onRoleChange: (roleIdStr: string) => void
    onCreate: () => void
    onView: (staffId: number) => void
    onEdit: (staffId: number) => void
    onDelete: (staffId: number) => void
}

const StaffListView = ({
    filters,
    staff,
    roles,
    selectedRole,
    loading,
    error,
    onFiltersChange,
    onRoleChange,
    onCreate,
    onView,
    onEdit,
    onDelete,
}: StaffListViewProps) => {
    let content

    if (loading) {
        content = <Text>Cargando usuarios ...</Text>
    } else if (error) {
        content = <Error>{error}</Error>
    } else if (staff.length === 0) {
        content = <Text>No hay usuarios para mostrar</Text>
    } else {
        content = (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Legajo</TableHeaderCell>
                        <TableHeaderCell>Usuario</TableHeaderCell>
                        <TableHeaderCell>Nombre Completo</TableHeaderCell>
                        <TableHeaderCell>Rol</TableHeaderCell>
                        <TableHeaderCell>Es Activo</TableHeaderCell>
                        <TableHeaderCell>Es Superusuario</TableHeaderCell>
                        <TableHeaderCell>Es Profesional</TableHeaderCell>
                        <TableHeaderCell>Firma</TableHeaderCell>
                        <TableHeaderCell>M.N.</TableHeaderCell>
                        <TableHeaderCell>M.P.</TableHeaderCell>
                        <TableHeaderCell>Acciones</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {staff.map((s) => (
                        <TableRow key={s.id}>
                            <TableCell>{s.file}</TableCell>
                            <TableCell>{s.username}</TableCell>
                            <TableCell>{s.fullName}</TableCell>
                            <TableCell>{s.role?.name ?? ''}</TableCell>
                            <TableCell>{booleanToString(s.isActive)}</TableCell>
                            <TableCell>{booleanToString(s.isSuperuser)}</TableCell>
                            <TableCell>{booleanToString(s.isProfessional)}</TableCell>
                            <TableCell>{s.professional?.signature ?? ''}</TableCell>
                            <TableCell>{s.professional?.nationalRegistration ?? ''}</TableCell>
                            <TableCell>{s.professional?.provincialRegistration ?? ''}</TableCell>
                            <TableCell>
                                <ListItem key={s.id}>
                                    <InLineButton onClick={() => onView(s.id)}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </InLineButton>
                                    <InLineButton onClick={() => onEdit(s.id)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </InLineButton>
                                    <DeleteButton onClick={() => onDelete(s.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </DeleteButton>
                                </ListItem>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    return (
        <MainContainer>
            <Title>Lista de Usuarios</Title>
            <BaseButton onClick={() => onCreate()}>
                Crear Usuario <FontAwesomeIcon icon={faAdd} />
            </BaseButton>
            <TableFilterFormContainer>
                <TableFilterInputContainer>
                    <TableFilterTextInput
                        type='text'
                        id='file'
                        name='file'
                        placeholder='Legajo'
                        value={filters.file}
                        onChange={(e) => {
                            const value = e.target.value
                            onFiltersChange({
                                ...filters,
                                file: value === '' ? undefined : e.target.value,
                            })
                        }}
                    />
                </TableFilterInputContainer>
                <TableFilterInputContainer>
                    <TableFilterTextInput
                        type='text'
                        id='username'
                        name='username'
                        placeholder='Usuario'
                        value={filters.username}
                        onChange={(e) => {
                            const value = e.target.value
                            onFiltersChange({
                                ...filters,
                                username: value === '' ? undefined : e.target.value,
                            })
                        }}
                    />
                </TableFilterInputContainer>
                <TableFilterInputContainer>
                    <TableFilterTextInput
                        type='text'
                        id='fullName'
                        name='fullName'
                        placeholder='Nombre Completo'
                        value={filters.fullName}
                        onChange={(e) => {
                            const value = e.target.value
                            onFiltersChange({
                                ...filters,
                                fullName: value === '' ? undefined : e.target.value,
                            })
                        }}
                    />
                </TableFilterInputContainer>
                <TableFilterInputContainer>
                    <TableFilterSelect
                        id='isActive'
                        value={filters.isActive !== undefined ? filters.isActive.toString() : ''}
                        onChange={(e) =>
                            onFiltersChange({
                                ...filters,
                                isActive:
                                    e.target.value === '' ? undefined : e.target.value === 'true',
                            })
                        }
                    >
                        <Option value=''>Todos</Option>
                        <Option value='true'>Es Activo</Option>
                        <Option value='false'>Dado de baja</Option>
                    </TableFilterSelect>
                </TableFilterInputContainer>
                <TableFilterInputContainer>
                    <TableFilterSelect
                        id='isProfessional'
                        value={
                            filters.isProfessional !== undefined
                                ? filters.isProfessional.toString()
                                : ''
                        }
                        onChange={(e) =>
                            onFiltersChange({
                                ...filters,
                                isProfessional:
                                    e.target.value === '' ? undefined : e.target.value === 'true',
                            })
                        }
                    >
                        <Option value=''>Todos</Option>
                        <Option value='true'>Es profesional</Option>
                        <Option value='false'>Es administrativo</Option>
                    </TableFilterSelect>
                </TableFilterInputContainer>
                <TableFilterInputContainer>
                    <TableFilterSelect
                        id='entityId'
                        value={selectedRole ? selectedRole.id : ''}
                        onChange={(e) => onRoleChange(e.target.value)}
                    >
                        <Option value=''>Rol</Option>
                        {roles.map((role) => (
                            <Option key={role.id} value={role.id}>
                                {role.name}
                            </Option>
                        ))}
                    </TableFilterSelect>
                </TableFilterInputContainer>
            </TableFilterFormContainer>
            {content}
        </MainContainer>
    )
}

export default StaffListView
