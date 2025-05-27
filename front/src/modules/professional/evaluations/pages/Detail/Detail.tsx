import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EvaluationService } from '../../service'
import EvaluationsDetailView from './Detail.view'
import type { Evaluation } from '../../types'

const EvaluationsDetail = () => {
    const { id } = useParams<{ id: string }>()
    const [evaluation, setEvaluation] = useState<Evaluation | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const loadingMsg = 'Cargando obra social ...'
    const navigate = useNavigate()

    const handleEdit = (entityId: number) => navigate(`/evaluations/update/${entityId}`)

    const fetchEvaluation = async () => {
        try {
            if (!id) {
                throw new Error('ID no proporcionado')
            }
            const fetchedEvaluation = await EvaluationService.getById(Number(id))
            setEvaluation(fetchedEvaluation)
            return fetchedEvaluation
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await fetchEvaluation()
        }
        fetchData()
    }, [])

    return <EvaluationsDetailView
        evaluation={evaluation}
        loading={loading}
        loadingMsg={loadingMsg}
        error={error}
        onEdit={handleEdit}
    />
}

export default EvaluationsDetail
