import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EntityService } from '../../service'
import type { Entity, EntityUpdate } from '../../types'
import EntitiesUpdateView from './Update.view'

const EntitiesUpdate = () => {
    const { id } = useParams<{ id: string }>()
    const [currentEntity, setCurrentEntity] = useState<Entity | null>(null)
    const [updateData, setUpdateData] = useState<EntityUpdate | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const loadingMsg = 'Cargando obra social ...'
    const navigate = useNavigate()

    useEffect(() => {
        const fetchEntity = async () => {
            try {
                if (!id) {
                    throw new Error('ID no proporcionado')
                }
                setCurrentEntity(await EntityService.getById(Number(id)))
            } catch (error) {
                setError(`${error}`)
            } finally {
                setLoading(false)
            }
        }

        fetchEntity()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)


        if (!id || !currentEntity || !updateData) return

        try {
            await EntityService.update(Number(id), updateData)
            navigate(`/entities/detail/${id}`)
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <EntitiesUpdateView
            currentEntity={currentEntity}
            updateData={updateData}
            loading={loading}
            loadingMsg={loadingMsg}
            error={error}
            onUpdateDataChange={setUpdateData}
            onSubmit={handleSubmit}
        />
    )
}

export default EntitiesUpdate
