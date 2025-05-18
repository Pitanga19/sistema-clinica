import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { handleUpdateData } from '../../../../../shared/utils/functions'
import { PersonService } from '../../service'
import { personDefaultData } from '../../types'
import type { Person, PersonFormData } from '../../types'
import PersonFormView from '../../components/PersonForm.view'

const PersonsUpdate = () => {
    const { id } = useParams<{ id: string }>()
    const [currentPerson, setCurrentPerson] = useState<Person | null>(null)
    const [data, setData] = useState<PersonFormData>(personDefaultData)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
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

    const handleDataChange = (newData: Partial<PersonFormData>) => {
        setData((prevData) => ({ ...prevData, ...newData }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (!id || !currentPerson || !data) return

        const updateData = handleUpdateData(data, personDefaultData)

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
        <PersonFormView
            currentPerson={currentPerson}
            data={data}
            loading={loading}
            error={error}
            onDataChange={handleDataChange}
            onSubmit={handleSubmit}
        />
    )
}

export default PersonsUpdate
