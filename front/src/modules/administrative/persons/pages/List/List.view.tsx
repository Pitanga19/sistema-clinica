import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash, faAdd } from '@fortawesome/free-solid-svg-icons'
import type { Person } from '../../types'

interface PersonsListViewProps {
    persons: Person[]
    loading: boolean
    error: string | null
    onCreate: () => void
    onView: (personId: number) => void
    onEdit: (personId: number) => void
    onDelete: (personId: number) => void
}

const PersonsListView = ({
    persons,
    loading,
    error,
    onCreate,
    onView,
    onEdit,
    onDelete,
}: PersonsListViewProps) => {
    let content

    if (loading) {
        content = <p>Cargando personas ...</p>
    } else if (error) {
        content = <p className='error'>{error}</p>
    } else if (persons.length === 0) {
        content = <p>No hay personas para mostrar</p>
    } else {
        content = (
            <ul>
                {persons.map((person) => (
                    <li key={person.id}>
                        {person.firstName} {person.lastName}
                        <button onClick={() => onView(person.id)}>
                            <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button onClick={() => onEdit(person.id)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button onClick={() => onDelete(person.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div className='main_container'>
            <button onClick={() => onCreate()}>
                Crear Persona <FontAwesomeIcon icon={faAdd} />
            </button>
            <h1>Lista de Personas</h1>
            {content}
        </div>
    )
}

export default PersonsListView
