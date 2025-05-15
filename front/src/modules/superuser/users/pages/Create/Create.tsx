import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserService } from '../../service'
import UsersCreateView from './Create.view'
import { RoleService } from '../../../roles/service'
import type { UserCreate } from '../../types'
import type { Role } from '../../../roles/types'

const UsersCreate = () => {
    const [userData, setUserData] = useState<UserCreate>({
        id: 0,
        username: '',
        password: '',
        fullName: '',
        isActive: true,
        isSuperuser: false,
        roleId: 0,
    })
    const [roles, setRoles] = useState<Role[]>([])
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            const newUser = await UserService.create(userData)
            navigate(`/users/detail/${newUser.id}`)
        } catch (error) {
            setError(`${error}`)
        }
    }

    const fetchRoles = async () => {
        try {
            setRoles(await RoleService.getAll())
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
