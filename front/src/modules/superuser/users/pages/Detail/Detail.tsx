import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import UsersDetailView from './Detail.view'
import { UserService } from '../../service'
import { userSnakeToCamel } from '../../utils'
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

    const fetchUser = async () => {
        if (!id) {
            setError('ID no proporcionado')
            setLoading(false)
            return
        }
        try {
            const response = await UserService.getById(Number(id))
            const userMapped = userSnakeToCamel(response.data)
            setUser(userMapped)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const fetchRoles = async () => {
        try {
            const response = await RoleService.getAll()
            setRoles(response.data)
        } catch (error) {
            setError(`${error}`)
        }
    }

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
        />
    )
}

export default UsersDetail
