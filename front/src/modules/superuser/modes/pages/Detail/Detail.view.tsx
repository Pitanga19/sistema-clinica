import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
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
        <div className='main_container'>
            <h1>Detalles del Mod</h1>
            <h2>{loading ? loadingMsg : mode.name}</h2>
            <button onClick={() => onEdit(mode.id)}>
                <FontAwesomeIcon icon={faEdit} />
            </button>
            {error && <p className='error'>{error}</p>}
        </div>
    )
}

export default ModesDetailView
