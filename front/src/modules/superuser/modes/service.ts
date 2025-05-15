import api from '../../../shared/services/api'
import { toCamel, toSnake } from '../../../shared/utils/apiTransform'
import type { Mode, ModeCreate, ModeUpdate } from './types'

export class ModeService {
    static create = async (data: ModeCreate): Promise<Mode> => {
        const res = await api.post('/modes', toSnake(data))
        return toCamel<Mode>(res.data)
    }

    static getById = async (id: number): Promise<Mode> => {
        const res = await api.get(`/modes/by_id/${id}`)
        return toCamel<Mode>(res.data)
    }

    static getByName = async (name: string): Promise<Mode> => {
        const res = await api.get(`/modes/by_name/${name}`)
        return toCamel<Mode>(res.data)
    }

    static getByAssignmentId = async (assignmentId: number): Promise<Mode[]> => {
        const res = await api.get(`/modes/by_assignment/${assignmentId}`)
        return toCamel<Mode[]>(res.data)
    }

    static getAll = async (): Promise<Mode[]> => {
        const res = await api.get('/modes')
        return toCamel<Mode[]>(res.data)
    }

    static update = async (id: number, data: ModeUpdate): Promise<Mode> => {
        const res = await api.patch(`/modes/${id}`, toSnake(data))
        return toCamel<Mode>(res.data)
    }

    static delete = (id: number) => api.delete<void>(`/modes/${id}`)
}
