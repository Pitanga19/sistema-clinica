import api from '../../../shared/services/api'
import type { UserBackend, UserCreateBackend, UserUpdateBackend } from './types'

export class UserService {
    static create = (data: UserCreateBackend) => api.post<UserBackend>('/users', data)

    static getById = (id: number) => api.get<UserBackend>(`/users/by_id/${id}`)

    static getByUsername = (username: string) => api.get<UserBackend>(`/users/by_username/${username}`)

    static getByRoleId = (roleId: number) =>
        api.get<UserBackend[]>(`/users/by_role_id/${roleId}`)

    static getAll = () => api.get<UserBackend[]>('/users')

    static update = (id: number, data: UserUpdateBackend) => api.patch<UserBackend>(`/users/${id}`, data)

    static delete = (id: number) => api.delete<void>(`/users/${id}`)
}
