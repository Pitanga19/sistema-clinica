import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EntityService } from '../../service'
import EntitiesDetailView from './Detail.view'
import type { Entity } from '../../types'
import type { Plan } from '../../../plans/types'
import { PlanService } from '../../../plans/service'

const EntitiesDetail = () => {
    const { id } = useParams<{ id: string }>()
    const [entity, setEntity] = useState<Entity | null>(null)
    const [plans, setPlans] = useState<Plan[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const loadingMsg = 'Cargando obra social ...'
    const navigate = useNavigate()

    const handleEdit = (entityId: number) => navigate(`/entities/update/${entityId}`)

    const handleGoToPlan = (planId: number) => navigate(`/plans/detail/${planId}`)

    const fetchEntity = async () => {
        try {
            if (!id) {
                throw new Error('ID no proporcionado')
            }
            const fetchedEntity = await EntityService.getById(Number(id))
            setEntity(fetchedEntity)
            return fetchedEntity
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    const fetchPlans = async (fetchedEntity: Entity) => {
        try {
            setPlans(await PlanService.getByEntityId(fetchedEntity.id))
        } catch (error) {
            setError(`${error}`)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const fetchedEntity = await fetchEntity()
            if (fetchedEntity) {
                await fetchPlans(fetchedEntity)
            }
        }
        fetchData()
    }, [])

    return <EntitiesDetailView
        entity={entity}
        plans={plans}
        loading={loading}
        loadingMsg={loadingMsg}
        error={error}
        onEdit={handleEdit}
        onGoToPlan={handleGoToPlan}
    />
}

export default EntitiesDetail
