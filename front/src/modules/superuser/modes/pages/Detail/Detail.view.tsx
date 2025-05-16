import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { MainContainer } from '../../../../../shared/components/Containers'
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
            <h1>Detalles del Modo</h1>
            <h2>{loading ? loadingMsg : mode.name}</h2>
            <BaseButton onClick={() => onEdit(mode.id)}>
                <FontAwesomeIcon icon={faEdit} />
            </BaseButton>
            {error && <p className='error'>{error}</p>}
        </MainContainer>
    )
}

export default ModesDetailView
