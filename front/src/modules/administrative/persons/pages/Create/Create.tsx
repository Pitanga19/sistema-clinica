import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PersonService } from '../../service'
import PersonsCreateView from './Create.view'
import type { PersonCreate } from '../../types'

const PersonsCreate = () => {
    const [personData, setPersonData] = useState<PersonCreate>({
        id: 0,
        firstName: '',
        lastName: '',
        phone1: '',
        phone2: '',
        email: '',
        address: '',
    })
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            const newPerson = await PersonService.create(personData)
            navigate(`/persons/detail/${newPerson.id}`)
        } catch (error) {
            setError(`${error}`)
        }
    }

    return (
        <PersonsCreateView
            personData={personData}
            error={error}
            onPersonDataChange={setPersonData}
            onSubmit={handleSubmit}
        />
    )
}

export default PersonsCreate
