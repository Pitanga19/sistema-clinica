import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlanService } from '../../service'
import { EntityService } from '../../../entities/service'
import PlansCreateView from './Create.view'
import type { PlanCreate } from '../../types'
import type { Entity } from '../../../entities/types'

const PlansCreate = () => {
    const [planData, setPlanData] = useState<PlanCreate>({
        name: '',
        entityId: 0,
    })
    const [entities, setEntites] = useState<Entity[]>([])
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const fetchEntities = async () => {
        try {
            setEntites(await EntityService.getAll())
        } catch (error) {
            setError(`${error}`)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            const newPlan = await PlanService.create(planData)
            navigate(`/plans/detail/${newPlan.id}`)
        } catch (error) {
            setError(`${error}`)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchEntities()
        }
        fetchData()
    }, [])

    return (
        <PlansCreateView
            planData={planData}
            entities={entities}
            error={error}
            onPlanDataChange={setPlanData}
            onSubmit={handleSubmit}
        />
    )
}

export default PlansCreate
