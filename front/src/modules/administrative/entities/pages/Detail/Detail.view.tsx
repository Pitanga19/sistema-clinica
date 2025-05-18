import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { MainContainer } from '../../../../../shared/components/Containers'
import { Title, Subtitle, Error } from '../../../../../shared/components/Typography'
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
    onGoToNewPlan: () => void
}

const EntitiesDetailView = ({
    entity,
    plans,
    loading,
    loadingMsg,
    error,
    onEdit,
    onGoToPlan,
    onGoToNewPlan,
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
            <Title>Detalles de la Obra Social</Title>
            <Subtitle>
                {loading ? loadingMsg : entity.name}
                <BaseButton onClick={() => onEdit(entity.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                </BaseButton>
            </Subtitle>
            <List>
                <DetailItem>
                    <DetailTitle>Planes</DetailTitle>
                    <DetailDescription>
                        <List>
                            <ListItem>
                                Nuevo plan
                                <InLineButton>
                                    <FontAwesomeIcon onClick={() => onGoToNewPlan()} icon={faArrowRight} />
                                </InLineButton>
                            </ListItem>
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
            <Error>{error}</Error>
        </MainContainer>
    )
}

export default EntitiesDetailView
