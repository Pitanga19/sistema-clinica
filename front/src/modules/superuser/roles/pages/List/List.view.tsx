import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faAdd } from '@fortawesome/free-solid-svg-icons'
import { MainContainer } from '../../../../../shared/components/Containers'
import { BaseButton, InLineButton, DeleteButton } from '../../../../../shared/components/Buttons'
import { List, ListItem } from '../../../../../shared/components/Lists'
import type { Role } from '../../types'

interface RolesListViewProps {
    roles: Role[]
    loading: boolean
    error: string | null
    onCreate: () => void
    onView: (roleId: number) => void
    onEdit: (roleId: number) => void
    onDelete: (roleId: number) => void
}

const RolesListView = ({
    roles,
    loading,
    error,
    onCreate,
    onView,
    onEdit,
    onDelete,
}: RolesListViewProps) => {
    let content

    if (loading) {
        content = <p>Cargando roles ...</p>
    } else if (error) {
        content = <p className='error'>{error}</p>
    } else if (roles.length === 0) {
        content = <p>No hay roles para mostrar</p>
    } else {
        content = (
            <List>
                {roles.map((role) => (
                    <ListItem key={role.id}>
                        {role.name}
                        <InLineButton onClick={() => onView(role.id)}>
                            <FontAwesomeIcon icon={faEye} />
                        </InLineButton>
                        <InLineButton onClick={() => onEdit(role.id)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </InLineButton>
                        <DeleteButton onClick={() => onDelete(role.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </DeleteButton>
                    </ListItem>
                ))}
            </List>
        )
    }

    return (
        <MainContainer>
            <h1>Lista de Roles</h1>
            <BaseButton onClick={() => onCreate()}>
                Crear Rol <FontAwesomeIcon icon={faAdd} />
            </BaseButton>
            {content}
        </MainContainer>
    )
}

export default RolesListView
