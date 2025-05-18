import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { handleUpdateData } from '../../../../../shared/utils/functions'
import { EntityService } from '../../service'
import { entityDefaultData } from '../../types'
import type { Entity, EntityFormData } from '../../types'
import EntityFormView from '../../components/EntityForm.view'

const EntitiesUpdate = () => {
    const { id } = useParams<{ id: string }>()
    const [currentEntity, setCurrentEntity] = useState<Entity | null>(null)
    const [data, setData] = useState<EntityFormData>(entityDefaultData)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

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

    const handleDataChange = (newData: Partial<EntityFormData>) => {
        setData((prevData) => ({ ...prevData, ...newData }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        
        
        if (!id || !currentEntity || !data) return
        
        try {
            const updateData = handleUpdateData(data, entityDefaultData)
            await EntityService.update(Number(id), updateData)
            navigate(`/entities/detail/${id}`)
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEntity()
    }, [])
    
    return (
        <EntityFormView
            currentEntity={currentEntity}
            data={data}
            loading={loading}
            error={error}
            onDataChange={handleDataChange}
            onSubmit={handleSubmit}
        />
    )
}

export default EntitiesUpdate
