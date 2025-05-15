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
    const loadingMsg = 'Cargando rol ...'
    const navigate = useNavigate()

    const handleEdit = (roleId: number) => navigate(`/roles/update/${roleId}`)

    const fetchRole = async () => {
        try {
            if (!id) {
                throw new Error('ID no proporcionado')
            }
            setRole(await RoleService.getById(Number(id)))
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
