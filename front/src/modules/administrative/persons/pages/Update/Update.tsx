import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PersonsUpdateView from './Update.view'
import { PersonService } from '../../service'
import type { Person, PersonUpdate } from '../../types'

const PersonsUpdate = () => {
    const { id } = useParams<{ id: string }>()
    const [currentPerson, setCurrentPerson] = useState<Person | null>(null)
    const [updateData, setUpdateData] = useState<PersonUpdate | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const loadingMsg = 'Cargando ...'
    const navigate = useNavigate()

    const fetchPerson = async () => {
        if (!id) {
            setError('ID no proporcionado')
            setLoading(false)
            return
        }
        try {
            setCurrentPerson(await PersonService.getById(Number(id)))
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (!id || !currentPerson || !updateData) return

        try {
            await PersonService.update(Number(id), updateData)
            navigate(`/persons/detail/${id}`)
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPerson()
    }, [])

    return (
        <PersonsUpdateView
            currentPerson={currentPerson}
            updateData={updateData}
            loading={loading}
            loadingMsg={loadingMsg}
            error={error}
            onUpdateDataChange={setUpdateData}
            onSubmit={handleSubmit}
        />
    )
}

export default PersonsUpdate
