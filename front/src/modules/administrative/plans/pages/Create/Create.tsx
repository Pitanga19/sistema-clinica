import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlanService } from '../../service'
import { EntityService } from '../../../entities/service'
import { PlanFormDefaultData } from '../../types'
import type { PlanFormData } from '../../types'
import type { Entity } from '../../../entities/types'
import PlanFormView from '../../components/PlanForm.view'

const PlansCreate = () => {
    const [data, setData] = useState<PlanFormData>(PlanFormDefaultData)
    const [entities, setEntities] = useState<Entity[]>([])
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const fetchEntities = async () => {
        try {
            setEntities(await EntityService.getAll())
        } catch (error) {
            setError(`${error}`)
        }
    }

    const handleDataChange = (newData: Partial<PlanFormData>) => {
        setData(prev => ({ ...prev, ...newData }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            const newPlan = await PlanService.create(data)
            navigate(`/plans/detail/${newPlan.id}`)
        } catch (error) {
            setError(`${error}`)
        }
    }

    useEffect(() => {
        fetchEntities()
    })

    return (
        <PlanFormView
            currentPlan={null}
            data={data}
            entities={entities}
            loading={false}
            error={error}
            onDataChange={handleDataChange}
            onSubmit={handleSubmit}
        />
    )
}

export default PlansCreate
