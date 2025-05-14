import api from '../../../shared/services/api'
import type { User, UserCreateBackend, UserUpdateBackend } from './types'

export class UserService {
    static create = (data: UserCreateBackend) => api.post<User>('/users', data)

    static getById = (id: number) => api.get<User>(`/users/by_id/${id}`)

    static getByUsername = (username: string) => api.get<User>(`/users/by_username/${username}`)

    static getByRoleId = (roleId: number) =>
        api.get<User[]>(`/users/by_role_id/${roleId}`)

    static getAll = () => api.get<User[]>('/users')

    static update = (id: number, data: UserUpdateBackend) => api.patch<User>(`/users/${id}`, data)

    static delete = (id: number) => api.delete<void>(`/users/${id}`)
}
