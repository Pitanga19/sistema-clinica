import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PersonService } from '../../service'
import { personDefaultData } from '../../types'
import type { PersonFormData } from '../../types'
import PersonFormView from '../../components/PersonForm.view'

const PersonsCreate = () => {
    const [data, setData] = useState<PersonFormData>(personDefaultData)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleDataChange = (newData: Partial<PersonFormData>) => {
        setData((prevData) => ({ ...prevData, ...newData }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            console.log('Enviando nueva persona:', data)
            const newPerson = await PersonService.create(data)
            navigate(`/persons/detail/${newPerson.id}`)
        } catch (error) {
            setError(`${error}`)
        }
    }

    return (
        <PersonFormView
            currentPerson={null}
            data={data}
            loading={false}
            error={error}
            onDataChange={handleDataChange}
            onSubmit={handleSubmit}
        />
    )
}

export default PersonsCreate
