import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PersonService } from '../../service'
import type { Person } from '../../types'
import PersonsListView from './List.view'

const PersonsList = () => {
    const [persons, setPersons] = useState<Person[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const fetchPersons = async () => {
        try {
            setPersons(await PersonService.getAll())
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPersons()
    }, [])

    const handleCreate = () => navigate('/persons/create')

    const handleView = (personId: number) => navigate(`/persons/detail/${personId}`)

    const handleEdit = (personId: number) => navigate(`/persons/update/${personId}`)

    const handleDelete = async (personId: number) => {
        try {
            if (!confirm('Confirma que desea eliminar este usuario?')) return
            if (!confirm('Está seguro?')) return
            if (!confirm('Muy seguro?')) return
            await PersonService.delete(personId)
        } catch (error) {
            setError(`${error}`)
        }
    }

    return (
        <PersonsListView
            persons={persons}
            loading={loading}
            error={error}
            onCreate={handleCreate}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    )
}

export default PersonsList
