import api from '../../../shared/services/api'
import type { Role, RoleCreate, RoleUpdate } from './types'

export class RoleService {
    static createRole = (data: RoleCreate) =>
        api.post<Role>('/roles', data)

    static getById = (id: number) =>
        api.get<Role>(`/roles/by_id/${id}`)

    static getByName = (name: string) =>
        api.get<Role>(`/roles/by_name/${name}`)

    static getByAssignmentId = (assignmentId: number) =>
        api.get<Role[]>(`/roles/by_assignment/${assignmentId}`)

    static getAll = () =>
        api.get<Role[]>('/roles')

    static update = (id: number, data: RoleUpdate) =>
        api.patch<Role>(`/roles/${id}`, data)

    static delete = (id: number) =>
        api.delete<void>(`/roles/${id}`)
}
