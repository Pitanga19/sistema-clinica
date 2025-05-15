import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UsersDetailView from './Detail.view'
import { UserService } from '../../service'
import type { User } from '../../types'
import type { Role } from '../../../roles/types'
import { RoleService } from '../../../roles/service'

const UsersDetail = () => {
    const { id } = useParams<{ id: string }>()
    const [user, setUser] = useState<User | null>(null)
    const [roles, setRoles] = useState<Role[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const loadingMsg = 'Cargando usuario ...'
    const navigate = useNavigate()

    const fetchUser = async () => {
        if (!id) {
            setError('ID no proporcionado')
            setLoading(false)
            return
        }
        try {
            setUser(await UserService.getById(Number(id)))
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

    const handleEdit = (userId: number) => navigate(`/users/update/${userId}`)

    useEffect(() => {
        fetchUser()
        fetchRoles()
    }, [])

    return (
        <UsersDetailView
            user={user}
            roles={roles}
            loading={loading}
            loadingMsg={loadingMsg}
            error={error}
            onEdit={handleEdit}
        />
    )
}

export default UsersDetail
