import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { MainContainer } from '../../../../../shared/components/Containers'
import { Title, Subtitle, Error } from '../../../../../shared/components/Typography'
import { BaseButton } from '../../../../../shared/components/Buttons'
import type { Mode } from "../../types"

interface ModesDetailViewProps {
    mode: Mode | null
    loading: boolean
    loadingMsg: string
    error: string | null
    onEdit: (modeId: number) => void
}

const ModesDetailView = ({
    mode,
    loading,
    loadingMsg,
    error,
    onEdit,
}: ModesDetailViewProps) => {
    if (!mode) return

    return (
        <MainContainer>
            <Title>Detalles del Modo</Title>
            <Subtitle>
                {loading ? loadingMsg : mode.name}
                <BaseButton onClick={() => onEdit(mode.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                </BaseButton>
            </Subtitle>
            <Error>{error}</Error>
        </MainContainer>
    )
}

export default ModesDetailView
