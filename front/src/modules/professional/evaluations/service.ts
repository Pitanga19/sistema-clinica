import api from '../../../shared/services/api'
import type { Evaluation, EvaluationCreate, EvaluationUpdate } from './types'

export class EvaluationService {
    static create = async (data: EvaluationCreate): Promise<Evaluation> => {
        const res = await api.post('/evaluations', data)
        return res.data
    }

    static getById = async (id: number): Promise<Evaluation> => {
        const res = await api.get(`/evaluations/by-id/${id}`)
        return res.data
    }

    static getByPatientId = async (patientId: number): Promise<Evaluation[]> => {
        const res = await api.get(`/evaluations/by-patient-id/${patientId}`)
        return res.data
    }

    static getByProfessionalId = async (professionalId: number): Promise<Evaluation[]> => {
        const res = await api.get(`/evaluations/by-professional-id/${professionalId}`)
        return res.data
    }

    static getByModeId = async (modeId: number): Promise<Evaluation[]> => {
        const res = await api.get(`/evaluations/by-mode-id/${modeId}`)
        return res.data
    }

    static getAll = async (): Promise<Evaluation[]> => {
        const res = await api.get(`/evaluations`)
        return res.data
    }

    static update = async (id: number, data: EvaluationUpdate): Promise<Evaluation> => {
        const res = await api.patch(`/evaluations/${id}`, data)
        return res.data
    }

    static delete = (id: number) => api.delete<void>(`/evaluations/${id}`)
}
