import api from '../../../shared/services/api'
import type { Role, RoleCreate, RoleUpdate } from './types'

export class RoleService {
    static create = async (data: RoleCreate): Promise<Role> => {
        const res = await api.post('/roles', data)
        return res.data
    }

    static getById = async (id: number): Promise<Role> => {
        const res = await api.get(`/roles/by_id/${id}`)
        return res.data
    }

    static getByName = async (name: string): Promise<Role> => {
        const res = await api.get(`/roles/by_name/${name}`)
        return res.data
    }

    static getByAssignmentId = async (assignmentId: number): Promise<Role[]> => {
        const res = await api.get(`/roles/by_assignment/${assignmentId}`)
        return res.data
    }

    static getAll = async (): Promise<Role[]> => {
        const res = await api.get('/roles')
        return res.data
    }

    static update = async (id: number, data: RoleUpdate): Promise<Role> => {
        const res = await api.patch(`/roles/${id}`, data)
        return res.data
    }

    static delete = (id: number) => api.delete<void>(`/roles/${id}`)
}
