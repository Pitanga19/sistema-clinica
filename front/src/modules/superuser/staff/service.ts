import api from '../../../shared/services/api'
import type { Staff, StaffCreate, StaffUpdate, StaffFilter } from './types'

export class StaffService {
    static create = async (data: StaffCreate): Promise<Staff> => {
        console.log('seding create data', data)
        const res = await api.post('/staff/', data)
        return res.data
    }

    static getByUserId = async (userId: number): Promise<Staff> => {
        const res = await api.get(`/staff/by-user-id/${userId}`)
        return res.data
    }

    static getFiltered = async (filters: StaffFilter): Promise<Staff[]> => {
        const res = await api.get('/staff/', { params: filters })
        return res.data
    }

    static update = async (userId: number, data: StaffUpdate): Promise<Staff> => {
        const res = await api.patch(`/staff/${userId}`, data)
        return res.data
    }

    static removeProfessional = async (userId: number): Promise<Staff> => {
        const res = await api.patch(`/staff/remove-professional/${userId}`)
        return res.data
    }

    static delete = (userId: number) => api.delete<void>(`/staff/${userId}`)
}
