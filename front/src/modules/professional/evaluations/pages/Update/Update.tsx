import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { handleUpdateData } from '../../../../../shared/utils/functions'
import { EvaluationService } from '../../service'
import { evaluationDefaultData } from '../../types'
import type { Evaluation, EvaluationFormData } from '../../types'
import type { People } from '../../../../administrative/people/types'
import type { User } from '../../../../superuser/users/types'
import type { Mode } from '../../../../superuser/modes/types'
import EvaluationFormView from '../../components/EvaluationForm.view'

const EvaluationsUpdate = () => {
    const { id } = useParams<{ id: string }>()
    const [currentEvaluation, setCurrentEvaluation] = useState<Evaluation | null>(null)
    const [data, setData] = useState<EvaluationFormData>(evaluationDefaultData)
    const [patient, setPatient] = useState<People | null>(null)
    const [professional, setProfessional] = useState<User | null>(null)
    const [modes, setModes] = useState<Mode[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const fetchEvaluation = async () => {
        try {
            if (!id) {
                throw new Error('ID no proporcionado')
            }
            setCurrentEvaluation(await EvaluationService.getById(Number(id)))
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }
    
    const handleDataChange = (newData: Partial<EvaluationFormData>) => {
        setData((prevData) => ({ ...prevData, ...newData }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (!id || !currentEvaluation || !data) return

        const updateData = handleUpdateData(data, evaluationDefaultData)

        try {
            await EvaluationService.update(Number(id), updateData)
            navigate(`/evaluations/detail/${id}`)
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEvaluation()
    }, [])

    return (
        <EvaluationFormView
            currentEvaluation={currentEvaluation}
            data={data}
            patient={patient}
            professional={professional}
            modes={modes}
            loading={loading}
            error={error}
            onDataChange={handleDataChange}
            onSubmit={handleSubmit}
        />
    )
}

export default EvaluationsUpdate
