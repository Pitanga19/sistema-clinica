import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { MainContainer } from '../../../../../shared/components/Containers'
import { Title, Subtitle, Error } from '../../../../../shared/components/Typography'
import { BaseButton, InLineButton } from '../../../../../shared/components/Buttons'
import { List, ListItem, DetailItem, DetailTitle, DetailDescription } from '../../../../../shared/components/Lists'
import type { Plan } from "../../types"
import type { Entity } from '../../../entities/types'

interface PlansDetailViewProps {
    plan: Plan | null
    entity: Entity | null
    loading: boolean
    loadingMsg: string
    error: string | null
    onEntityDetail: (entityId: number) => void
    onEdit: (planId: number) => void
}

const PlansDetailView = ({
    plan,
    entity,
    loading,
    loadingMsg,
    error,
    onEntityDetail,
    onEdit,
}: PlansDetailViewProps) => {
    if (!plan || !entity) return

    return (
        <MainContainer>
            <Title>Detalles del Plan</Title>
            <Subtitle>
                {loading ? loadingMsg : plan.name}
                <BaseButton onClick={() => onEdit(plan.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                </BaseButton>
            </Subtitle>
            <List>
                <DetailItem>
                    <DetailTitle>Obra Social</DetailTitle>
                    <DetailDescription>
                        <List>
                            <ListItem>
                                {entity.name}
                                <InLineButton onClick={() => onEntityDetail(entity.id)}>
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </InLineButton>
                            </ListItem>
                        </List>
                    </DetailDescription>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Pacientes</DetailTitle>
                    <DetailDescription>
                        <List>
                            <ListItem>
                                Pacientes de {plan.name} <i>(próximamente ...)</i>
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

export default PlansDetailView
