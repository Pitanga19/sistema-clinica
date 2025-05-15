import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PersonsDetailView from './Detail.view'
import { PersonService } from '../../service'
import type { Person } from '../../types'

const PersonsDetail = () => {
    const { id } = useParams<{ id: string }>()
    const [person, setPerson] = useState<Person | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const loadingMsg = 'Cargando persona ...'
    const navigate = useNavigate()

    const fetchPerson = async () => {
        if (!id) {
            setError('ID no proporcionado')
            setLoading(false)
            return
        }
        try {
            setPerson(await PersonService.getById(Number(id)))
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (personId: number) => navigate(`/persons/update/${personId}`)

    useEffect(() => {
        fetchPerson()
    }, [])

    return (
        <PersonsDetailView
            person={person}
            loading={loading}
            loadingMsg={loadingMsg}
            error={error}
            onEdit={handleEdit}
        />
    )
}

export default PersonsDetail
