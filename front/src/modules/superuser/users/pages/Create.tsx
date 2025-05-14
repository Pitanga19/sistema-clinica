import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserService } from '../service'
import UsersCreateView from './Create.view'
import { RoleService } from '../../roles/service'
import type { UserCreate, UserCreateBackend } from '../types'
import type { Role } from '../../roles/types'

const UsersCreate = () => {
    const [userData, setUserData] = useState<UserCreate>({
        id: 0,
        username: '',
        password: '',
        fullName: '',
        isActive: true,
        isSuperuser: false,
        roleId: 0,
    });
    const [roles, setRoles] = useState<Role[]>([])
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const mapUserData = (data: UserCreate): UserCreateBackend => ({
        id: data.id,
        username: data.username,
        password: data.password,
        full_name: data.fullName,
        is_active: data.isActive,
        is_superuser: data.isSuperuser,
        role_id: data.roleId,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            const mappedUserData = mapUserData(userData)
            const response = await UserService.create(mappedUserData)
            const newUserId = response.data.id
            navigate(`/users/detail/${newUserId}`)
        } catch (error) {
            setError(`${error}`)
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
        const fetchData = async () => {
            await fetchRoles()
        }
        fetchData()
    })

    return (
        <UsersCreateView
            userData={userData}
            roles={roles}
            error={error}
            onUserDataChange={setUserData}
            onSubmit={handleSubmit}
        />
    )
}

export default UsersCreate
