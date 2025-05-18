import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faAdd } from '@fortawesome/free-solid-svg-icons'
import { MainContainer } from '../../../../../shared/components/Containers'
import { Title, Text, Error } from '../../../../../shared/components/Typography'
import { BaseButton, InLineButton, DeleteButton } from '../../../../../shared/components/Buttons'
import { List, ListItem } from '../../../../../shared/components/Lists'
import type { Mode } from '../../types'

interface ModesListViewProps {
    modes: Mode[]
    loading: boolean
    error: string | null
    onCreate: () => void
    onView: (modeId: number) => void
    onEdit: (modeId: number) => void
    onDelete: (modeId: number) => void
}

const ModesListView = ({
    modes,
    loading,
    error,
    onCreate,
    onView,
    onEdit,
    onDelete,
}: ModesListViewProps) => {
    let content

    if (loading) {
        content = <Text>Cargando modes ...</Text>
    } else if (error) {
        content = <Error>{error}</Error>
    } else if (modes.length === 0) {
        content = <Text>No hay modes para mostrar</Text>
    } else {
        content = (
            <List>
                {modes.map((mode) => (
                    <ListItem key={mode.id}>
                        {mode.name}
                        <InLineButton onClick={() => onView(mode.id)}>
                            <FontAwesomeIcon icon={faEye} />
                        </InLineButton>
                        <InLineButton onClick={() => onEdit(mode.id)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </InLineButton>
                        <DeleteButton onClick={() => onDelete(mode.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </DeleteButton>
                    </ListItem>
                ))}
            </List>
        )
    }

    return (
        <MainContainer className='main_container'>
            <Title>Lista de Modos</Title>
            <BaseButton onClick={() => onCreate()}>
                Crear Modo <FontAwesomeIcon icon={faAdd} />
            </BaseButton>
            {content}
        </MainContainer>
    )
}

export default ModesListView
