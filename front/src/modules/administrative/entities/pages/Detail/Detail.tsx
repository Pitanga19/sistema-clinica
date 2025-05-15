import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EntityService } from '../../service'
import EntitiesDetailView from './Detail.view'
import type { Entity } from '../../types'

const EntitiesDetail = () => {
    const { id } = useParams<{ id: string }>()
    const [entity, setEntity] = useState<Entity | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const loadingMsg = 'Cargando obra social ...'
    const navigate = useNavigate()

    const handleEdit = (entityId: number) => navigate(`/entities/update/${entityId}`)

    const fetchEntity = async () => {
        try {
            if (!id) {
                throw new Error('ID no proporcionado')
            }
            setEntity(await EntityService.getById(Number(id)))
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEntity()
    }, [])

    return <EntitiesDetailView
        entity={entity}
        loading={loading}
        loadingMsg={loadingMsg}
        error={error}
        onEdit={handleEdit}
    />
}

export default EntitiesDetail
