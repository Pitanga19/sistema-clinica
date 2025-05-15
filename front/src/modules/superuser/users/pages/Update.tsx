import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import UsersUpdateView from "./Update.view"
import { UserService } from "../service"
import { userSnakeToCamel } from "../utils"
import type { User, UserUpdate, UserUpdateBackend } from "../types"
import type { Role } from "../../roles/types"
import { RoleService } from "../../roles/service"

const UsersUpdate = () => {
    const { id } = useParams<{ id: string }>()
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [updateData, setUpdateData] = useState<UserUpdate | null>(null)
    const [roles, setRoles] = useState<Role[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const loadingMsg = 'Cargando ...'

    const fetchUser = async () => {
        if (!id) {
            setError('ID no proporcionado')
            setLoading(false)
            return
        }
        try {
            const response = await UserService.getById(Number(id))
            const userMapped = userSnakeToCamel(response.data)
            setCurrentUser(userMapped)
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        
        const userUpdateBackend: UserUpdateBackend = {
            id: updateData?.id ?? currentUser?.id,
            username: updateData?.username ?? currentUser?.username,
            full_name: updateData?.fullName ?? currentUser?.fullName,
            is_active: updateData?.isActive ?? currentUser?.isActive,
            is_superuser: updateData?.isSuperuser ?? currentUser?.isSuperuser,
            role_id: updateData?.roleId ?? currentUser?.roleId,
        }

        console.log('updateData', updateData)
        console.log('userUpdateBackend', userUpdateBackend)

        if (!id || !currentUser) return

        try {
            await UserService.update(Number(id), userUpdateBackend)
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
