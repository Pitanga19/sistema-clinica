import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { StaffService } from '../../service'
import type { Staff } from '../../types'
import StaffDetailView from './Detail.view'

const StaffDetail = () => {
    const { id } = useParams<{ id: string }>()
    const [staff, setStaff] = useState<Staff | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const loadingMsg = 'Cargando usuario ...'
    const navigate = useNavigate()

    const fetchStaff = async () => {
        if (!id) {
            setError('ID no proporcionado')
            setLoading(false)
            return
        }
        try {
            setStaff(await StaffService.getByUserId(Number(id)))
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (staffId: number) => navigate(`/staff/update/${staffId}`)

    useEffect(() => {
        fetchStaff()
    }, [])

    return (
        <StaffDetailView
            staff={staff}
            loading={loading}
            loadingMsg={loadingMsg}
            error={error}
            onEdit={handleEdit}
        />
    )
}

export default StaffDetail
