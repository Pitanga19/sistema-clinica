import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EntityService } from '../../service'
import type { EntityCreate } from '../../types'
import EntitiesCreateView from './Create.view'

const EntitiesCreate = () => {
    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const newEntityData: EntityCreate = {
            name,
        }

        try {
            const newEntity = await EntityService.create(newEntityData)
            navigate(`/entities/detail/${newEntity.id}`)
        } catch (error) {
            setError(`${error}`)
        }
    }

    return (
        <EntitiesCreateView name={name} error={error} onNameChange={setName} onSubmit={handleSubmit} />
    )
}

export default EntitiesCreate
