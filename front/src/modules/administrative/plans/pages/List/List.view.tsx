import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faAdd } from '@fortawesome/free-solid-svg-icons'
import { MainContainer } from '../../../../../shared/components/Containers'
import { BaseButton, InLineButton, DeleteButton } from '../../../../../shared/components/Buttons'
import { List, ListItem } from '../../../../../shared/components/Lists'
import type { Plan } from '../../types'

interface PlansListViewProps {
    plans: Plan[]
    loading: boolean
    error: string | null
    onCreate: () => void
    onView: (planId: number) => void
    onEdit: (planId: number) => void
    onDelete: (planId: number) => void
}

const PlansListView = ({
    plans,
    loading,
    error,
    onCreate,
    onView,
    onEdit,
    onDelete,
}: PlansListViewProps) => {
    let content

    if (loading) {
        content = <p>Cargando planes ...</p>
    } else if (error) {
        content = <p className='error'>{error}</p>
    } else if (plans.length === 0) {
        content = <p>No hay planes para mostrar</p>
    } else {
        content = (
            <List>
                {plans.map((plan) => (
                    <ListItem key={plan.id}>
                        {plan.name}
                        <InLineButton onClick={() => onView(plan.id)}>
                            <FontAwesomeIcon icon={faEye} />
                        </InLineButton>
                        <InLineButton onClick={() => onEdit(plan.id)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </InLineButton>
                        <DeleteButton onClick={() => onDelete(plan.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </DeleteButton>
                    </ListItem>
                ))}
            </List>
        )
    }

    return (
        <MainContainer>
            <h1>Lista de Planes</h1>
            <BaseButton onClick={() => onCreate()}>
                Crear Plan <FontAwesomeIcon icon={faAdd} />
            </BaseButton>
            {content}
        </MainContainer>
    )
}

export default PlansListView
