import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoleService } from '../../service'
import { roleDefaultData } from '../../types'
import type { RoleFormData } from '../../types'
import RoleFormView from '../../components/RoleForm.view'

const RolesCreate = () => {
    const [data, setData] = useState<RoleFormData>(roleDefaultData)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleDataChange = (newData: Partial<RoleFormData>) => {
        setData((prev) => ({ ...prev, ...newData }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            const newRole = await RoleService.create(data)
            navigate(`/roles/detail/${newRole.id}`)
        } catch (error) {
            setError(`${error}`)
        }
    }

    return (
        <RoleFormView
            currentRole={null}
            data={data}
            loading={false}
            error={error}
            onDataChange={handleDataChange}
            onSubmit={handleSubmit}
        />
    )
}

export default RolesCreate
