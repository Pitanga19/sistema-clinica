import api from '../../../shared/services/api'
import { toCamel, toSnake } from '../../../shared/utils/apiTransform'
import type { User, UserCreate, UserUpdate } from './types'

export class UserService {
    static create = async (data: UserCreate): Promise<User> => {
        const res = await api.post('/users', toSnake(data))
        return toCamel<User>(res.data)
    }

    static getById = async (id: number): Promise<User> => {
        const res = await api.get(`/users/by_id/${id}`)
        return toCamel<User>(res.data)
    }

    static getByUsername = async (username: string): Promise<User> => {
        const res = await api.get(`/users/by_username/${username}`)
        return toCamel<User>(res.data)
    }

    static getByRoleId = async (roleId: number): Promise<User[]> => {
        const res = await api.get(`/users/by_role_id/${roleId}`)
        return toCamel<User[]>(res.data)
    }

    static getAll = async (): Promise<User[]> => {
        const res = await api.get('/users')
        return toCamel<User[]>(res.data)
    }

    static update = async (id: number, data: UserUpdate): Promise<User> => {
        const res = await api.patch(`/users/${id}`, toSnake(data))
        return toCamel<User>(res.data)
    }

    static delete = (id: number) => api.delete<void>(`/users/${id}`)
}
