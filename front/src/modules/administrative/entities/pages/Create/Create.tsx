import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EntityService } from '../../service'
import type { EntityCreate } from '../../types'
import EntityFormView from '../../components/EntityForm.view'

const EntitiesCreate = () => {
    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleDataChange = (data: Partial<EntityCreate>) => {
        setName(data.name || '')
    }

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
        <EntityFormView
            currentEntity={null}
            data={{ name }}
            loading={false}
            error={error}
            onDataChange={handleDataChange}
            onSubmit={handleSubmit}
        />
    )
}

export default EntitiesCreate
