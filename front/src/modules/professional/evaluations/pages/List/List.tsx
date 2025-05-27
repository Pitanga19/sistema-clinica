import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { EvaluationService } from '../../service'
import type { Evaluation } from '../../types'
import EvaluationsListView from './List.view'

const EvaluationsList = () => {
    const [evaluations, setEvaluations] = useState<Evaluation[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const fetchEvaluations = async () => {
        try {
            setEvaluations(await EvaluationService.getAll())
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEvaluations()
    }, [])

    const handleCreate = () => navigate('/evaluations/create')

    const handleView = (entityId: number) => navigate(`/evaluations/detail/${entityId}`)

    const handleEdit = (entityId: number) => navigate(`/evaluations/update/${entityId}`)

    const handleDelete = async (entityId: number) => {
        try {
            if (!confirm('Confirma que desea eliminar este rol?')) return
            if (!confirm('Está seguro?')) return
            if (!confirm('Muy seguro?')) return
            await EvaluationService.delete(entityId)
        } catch (error) {
            setError(`${error}`)
        }
    }

    return (
        <EvaluationsListView
            evaluations={evaluations}
            loading={loading}
            error={error}
            onCreate={handleCreate}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    )
}

export default EvaluationsList
