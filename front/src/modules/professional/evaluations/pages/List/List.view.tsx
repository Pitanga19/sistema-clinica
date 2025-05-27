import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faAdd } from '@fortawesome/free-solid-svg-icons'
import { MainContainer } from '../../../../../shared/components/Containers'
import { Title, Text, Error } from '../../../../../shared/components/Typography'
import { BaseButton, InLineButton, DeleteButton } from '../../../../../shared/components/Buttons'
import { List, ListItem } from '../../../../../shared/components/Lists'
import type { Evaluation } from '../../types'

interface EvaluationsListViewProps {
    evaluations: Evaluation[]
    loading: boolean
    error: string | null
    onCreate: () => void
    onView: (evaluationId: number) => void
    onEdit: (evaluationId: number) => void
    onDelete: (evaluationId: number) => void
}

const EvaluationsListView = ({
    evaluations,
    loading,
    error,
    onCreate,
    onView,
    onEdit,
    onDelete,
}: EvaluationsListViewProps) => {
    let content

    if (loading) {
        content = <Text>Cargando evaluaciones ...</Text>
    } else if (error) {
        content = <Error>{error}</Error>
    } else if (evaluations.length === 0) {
        content = <Text>No hay evaluaciones para mostrar</Text>
    } else {
        content = (
            <List>
                {evaluations.map((evaluation) => (
                    <ListItem key={evaluation.id}>
                        {evaluation.people?.lastName}, {evaluation.people?.firstName} - {evaluation.professionalId} - {evaluation.closedAt ? 'Cerrada' : 'Abierta'}
                        <InLineButton onClick={() => onView(evaluation.id)}>
                            <FontAwesomeIcon icon={faEye} />
                        </InLineButton>
                        <InLineButton onClick={() => onEdit(evaluation.id)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </InLineButton>
                        <DeleteButton onClick={() => onDelete(evaluation.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </DeleteButton>
                    </ListItem>
                ))}
            </List>
        )
    }

    return (
        <MainContainer>
            <Title>Lista de Evaluaciones</Title>
            <BaseButton onClick={() => onCreate()}>
                Crear Evaluación <FontAwesomeIcon icon={faAdd} />
            </BaseButton>
            {content}
        </MainContainer>
    )
}

export default EvaluationsListView
