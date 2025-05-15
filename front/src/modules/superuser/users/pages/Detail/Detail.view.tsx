import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { booleanToString } from '../../utils'
import type { Role } from '../../../roles/types'
import type { User } from '../../types'

interface UsersDetailViewProps {
    user: User | null
    roles: Role[]
    loading: boolean
    loadingMsg: string
    error: string | null
    onEdit: (userId: number) => void
}

const UsersDetailView = ({
    user,
    roles,
    loading,
    loadingMsg,
    error,
    onEdit,
}: UsersDetailViewProps) => {
    if (!user) return

    return (
        <div className='main_container'>
            <h1>Detalle de Usuario</h1>
            <h2>{loading ? loadingMsg : user.fullName}</h2>
            <button onClick={() => onEdit(user.id)}>
                <FontAwesomeIcon icon={faEdit} />
            </button>
            <dl className='user_detail'>
                <dt>Legajo</dt>
                <dd>{user.id}</dd>

                <dt>Usuario</dt>
                <dd>{user.username}</dd>

                <dt>Nombre Completo</dt>
                <dd>{user.fullName}</dd>

                <dt>Es activo</dt>
                <dd>{booleanToString(user.isActive)}</dd>

                <dt>Es superusuario</dt>
                <dd>{booleanToString(user.isSuperuser)}</dd>

                <dt>Rol</dt>
                <dd>{roles.find((role) => role.id === user.roleId)?.name}</dd>
            </dl>
            {error && <p className='error'>{error}</p>}
        </div>
    )
}

export default UsersDetailView
