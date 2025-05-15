import api from '../../../shared/services/api'
import type { Mode, ModeCreate, ModeUpdate } from './types'

export class ModeService {
    static create = async (data: ModeCreate): Promise<Mode> => {
        const res = await api.post('/modes', data)
        return res.data
    }

    static getById = async (id: number): Promise<Mode> => {
        const res = await api.get(`/modes/by_id/${id}`)
        return res.data
    }

    static getByName = async (name: string): Promise<Mode> => {
        const res = await api.get(`/modes/by_name/${name}`)
        return res.data
    }

    static getByAssignmentId = async (assignmentId: number): Promise<Mode[]> => {
        const res = await api.get(`/modes/by_assignment/${assignmentId}`)
        return res.data
    }

    static getAll = async (): Promise<Mode[]> => {
        const res = await api.get('/modes')
        return res.data
    }

    static update = async (id: number, data: ModeUpdate): Promise<Mode> => {
        const res = await api.patch(`/modes/${id}`, data)
        return res.data
    }

    static delete = (id: number) => api.delete<void>(`/modes/${id}`)
}
