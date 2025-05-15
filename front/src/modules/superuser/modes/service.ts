import api from '../../../shared/services/api'
import type { Mode, ModeCreate, ModeUpdate } from './types'

export class ModeService {
    static create = (data: ModeCreate) => api.post<Mode>('/modes', data)

    static getById = (id: number) => api.get<Mode>(`/modes/by_id/${id}`)

    static getByName = (name: string) => api.get<Mode>(`/modes/by_name/${name}`)

    static getByAssignmentId = (assignmentId: number) =>
        api.get<Mode[]>(`/modes/by_assignment/${assignmentId}`)

    static getAll = () => api.get<Mode[]>('/modes')

    static update = (id: number, data: ModeUpdate) => api.patch<Mode>(`/modes/${id}`, data)

    static delete = (id: number) => api.delete<void>(`/modes/${id}`)
}
