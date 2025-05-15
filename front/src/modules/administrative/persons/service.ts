import api from '../../../shared/services/api'
import type { Person, PersonCreate, PersonUpdate } from './types'

export class PersonService {
    static create = async (data: PersonCreate): Promise<Person> => {
        const res = await api.post('/persons', data)
        return res.data
    }

    static getById = async (id: number): Promise<Person> => {
        const res = await api.get(`/persons/by_id/${id}`)
        return res.data
    }

    static getByLastName = async (lastName: string): Promise<Person> => {
        const res = await api.get(`/persons/by_last_name/${lastName}`)
        return res.data
    }

    static getAll = async (): Promise<Person[]> => {
        const res = await api.get('/persons')
        return res.data
    }

    static update = async (id: number, data: PersonUpdate): Promise<Person> => {
        const res = await api.patch(`/persons/${id}`, data)
        return res.data
    }

    static delete = (id: number) => api.delete<void>(`/persons/${id}`)
}
