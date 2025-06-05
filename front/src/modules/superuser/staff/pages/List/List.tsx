import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { StaffService } from '../../service'
import type { Staff, StaffFilter } from '../../types'
import StaffListView from './List.view'
import type { Role } from '../../../roles/types'
import { RoleService } from '../../../roles/service'

const StaffList = () => {
    const [filters, setFilters] = useState<StaffFilter>({})
    const [staff, setStaff] = useState<Staff[]>([])
    const [roles, setRoles] = useState<Role[]>([])
    const [selectedRole, setSelectedRole] = useState<Role | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const fetchStaff = async () => {
        try {
            setStaff(await StaffService.getFiltered(filters))
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    const fetchRoles = async () => {
        try {
            setRoles(await RoleService.getAll())
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    const handleFiltersChange = (newFilters: StaffFilter) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilters,
        }))
    }

    const handleRoleChange = async (roleIdStr: string) => {
        const roleId = parseInt(roleIdStr, 10)
        
        if (isNaN(roleId)) {
            setSelectedRole(null)
            setFilters((prev) => ({
                ...prev,
                roleId: undefined,
            }))
            return
        }

        const role = roles.find((r) => r.id === roleId || null)
        setSelectedRole(role || null)
        setFilters((prev) => ({
            ...prev,
            roleId,
        }))
    }

    const handleCreate = () => navigate('/staff/create')

    const handleView = (staffId: number) => navigate(`/staff/detail/${staffId}`)

    const handleEdit = (staffId: number) => navigate(`/staff/update/${staffId}`)

    const handleDelete = async (staffId: number) => {
        try {
            if (!confirm('Confirma que desea eliminar este usuario?')) return
            if (!confirm('Está seguro?')) return
            if (!confirm('Muy seguro?')) return
            await StaffService.delete(staffId)
        } catch (error) {
            setError(`${error}`)
        }
    }

    useEffect(() => {
        fetchStaff()
        fetchRoles()
    }, [])

    useEffect(() => {
        if (Object.keys(filters).every((value) => value === undefined)) return
        fetchStaff()
    }, [filters])

    return (
        <StaffListView
            filters={filters}
            staff={staff}
            roles={roles}
            selectedRole={selectedRole}
            loading={loading}
            error={error}
            onFiltersChange={handleFiltersChange}
            onRoleChange={handleRoleChange}
            onCreate={handleCreate}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    )
}

export default StaffList
