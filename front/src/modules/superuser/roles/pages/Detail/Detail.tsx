import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RoleService } from '../../service'
import RolesDetailView from './Detail.view'
import type { Role } from '../../types'

const RolesDetail = () => {
    const { id } = useParams<{ id: string }>()
    const [role, setRole] = useState<Role | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const loadingMsg = 'Cargando rol ...'

    const handleEdit = (roleId: number) => navigate(`/roles/update/${roleId}`)

    const fetchRole = async () => {
        try {
            if (!id) {
                throw new Error('ID no proporcionado')
            }
            const response = await RoleService.getById(Number(id))
            setRole(response.data)
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRole()
    }, [])

    return <RolesDetailView
        role={role}
        loading={loading}
        loadingMsg={loadingMsg}
        error={error}
        onEdit={handleEdit}
    />
}

export default RolesDetail
