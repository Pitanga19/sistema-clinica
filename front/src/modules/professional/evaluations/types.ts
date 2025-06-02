import type { People } from '../../administrative/people/types'
import type { Mode } from '../../superuser/modes/types'

export interface EvaluationBase {
    report: string
    closedAt: Date | null
    patientId: number
    professionalId: number
    modeId: number
    people: People | null
    professional: null
    mode: Mode | null
}

export interface Evaluation extends EvaluationBase {
    id: number
}

export type EvaluationCreate = EvaluationBase

export type EvaluationUpdate = Partial<EvaluationBase>

export type EvaluationFormData = {
    report: string
    closedAt: Date | null
    patientId: number
    professional_Id: number
    modeId: number
}

export const evaluationDefaultData = {
    report: '',
    closedAt: null,
    patientId: 0,
    professional_Id: 0,
    modeId: 0,
}
