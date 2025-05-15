import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faAdd } from '@fortawesome/free-solid-svg-icons'
import type { Entity } from '../../types'

interface EntitiesListViewProps {
    entities: Entity[]
    loading: boolean
    error: string | null
    onCreate: () => void
    onView: (entityId: number) => void
    onEdit: (entityId: number) => void
    onDelete: (entityId: number) => void
}

const EntitiesListView = ({
    entities,
    loading,
    error,
    onCreate,
    onView,
    onEdit,
    onDelete,
}: EntitiesListViewProps) => {
    let content

    if (loading) {
        content = <p>Cargando obras sociales ...</p>
    } else if (error) {
        content = <p className='error'>{error}</p>
    } else if (entities.length === 0) {
        content = <p>No hay obras sociales para mostrar</p>
    } else {
        content = (
            <ul>
                {entities.map((entity) => (
                    <li key={entity.id}>
                        {entity.name}
                        <button onClick={() => onView(entity.id)}>
                            <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button onClick={() => onEdit(entity.id)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button onClick={() => onDelete(entity.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div className='main_container'>
            <h1>Lista de Obras Sociales</h1>
            <button onClick={() => onCreate()}>
                Crear Obra Social <FontAwesomeIcon icon={faAdd} />
            </button>
            {content}
        </div>
    )
}

export default EntitiesListView
