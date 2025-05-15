import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserService } from '../../service'
import type { User } from '../../types'
import UsersListView from './List.view'
import { userSnakeToCamel } from '../../utils'

const UsersList = () => {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const fetchUsers = async () => {
        try {
            const response = await UserService.getAll()
            const usersMapped = response.data.map((user) => userSnakeToCamel(user))
            setUsers(usersMapped)
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleCreate = () => navigate('/users/create')

    const handleView = (userId: number) => navigate(`/users/detail/${userId}`)

    const handleEdit = (userId: number) => navigate(`/users/update/${userId}`)

    const handleDelete = async (userId: number) => {
        try {
            if (!confirm('Confirma que desea eliminar este usuario?')) return
            if (!confirm('Está seguro?')) return
            if (!confirm('Muy seguro?')) return
            await UserService.delete(userId)
        } catch (error) {
            setError(`${error}`)
        }
    }

    return (
        <UsersListView
            users={users}
            loading={loading}
            error={error}
            onCreate={handleCreate}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    )
}

export default UsersList
