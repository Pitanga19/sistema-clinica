import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserService } from '../../service'
import { RoleService } from '../../../roles/service'
import { getToSendUserData } from '../../utils'
import { userFormDataDefault } from '../../types'
import type { User, UserFormData } from '../../types'
import type { Role } from '../../../roles/types'
import UserFormView from '../../components/UserForm.view'

const UsersUpdate = () => {
    const { id } = useParams<{ id: string }>()
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [updateData, setUpdateData] = useState<UserFormData>(userFormDataDefault)
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
            setUpdateData({
                ... updateData,
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
        setUpdateData(prev => ({ ...prev, ...newData }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (!id || !currentUser || !updateData) return

        const toSendData = getToSendUserData(updateData) 

        try {
            await UserService.update(Number(id), toSendData)
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
            data={updateData}
            roles={roles}
            loading={loading}
            error={error}
            onDataChange={handleDataChange}
            onSubmit={handleSubmit}
        />
    )
}

export default UsersUpdate
