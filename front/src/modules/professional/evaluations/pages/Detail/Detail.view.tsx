import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { MainContainer } from '../../../../../shared/components/Containers'
import { Title, Subtitle, Error } from '../../../../../shared/components/Typography'
import { BaseButton, InLineButton } from '../../../../../shared/components/Buttons'
import { List, ListItem, DetailItem, DetailTitle, DetailDescription } from '../../../../../shared/components/Lists'
import type { Evaluation } from "../../types"

interface EvaluationsDetailViewProps {
    evaluation: Evaluation | null
    loading: boolean
    loadingMsg: string
    error: string | null
    onEdit: (evaluationId: number) => void
}

const EvaluationsDetailView = ({
    evaluation,
    loading,
    loadingMsg,
    error,
    onEdit,
}: EvaluationsDetailViewProps) => {
    if (!evaluation) return

    return (
        <MainContainer>
            <Title>Detalles de la Evaluación</Title>
            <Subtitle>
                {loading ? loadingMsg : `${evaluation.people?.lastName}, ${evaluation.people?.firstName}`}
                <BaseButton onClick={() => onEdit(evaluation.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                </BaseButton>
            </Subtitle>
            <List>
                <DetailItem>
                    <DetailTitle>Evolución</DetailTitle>
                    <DetailDescription>
                        {evaluation.report}
                    </DetailDescription>
                </DetailItem>
                <DetailItem>
                    <DetailTitle>Profesional</DetailTitle>
                    <DetailDescription>
                        {evaluation.professionalId}
                    </DetailDescription>
                </DetailItem>
            </List>
            <Error>{error}</Error>
        </MainContainer>
    )
}

export default EvaluationsDetailView
