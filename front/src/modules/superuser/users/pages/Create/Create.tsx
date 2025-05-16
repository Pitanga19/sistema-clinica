import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserService } from '../../service'
import { RoleService } from '../../../roles/service'
import { userFormDataDefault } from '../../types'
import type { UserFormData } from '../../types'
import type { Role } from '../../../roles/types'
import UserFormView from '../../components/UserForm.view'

const UsersCreate = () => {
    const [userData, setUserData] = useState<UserFormData>(userFormDataDefault)
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

    const handleDataChange = (newData: Partial<UserFormData>) => {
        setUserData(prev => ({ ...prev, ...newData }))
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchRoles()
        }
        fetchData()
    })

    return (
        <UserFormView
            currentUser={null}
            data={userData}
            roles={roles}
            loading={false}
            error={error}
            onDataChange={handleDataChange}
            onSubmit={handleSubmit}
        />
    )
}

export default UsersCreate
