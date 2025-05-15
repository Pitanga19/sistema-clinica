import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UsersUpdateView from './Update.view'
import { UserService } from '../../service'
import type { User, UserUpdate } from '../../types'
import type { Role } from '../../../roles/types'
import { RoleService } from '../../../roles/service'

const UsersUpdate = () => {
    const { id } = useParams<{ id: string }>()
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [updateData, setUpdateData] = useState<UserUpdate | null>(null)
    const [roles, setRoles] = useState<Role[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const loadingMsg = 'Cargando ...'
    const navigate = useNavigate()

    const fetchUser = async () => {
        if (!id) {
            setError('ID no proporcionado')
            setLoading(false)
            return
        }
        try {
            setCurrentUser(await UserService.getById(Number(id)))
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (!id || !currentUser || !updateData) return

        try {
            await UserService.update(Number(id), updateData)
            navigate(`/users/detail/${id}`)
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
        fetchRoles()
    }, [])

    return (
        <UsersUpdateView
            currentUser={currentUser}
            updateData={updateData}
            roles={roles}
            loading={loading}
            loadingMsg={loadingMsg}
            error={error}
            onUpdateDataChange={setUpdateData}
            onSubmit={handleSubmit}
        />
    )
}

export default UsersUpdate
