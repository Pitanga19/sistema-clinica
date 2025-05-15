import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faAdd } from '@fortawesome/free-solid-svg-icons'
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
            <ul>
                {roles.map((role) => (
                    <li key={role.id}>
                        {role.name}
                        <button onClick={() => onView(role.id)}>
                            <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button onClick={() => onEdit(role.id)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button onClick={() => onDelete(role.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div className='main_container'>
            <h1>Lista de Roles</h1>
            <button onClick={() => onCreate()}>
                Crear Rol <FontAwesomeIcon icon={faAdd} />
            </button>
            {content}
        </div>
    )
}

export default RolesListView
