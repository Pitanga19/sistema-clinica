import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { StaffService } from '../../service'
import { RoleService } from '../../../roles/service'
import { staffDefaultData } from '../../types'
import type { StaffFormData } from '../../types'
import type { Role } from '../../../roles/types'
import StaffFormView from '../../components/StaffForm.view'

const StaffCreate = () => {
    const [data, setData] = useState<StaffFormData>(staffDefaultData)
    const [roles, setRoles] = useState<Role[]>([])
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            const newStaff = await StaffService.create(data)
            navigate(`/staff/detail/${newStaff.id}`)
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

    const handleDataChange = (newData: Partial<StaffFormData>) => {
        setData((prev) => ({ ...prev, ...newData }))
    }

    useEffect(() => {
        fetchRoles()
    }, [])

    return (
        <StaffFormView
            currentStaff={null}
            data={data}
            roles={roles}
            loading={false}
            error={error}
            onDataChange={handleDataChange}
            onSubmit={handleSubmit}
        />
    )
}

export default StaffCreate
