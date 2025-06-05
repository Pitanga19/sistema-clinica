import api from '../../../shared/services/api'
import type { People, PeopleCreate, PeopleFilter, PeopleUpdate } from './types'

export class PeopleService {
    static create = async (data: PeopleCreate): Promise<People> => {
        const res = await api.post('/people/', data)
        return res.data
    }

    static getByPersonId = async (personId: number): Promise<People> => {
        const res = await api.get(`/people/${personId}`)
        return res.data
    }

    static getFiltered = async (filters: PeopleFilter): Promise<People[]> => {
        const res = await api.get('/people/', { params: filters })
        return res.data
    }

    static update = async (personId: number, data: PeopleUpdate): Promise<People> => {
        const res = await api.patch(`/people/${personId}`, data)
        return res.data
    }

    static removePatient = async (personId: number): Promise<People> => {
        const res = await api.patch(`/people/${personId}/remove-patient`)
        return res.data
    }

    static delete = (personId: number) => api.delete<void>(`/people/${personId}`)
}
