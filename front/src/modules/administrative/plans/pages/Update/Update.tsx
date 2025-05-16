import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PlanService } from '../../service'
import type { Plan, PlanUpdate } from '../../types'
import PlansUpdateView from './Update.view'
import type { Entity } from '../../../entities/types'
import { EntityService } from '../../../entities/service'

const PlansUpdate = () => {
    const { id } = useParams<{ id: string }>()
    const [currentPlan, setCurrentPlan] = useState<Plan | null>(null)
    const [updateData, setUpdateData] = useState<PlanUpdate | null>(null)
    const [entities, setEntites] = useState<Entity[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const loadingMsg = 'Cargando obra social ...'
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
        <PlansUpdateView
            currentPlan={currentPlan}
            updateData={updateData}
            entities={entities}
            loading={loading}
            loadingMsg={loadingMsg}
            error={error}
            onUpdateDataChange={setUpdateData}
            onSubmit={handleSubmit}
        />
    )
}

export default PlansUpdate
