import api from '../../../shared/services/api'
import { toCamel, toSnake } from '../../../shared/utils/apiTransform'
import type { Role, RoleCreate, RoleUpdate } from './types'

export class RoleService {
    static create = async (data: RoleCreate): Promise<Role> => {
        const res = await api.post('/roles', toSnake(data))
        return toCamel<Role>(res.data)
    }

    static getById = async (id: number): Promise<Role> => {
        const res = await api.get(`/roles/by_id/${id}`)
        return toCamel<Role>(res.data)
    }

    static getByName = async (name: string): Promise<Role> => {
        const res = await api.get(`/roles/by_name/${name}`)
        return toCamel<Role>(res.data)
    }

    static getByAssignmentId = async (assignmentId: number): Promise<Role[]> => {
        const res = await api.get(`/roles/by_assignment/${assignmentId}`)
        return toCamel<Role[]>(res.data)
    }

    static getAll = async (): Promise<Role[]> => {
        const res = await api.get('/roles')
        return toCamel<Role[]>(res.data)
    }

    static update = async (id: number, data: RoleUpdate): Promise<Role> => {
        const res = await api.patch(`/roles/${id}`, toSnake(data))
        return toCamel<Role>(res.data)
    }

    static delete = (id: number) => api.delete<void>(`/roles/${id}`)
}
