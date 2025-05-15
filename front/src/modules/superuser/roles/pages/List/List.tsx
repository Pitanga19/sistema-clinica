import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoleService } from '../../service'
import type { Role } from '../../types'
import RolesListView from './List.view'

const RolesList = () => {
    const [roles, setRoles] = useState<Role[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const fetchRoles = async () => {
        try {
            setRoles(await RoleService.getAll())
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRoles()
    }, [])

    const handleCreate = () => navigate('/roles/create')

    const handleView = (roleId: number) => navigate(`/roles/detail/${roleId}`)

    const handleEdit = (roleId: number) => navigate(`/roles/update/${roleId}`)

    const handleDelete = async (roleId: number) => {
        try {
            if (!confirm('Confirma que desea eliminar este rol?')) return
            if (!confirm('Está seguro?')) return
            if (!confirm('Muy seguro?')) return
            await RoleService.delete(roleId)
        } catch (error) {
            setError(`${error}`)
        }
    }

    return (
        <RolesListView
            roles={roles}
            loading={loading}
            error={error}
            onCreate={handleCreate}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    )
}

export default RolesList
