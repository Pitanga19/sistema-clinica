import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EvaluationService } from '../../service'
import { evaluationDefaultData } from '../../types'
import type {EvaluationCreate, EvaluationFormData } from '../../types'
import type { People } from '../../../../administrative/people/types'
import type { User } from '../../../../superuser/users/types'
import type { Mode } from '../../../../superuser/modes/types'
import EvaluationFormView from '../../components/EvaluationForm.view'

const EvaluationsCreate = () => {
    const [data, setData] = useState<EvaluationFormData>(evaluationDefaultData)
    const [patient, setPatient] = useState<People | null>(null)
    const [professional, setProfessional] = useState<User | null>(null)
    const [modes, setModes] = useState<Mode[]>([])
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleDataChange = (data: Partial<EvaluationCreate>) => {
        setData((prevData) => ({
            ...prevData,
            ...data,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const newEvaluationData: EvaluationCreate = {
            report: data.report,
            closedAt: data.closedAt,
            patientId: patient ? patient.id : 0,
            professionalId: professional ? professional.id : 0,
            modeId: data.modeId,
            people: patient,
            professional: null,
            mode: null,
        }

        try {
            const newEvaluation = await EvaluationService.create(newEvaluationData)
            navigate(`/evaluations/detail/${newEvaluation.id}`)
        } catch (error) {
            setError(`${error}`)
        }
    }

    return (
        <EvaluationFormView
            currentEvaluation={null}
            data={ data }
            patient={patient}
            professional={professional}
            modes={modes}
            loading={false}
            error={error}
            onDataChange={handleDataChange}
            onSubmit={handleSubmit}
        />
    )
}

export default EvaluationsCreate
