import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PlanService } from '../../service'
import { EntityService } from '../../../entities/service'
import PlansDetailView from './Detail.view'
import type { Plan } from '../../types'
import type { Entity } from '../../../entities/types'

const PlansDetail = () => {
    const { id } = useParams<{ id: string }>()
    const [plan, setPlan] = useState<Plan | null>(null)
    const [entity, setEntity] = useState<Entity | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const loadingMsg = 'Cargando obra social ...'
    const navigate = useNavigate()

    const handleEdit = (planId: number) => navigate(`/plans/update/${planId}`)

    const fetchPlan = async () => {
        try {
            if (!id) {
                throw new Error('ID no proporcionado')
            }
            const fetchedPlan = await PlanService.getById(Number(id))
            setPlan(fetchedPlan)
            return fetchedPlan
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    const fetchEntity = async (fetchedPlan: Plan) => {
        try {
            setEntity(await EntityService.getById(Number(fetchedPlan.entityId)))
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    const handleEntityDetail = (entityId: number) => navigate(`/entities/detail/${entityId}`)

    useEffect(() => {
        const fetchData = async () => {
            const fetchedPlan = await fetchPlan()
            if (fetchedPlan) {
                await fetchEntity(fetchedPlan)
            }
        }
        fetchData()
    }, [])

    return <PlansDetailView
        plan={plan}
        entity={entity}
        loading={loading}
        loadingMsg={loadingMsg}
        error={error}
        onEntityDetail={handleEntityDetail}
        onEdit={handleEdit}
    />
}

export default PlansDetail
