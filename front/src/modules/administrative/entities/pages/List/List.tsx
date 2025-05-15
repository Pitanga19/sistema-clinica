import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { EntityService } from '../../service'
import type { Entity } from '../../types'
import EntitiesListView from './List.view'

const EntitiesList = () => {
    const [entities, setEntities] = useState<Entity[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const fetchEntities = async () => {
        try {
            setEntities(await EntityService.getAll())
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEntities()
    }, [])

    const handleCreate = () => navigate('/entities/create')

    const handleView = (entityId: number) => navigate(`/entities/detail/${entityId}`)

    const handleEdit = (entityId: number) => navigate(`/entities/update/${entityId}`)

    const handleDelete = async (entityId: number) => {
        try {
            if (!confirm('Confirma que desea eliminar este rol?')) return
            if (!confirm('Está seguro?')) return
            if (!confirm('Muy seguro?')) return
            await EntityService.delete(entityId)
        } catch (error) {
            setError(`${error}`)
        }
    }

    return (
        <EntitiesListView
            entities={entities}
            loading={loading}
            error={error}
            onCreate={handleCreate}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    )
}

export default EntitiesList
