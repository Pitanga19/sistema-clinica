import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { MainContainer } from '../../../../../shared/components/Containers'
import { BaseButton } from '../../../../../shared/components/Buttons'
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
        <MainContainer className='main_container'>
            <h1>Detalles del Rol</h1>
            <h2>{loading ? loadingMsg : role.name}</h2>
            <BaseButton onClick={() => onEdit(role.id)}>
                <FontAwesomeIcon icon={faEdit} />
            </BaseButton>
            {error && <p className='error'>{error}</p>}
        </MainContainer>
    )
}

export default RolesDetailView
