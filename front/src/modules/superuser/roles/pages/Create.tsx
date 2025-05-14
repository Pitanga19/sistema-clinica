import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoleService } from '../service'
import type { RoleCreate } from '../types'
import RolesCreateView from './Create.view'

const RolesCreate = () => {
    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const newRoleData: RoleCreate = {
            name,
        }

        try {
            const response = await RoleService.create(newRoleData)
            const newRoleId = response.data.id
            navigate(`/roles/detail/${newRoleId}`)
        } catch (error) {
            setError(`${error}`)
        }
    }

    return (
        <RolesCreateView
            name={name}
            error={error}
            onNameChange={setName}
            onSubmit={handleSubmit}
        />
    )
}

export default RolesCreate
