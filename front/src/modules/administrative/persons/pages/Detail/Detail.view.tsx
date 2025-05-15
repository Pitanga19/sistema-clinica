import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { handleOptionalProp } from '../../../../../shared/utils/functions'
import type { Person } from '../../types'

interface PersonsDetailViewProps {
    person: Person | null
    loading: boolean
    loadingMsg: string
    error: string | null
    onEdit: (personId: number) => void
}

const PersonsDetailView = ({
    person,
    loading,
    loadingMsg,
    error,
    onEdit,
}: PersonsDetailViewProps) => {
    if (!person) return

    return (
        <div className='main_container'>
            <h1>Detalle de Persona</h1>
            <h2>{loading ? loadingMsg : (`${person.firstName} ${person.lastName}`)}</h2>
            <button onClick={() => onEdit(person.id)}>
                <FontAwesomeIcon icon={faEdit} />
            </button>
            <dl className='person_detail'>
                <dt>DNI</dt>
                <dd>{person.id}</dd>

                <dt>Nombre</dt>
                <dd>{person.firstName}</dd>

                <dt>Apellido</dt>
                <dd>{person.lastName}</dd>

                <dt>Teléfono 1</dt>
                <dd>{person.phone1}</dd>

                <dt>Teléfono 2</dt>
                <dd>{handleOptionalProp(person.phone2)}</dd>

                <dt>E-mail</dt>
                <dd>{handleOptionalProp(person.email)}</dd>

                <dt>Dirección</dt>
                <dd>{person.address}</dd>
            </dl>
            {error && <p className='error'>{error}</p>}
        </div>
    )
}

export default PersonsDetailView
