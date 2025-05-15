import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import type { Role } from "../../types"

interface RolesDetailViewProps {
    role: Role | null
    loading: boolean
    loadingMsg: string
    error: string | null
    onEdit: (roleId: number) => void
}

const RolesDetailView = ({
    role,
    loading,
    loadingMsg,
    error,
    onEdit,
}: RolesDetailViewProps) => {
    if (!role) return

    return (
        <div className='main_container'>
            <h1>Detalles del Rol</h1>
            <h2>{loading ? loadingMsg : role.name}</h2>
            <button onClick={() => onEdit(role.id)}>
                <FontAwesomeIcon icon={faEdit} />
            </button>
            {error && <p className='error'>{error}</p>}
        </div>
    )
}

export default RolesDetailView
