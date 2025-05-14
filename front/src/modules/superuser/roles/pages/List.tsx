import { useState, useEffect } from 'react'
import { RoleService } from '../service'
import type { Role } from '../types'
import RolesListView from './List.view'

const RolesList = () => {
    const [roles, setRoles] = useState<Role[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await RoleService.getAll()
                setRoles(response.data)
            } catch (error) {
                setError(`${error}`)
            } finally {
                setLoading(false)
            }
        }

        fetchRoles()
    }, [])

    return (
        <RolesListView
            roles={roles}
            loading={loading}
            error={error}
        />
    )
}

export default RolesList
