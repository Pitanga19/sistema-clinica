import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { MainContainer } from '../../../../../shared/components/Containers'
import { BaseButton, InLineButton } from '../../../../../shared/components/Buttons'
import { List, ListItem, DetailItem, DetailTitle, DetailDescription } from '../../../../../shared/components/Lists'
import type { Entity } from "../../types"
import type { Plan } from '../../../plans/types'

interface EntitiesDetailViewProps {
    entity: Entity | null
    plans: Plan[]
    loading: boolean
    loadingMsg: string
    error: string | null
    onEdit: (entityId: number) => void
    onGoToPlan: (planId: number) => void
}

const EntitiesDetailView = ({
    entity,
    plans,
    loading,
    loadingMsg,
    error,
    onEdit,
    onGoToPlan,
}: EntitiesDetailViewProps) => {
    if (!entity) return

    const plansList = plans.map((plan) => (
        <ListItem>
            {plan.name}
            <InLineButton onClick={() => onGoToPlan(plan.id)}>
                <FontAwesomeIcon icon={faArrowRight} />
            </InLineButton>
        </ListItem>
    ))

    return (
        <MainContainer>
            <h1>Detalles de la Obra Social</h1>
            <h2>{loading ? loadingMsg : entity.name}</h2>
            <BaseButton onClick={() => onEdit(entity.id)}>
                <FontAwesomeIcon icon={faEdit} />
            </BaseButton>
            <List>
                <DetailItem>
                    <DetailTitle>Planes</DetailTitle>
                    <DetailDescription>
                        <List>
                            {plansList}
                        </List>
                    </DetailDescription>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Pacientes</DetailTitle>
                    <DetailDescription>
                        <List>
                            <ListItem>
                                Pacientes de {entity.name} <i>(próximamente ...)</i>
                                <InLineButton>
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </InLineButton>
                            </ListItem>
                        </List>
                    </DetailDescription>
                </DetailItem>
            </List>
            {error && <p className='error'>{error}</p>}
        </MainContainer>
    )
}

export default EntitiesDetailView
