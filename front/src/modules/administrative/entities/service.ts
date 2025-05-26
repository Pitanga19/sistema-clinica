import api from '../../../shared/services/api'
import type { Entity, EntityCreate, EntityUpdate } from './types'

export class EntityService {
    static create = async (data: EntityCreate): Promise<Entity> => {
        const res = await api.post('/entities', data)
        return res.data
    }

    static getById = async (id: number): Promise<Entity> => {
        const res = await api.get(`/entities/by-id/${id}`)
        return res.data
    }

    static getByName = async (name: string): Promise<Entity> => {
        const res = await api.get(`/entities/by-name/${name}`)
        return res.data
    }

    static getAll = async (): Promise<Entity[]> => {
        const res = await api.get('/entities')
        return res.data
    }

    static update = async (id: number, data: EntityUpdate): Promise<Entity> => {
        const res = await api.patch(`/entities/${id}`, data)
        return res.data
    }

    static delete = (id: number) => api.delete<void>(`/entities/${id}`)
}
