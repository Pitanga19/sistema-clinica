import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PeopleDetailView from './Detail.view'
import { PeopleService } from '../../service'
import type { People } from '../../types'

const PeopleDetail = () => {
    const { id } = useParams<{ id: string }>()
    const [people, setPeople] = useState<People | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const loadingMsg = 'Cargando persona ...'
    const navigate = useNavigate()

    const fetchPeople = async () => {
        if (!id) {
            setError('ID no proporcionado')
            setLoading(false)
            return
        }
        try {
            const fetchedPeople = await PeopleService.getByPersonId(Number(id))
            console.log('fetchedPeople', fetchedPeople)
            setPeople(fetchedPeople)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (peopleId: number) => {
        navigate(`/people/update/${peopleId}`)
    }

    useEffect(() => {
        fetchPeople()
    }, [])

    return (
        <PeopleDetailView
            people={people}
            loading={loading}
            loadingMsg={loadingMsg}
            error={error}
            onEdit={handleEdit}
        />
    )
}

export default PeopleDetail
