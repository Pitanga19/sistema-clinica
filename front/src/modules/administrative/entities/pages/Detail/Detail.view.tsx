import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import type { Entity } from "../../types"

interface EntitiesDetailViewProps {
    entity: Entity | null
    loading: boolean
    loadingMsg: string
    error: string | null
    onEdit: (entityId: number) => void
}

const EntitiesDetailView = ({
    entity,
    loading,
    loadingMsg,
    error,
    onEdit,
}: EntitiesDetailViewProps) => {
    if (!entity) return

    return (
        <div className='main_container'>
            <h1>Detalles de la Obra Social</h1>
            <h2>{loading ? loadingMsg : entity.name}</h2>
            <button onClick={() => onEdit(entity.id)}>
                <FontAwesomeIcon icon={faEdit} />
            </button>
            {error && <p className='error'>{error}</p>}
        </div>
    )
}

export default EntitiesDetailView
