import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faAdd } from '@fortawesome/free-solid-svg-icons'
import type { User } from '../../types'

interface UsersListViewProps {
    users: User[]
    loading: boolean
    error: string | null
    onCreate: () => void
    onView: (userId: number) => void
    onEdit: (userId: number) => void
    onDelete: (userId: number) => void
}

const UsersListView = ({
    users,
    loading,
    error,
    onCreate,
    onView,
    onEdit,
    onDelete,
}: UsersListViewProps) => {
    let content
    console.log('Users: ', users)

    if (loading) {
        content = <p>Cargando users ...</p>
    } else if (error) {
        content = <p className='error'>{error}</p>
    } else if (users.length === 0) {
        content = <p>No hay users para mostrar</p>
    } else {
        content = (
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.fullName}
                        <button onClick={() => onView(user.id)}>
                            <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button onClick={() => onEdit(user.id)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button onClick={() => onDelete(user.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div className='main_container'>
            <button onClick={() => onCreate()}>
                Crear Usuario <FontAwesomeIcon icon={faAdd} />
            </button>
            <h1>Lista de Users</h1>
            {content}
        </div>
    )
}

export default UsersListView
