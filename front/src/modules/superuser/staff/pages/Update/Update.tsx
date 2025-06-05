import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { handleStaffUpdateData } from '../../utils'
import { StaffService } from '../../service'
import { RoleService } from '../../../roles/service'
import { staffDefaultData } from '../../types'
import type { Staff, StaffFormData } from '../../types'
import type { Role } from '../../../roles/types'
import StaffFormView from '../../components/StaffForm.view'

const StaffUpdate = () => {
    const { id } = useParams<{ id: string }>()
    const [currentStaff, setCurrentStaff] = useState<Staff | null>(null)
    const [data, setData] = useState<StaffFormData>(staffDefaultData)
    const [roles, setRoles] = useState<Role[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const fetchStaff = async () => {
        if (!id) {
            setError('ID no proporcionado')
            setLoading(false)
            return
        }
        try {
            const currentStaff = await StaffService.getByUserId(Number(id))
            setCurrentStaff(currentStaff)
            setData({
                ...data,
                isActive: currentStaff.isActive,
                isSuperuser: currentStaff.isSuperuser,
            })
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const fetchRoles = async () => {
        try {
            setRoles(await RoleService.getAll())
        } catch (error) {
            setError(`${error}`)
        }
    }

    const handleDataChange = (newData: Partial<StaffFormData>) => {
        setData((prev) => ({ ...prev, ...newData }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (!id || !currentStaff || !data) return

        const updateData = handleStaffUpdateData(data)

        try {
            await StaffService.update(Number(id), updateData)
            navigate(`/staff/detail/${id}`)
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStaff()
        fetchRoles()
    }, [])

    return (
        <StaffFormView
            currentStaff={currentStaff}
            data={data}
            roles={roles}
            loading={loading}
            error={error}
            onDataChange={handleDataChange}
            onSubmit={handleSubmit}
        />
    )
}

export default StaffUpdate
