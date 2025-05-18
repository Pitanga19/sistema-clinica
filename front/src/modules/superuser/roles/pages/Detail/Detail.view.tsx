import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { MainContainer } from '../../../../../shared/components/Containers'
import { Title, Subtitle, Error } from '../../../../../shared/components/Typography'
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
            <Title>Detalles del Rol</Title>
            <Subtitle>
                {loading ? loadingMsg : role.name}
                <BaseButton onClick={() => onEdit(role.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                </BaseButton>
            </Subtitle>
            <Error>{error}</Error>
        </MainContainer>
    )
}

export default RolesDetailView
