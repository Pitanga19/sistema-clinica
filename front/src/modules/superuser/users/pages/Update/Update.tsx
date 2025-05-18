import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { handleUserUpdateData } from '../../utils'
import { UserService } from '../../service'
import { RoleService } from '../../../roles/service'
import { userDefaultData } from '../../types'
import type { User, UserFormData } from '../../types'
import type { Role } from '../../../roles/types'
import UserFormView from '../../components/UserForm.view'

const UsersUpdate = () => {
    const { id } = useParams<{ id: string }>()
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [data, setData] = useState<UserFormData>(userDefaultData)
    const [roles, setRoles] = useState<Role[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const fetchUser = async () => {
        if (!id) {
            setError('ID no proporcionado')
            setLoading(false)
            return
        }
        try {
            const currentUser = await UserService.getById(Number(id))
            setCurrentUser(currentUser)
            setData({
                ...data,
                isActive: currentUser.isActive,
                isSuperuser: currentUser.isSuperuser,
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

    const handleDataChange = (newData: Partial<UserFormData>) => {
        setData((prev) => ({ ...prev, ...newData }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (!id || !currentUser || !data) return

        const updateData = handleUserUpdateData(data)

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
        <UserFormView
            currentUser={currentUser}
            data={data}
            roles={roles}
            loading={loading}
            error={error}
            onDataChange={handleDataChange}
            onSubmit={handleSubmit}
        />
    )
}

export default UsersUpdate
