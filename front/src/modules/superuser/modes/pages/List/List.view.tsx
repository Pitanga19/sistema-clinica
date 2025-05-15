import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faAdd } from '@fortawesome/free-solid-svg-icons'
import type { Mode } from '../../types'

interface ModesListViewProps {
    modes: Mode[]
    loading: boolean
    error: string | null
    onCreate: () => void
    onView: (modeId: number) => void
    onEdit: (modeId: number) => void
    onDelete: (modeId: number) => void
}

const ModesListView = ({
    modes,
    loading,
    error,
    onCreate,
    onView,
    onEdit,
    onDelete,
}: ModesListViewProps) => {
    let content

    if (loading) {
        content = <p>Cargando modos ...</p>
    } else if (error) {
        content = <p className='error'>{error}</p>
    } else if (modes.length === 0) {
        content = <p>No hay modos para mostrar</p>
    } else {
        content = (
            <ul>
                {modes.map((mode) => (
                    <li key={mode.id}>
                        {mode.name}
                        <button onClick={() => onView(mode.id)}>
                            <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button onClick={() => onEdit(mode.id)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button onClick={() => onDelete(mode.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div className='main_container'>
            <h1>Lista de Modos</h1>
            <button onClick={() => onCreate()}>
                Crear Modo <FontAwesomeIcon icon={faAdd} />
            </button>
            {content}
        </div>
    )
}

export default ModesListView
