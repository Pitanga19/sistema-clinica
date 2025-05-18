import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PlanService } from '../../service'
import { EntityService } from '../../../entities/service'
import { planDefaultData } from '../../types'
import type { Plan, PlanFormData } from '../../types'
import type { Entity } from '../../../entities/types'
import PlanFormView from '../../components/PlanForm.view'

const PlansUpdate = () => {
    const { id } = useParams<{ id: string }>()
    const [currentPlan, setCurrentPlan] = useState<Plan | null>(null)
    const [updateData, setUpdateData] = useState<PlanFormData>(planDefaultData)
    const [entities, setEntites] = useState<Entity[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const fetchPlan = async () => {
        try {
            if (!id) {
                throw new Error('ID no proporcionado')
            }
            setCurrentPlan(await PlanService.getById(Number(id)))
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    const fetchEntities = async () => {
        try {
            setEntites(await EntityService.getAll())
        } catch (error) {
            setError(`${error}`)
        }
    }

    const handleDataChange = (newData: Partial<PlanFormData>) => {
        setUpdateData((prev) => ({ ...prev, ...newData }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (!id || !currentPlan || !updateData) return

        try {
            await PlanService.update(Number(id), updateData)
            navigate(`/plans/detail/${id}`)
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchEntities()
            await fetchPlan()
        }
        fetchData()
    }, [])

    return (
        <PlanFormView
            currentPlan={currentPlan}
            data={updateData}
            entities={entities}
            loading={loading}
            error={error}
            onDataChange={handleDataChange}
            onSubmit={handleSubmit}
        />
    )
}

export default PlansUpdate
