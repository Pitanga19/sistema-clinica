import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faAdd } from '@fortawesome/free-solid-svg-icons'
import { MainContainer } from '../../../../../shared/components/Containers'
import { Title, Text, Error } from '../../../../../shared/components/Typography'
import { BaseButton, InLineButton, DeleteButton } from '../../../../../shared/components/Buttons'
import { List, ListItem } from '../../../../../shared/components/Lists'
import type { Entity } from '../../types'

interface EntitiesListViewProps {
    entities: Entity[]
    loading: boolean
    error: string | null
    onCreate: () => void
    onView: (entityId: number) => void
    onEdit: (entityId: number) => void
    onDelete: (entityId: number) => void
}

const EntitiesListView = ({
    entities,
    loading,
    error,
    onCreate,
    onView,
    onEdit,
    onDelete,
}: EntitiesListViewProps) => {
    let content

    if (loading) {
        content = <Text>Cargando obras sociales ...</Text>
    } else if (error) {
        content = <Error>{error}</Error>
    } else if (entities.length === 0) {
        content = <Text>No hay obras sociales para mostrar</Text>
    } else {
        content = (
            <List>
                {entities.map((entity) => (
                    <ListItem key={entity.id}>
                        {entity.name}
                        <InLineButton onClick={() => onView(entity.id)}>
                            <FontAwesomeIcon icon={faEye} />
                        </InLineButton>
                        <InLineButton onClick={() => onEdit(entity.id)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </InLineButton>
                        <DeleteButton onClick={() => onDelete(entity.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </DeleteButton>
                    </ListItem>
                ))}
            </List>
        )
    }

    return (
        <MainContainer>
            <Title>Lista de Obras Sociales</Title>
            <BaseButton onClick={() => onCreate()}>
                Crear Obra Social <FontAwesomeIcon icon={faAdd} />
            </BaseButton>
            {content}
        </MainContainer>
    )
}

export default EntitiesListView
