import { useState, useEffect } from 'react'
import { RoleService } from '../service'
import type { Role } from '../types'

const RolesList = () => {
    const [roles, setRoles] = useState<Role[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    let content;

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

    if (loading) {
        content = <p>Cargando roles ...</p>
    } else if (error) {
        content = <p className='error'>{error}</p>
    } else if (roles.length === 0) {
        content = <p>No hay roles para mostrar</p>
    } else {
        content = (
            <ul>
                {roles.map((role) => (
                    <li key={role.id}>{role.name}</li>
                ))}
            </ul>
        )
    }

    return (
        <div className='main_container'>
            <h1>Lista de Roles</h1>
            {content}
        </div>
    )
}

export default RolesList
