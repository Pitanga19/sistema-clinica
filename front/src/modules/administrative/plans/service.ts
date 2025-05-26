import api from '../../../shared/services/api'
import type { Plan, PlanCreate, PlanUpdate } from './types'

export class PlanService {
    static create = async (data: PlanCreate): Promise<Plan> => {
        const res = await api.post('/plans', data)
        return res.data
    }

    static getById = async (id: number): Promise<Plan> => {
        const res = await api.get(`/plans/by-id/${id}`)
        return res.data
    }

    static getByEntityId = async (entityId: number): Promise<Plan[]> => {
        const res = await api.get(`/plans/by-entity-id/${entityId}`)
        return res.data
    }

    static getAll = async (): Promise<Plan[]> => {
        const res = await api.get('/plans')
        return res.data
    }

    static update = async (id: number, data: PlanUpdate): Promise<Plan> => {
        const res = await api.patch(`/plans/${id}`, data)
        return res.data
    }

    static delete = (id: number) => api.delete<void>(`/plans/${id}`)
}
