import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { booleanToString } from '../../../../../shared/utils/functions'
import { MainContainer } from '../../../../../shared/components/Containers'
import { Title, Subtitle, Error } from '../../../../../shared/components/Typography'
import { List, DetailItem, DetailTitle, DetailDescription } from '../../../../../shared/components/Lists'
import { BaseButton } from '../../../../../shared/components/Buttons'
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
        <MainContainer>
            <Title>Detalle de Usuario</Title>
            <Subtitle>
                {loading ? loadingMsg : user.fullName}
                <BaseButton onClick={() => onEdit(user.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                </BaseButton>
            </Subtitle>
            <List className='user_detail'>
                <DetailItem>
                    <DetailTitle>Legajo</DetailTitle>
                    <DetailDescription>{user.id}</DetailDescription>
                </DetailItem>

                <DetailItem>
                    <DetailTitle>Usuario</DetailTitle>
                    <DetailDescription>{user.username}</DetailDescription>
                </DetailItem>

                <DetailItem>
                    <DetailTitle>Nombre Completo</DetailTitle>
                    <DetailDescription>{user.fullName}</DetailDescription>
                </DetailItem>

                <DetailItem>
                    <DetailTitle>Es activo</DetailTitle>
                    <DetailDescription>{booleanToString(user.isActive)}</DetailDescription>
                </DetailItem>

                <DetailItem>
                    <DetailTitle>Es superusuario</DetailTitle>
                    <DetailDescription>{booleanToString(user.isSuperuser)}</DetailDescription>
                </DetailItem>

                <DetailItem>
                    <DetailTitle>Rol</DetailTitle>
                    <DetailDescription>{roles.find((role) => role.id === user.roleId)?.name}</DetailDescription>
                </DetailItem>
            </List>
            <Error>{error}</Error>
        </MainContainer>
    )
}

export default UsersDetailView
