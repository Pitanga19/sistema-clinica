import api from '../../../shared/services/api'
import type { User, UserCreate, UserUpdate } from './types'

export class UserService {
    static create = async (data: UserCreate): Promise<User> => {
        const res = await api.post('/users', data)
        return res.data
    }

    static getById = async (id: number): Promise<User> => {
        const res = await api.get(`/users/by-id/${id}`)
        return res.data
    }

    static getByUsername = async (username: string): Promise<User> => {
        const res = await api.get(`/users/by-username/${username}`)
        return res.data
    }

    static getByRoleId = async (roleId: number): Promise<User[]> => {
        const res = await api.get(`/users/by-role-id/${roleId}`)
        return res.data
    }

    static getAll = async (): Promise<User[]> => {
        const res = await api.get('/users')
        return res.data
    }

    static update = async (id: number, data: UserUpdate): Promise<User> => {
        const res = await api.patch(`/users/${id}`, data)
        return res.data
    }

    static delete = (id: number) => api.delete<void>(`/users/${id}`)
}
