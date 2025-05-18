import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faAdd } from '@fortawesome/free-solid-svg-icons'
import { MainContainer } from '../../../../../shared/components/Containers'
import { Title, Text, Error } from '../../../../../shared/components/Typography'
import { BaseButton, InLineButton, DeleteButton } from '../../../../../shared/components/Buttons'
import { List, ListItem } from '../../../../../shared/components/Lists'
import type { Person } from '../../types'

interface PersonsListViewProps {
    persons: Person[]
    loading: boolean
    error: string | null
    onCreate: () => void
    onView: (personId: number) => void
    onEdit: (personId: number) => void
    onDelete: (personId: number) => void
}

const PersonsListView = ({
    persons,
    loading,
    error,
    onCreate,
    onView,
    onEdit,
    onDelete,
}: PersonsListViewProps) => {
    let content

    if (loading) {
        content = <Text>Cargando personas ...</Text>
    } else if (error) {
        content = <Error>{error}</Error>
    } else if (persons.length === 0) {
        content = <Text>No hay personas para mostrar</Text>
    } else {
        content = (
            <List>
                {persons.map((person) => (
                    <ListItem key={person.id}>
                        {person.firstName} {person.lastName}
                        <InLineButton onClick={() => onView(person.id)}>
                            <FontAwesomeIcon icon={faEye} />
                        </InLineButton>
                        <InLineButton onClick={() => onEdit(person.id)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </InLineButton>
                        <DeleteButton onClick={() => onDelete(person.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </DeleteButton>
                    </ListItem>
                ))}
            </List>
        )
    }

    return (
        <MainContainer>
            <Title>Lista de Personas</Title>
            <BaseButton onClick={() => onCreate()}>
                Crear Persona <FontAwesomeIcon icon={faAdd} />
            </BaseButton>
            {content}
        </MainContainer>
    )
}

export default PersonsListView
