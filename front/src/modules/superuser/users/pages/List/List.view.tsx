import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faAdd } from '@fortawesome/free-solid-svg-icons'
import { MainContainer } from '../../../../../shared/components/Containers'
import { Title, Text, Error } from '../../../../../shared/components/Typography'
import { BaseButton, InLineButton, DeleteButton } from '../../../../../shared/components/Buttons'
import { List, ListItem } from '../../../../../shared/components/Lists'
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

    if (loading) {
        content = <Text>Cargando users ...</Text>
    } else if (error) {
        content = <Error>{error}</Error>
    } else if (users.length === 0) {
        content = <Text>No hay users para mostrar</Text>
    } else {
        content = (
            <List>
                {users.map((user) => (
                    <ListItem key={user.id}>
                        {user.fullName}
                        <InLineButton onClick={() => onView(user.id)}>
                            <FontAwesomeIcon icon={faEye} />
                        </InLineButton>
                        <InLineButton onClick={() => onEdit(user.id)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </InLineButton>
                        <DeleteButton onClick={() => onDelete(user.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </DeleteButton>
                    </ListItem>
                ))}
            </List>
        )
    }

    return (
        <MainContainer>
            <Title>Lista de Usuarios</Title>
            <BaseButton onClick={() => onCreate()}>
                Crear Usuario <FontAwesomeIcon icon={faAdd} />
            </BaseButton>
            {content}
        </MainContainer>
    )
}

export default UsersListView
