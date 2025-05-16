import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlanService } from '../../service'
import type { Plan } from '../../types'
import PlansListView from './List.view'

const PlansList = () => {
    const [plans, setPlans] = useState<Plan[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const fetchPlans = async () => {
        try {
            setPlans(await PlanService.getAll())
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPlans()
    }, [])

    const handleCreate = () => navigate('/plans/create')

    const handleView = (planId: number) => navigate(`/plans/detail/${planId}`)

    const handleEdit = (planId: number) => navigate(`/plans/update/${planId}`)

    const handleDelete = async (planId: number) => {
        try {
            if (!confirm('Confirma que desea eliminar este rol?')) return
            if (!confirm('Está seguro?')) return
            if (!confirm('Muy seguro?')) return
            await PlanService.delete(planId)
        } catch (error) {
            setError(`${error}`)
        }
    }

    return (
        <PlansListView
            plans={plans}
            loading={loading}
            error={error}
            onCreate={handleCreate}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    )
}

export default PlansList
