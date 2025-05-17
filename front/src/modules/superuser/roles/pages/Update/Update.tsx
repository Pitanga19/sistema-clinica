import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RoleService } from '../../service'
import { RoleFormDefaultData } from '../../types'
import type { Role, RoleFormData } from '../../types'
import RoleFormView from '../../components/RoleForm.view'

const RolesUpdate = () => {
    const { id } = useParams<{ id: string }>()
    const [currentRole, setCurrentRole] = useState<Role | null>(null)
    const [data, setData] = useState<RoleFormData>(RoleFormDefaultData)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    const fetchRole = async () => {
        try {
            if (!id) {
                setError('ID no proporcionado')
                return
            }
            setCurrentRole(await RoleService.getById(Number(id)))
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    const handleDataChange = (newData: Partial<RoleFormData>) => {
        setData(prev => ({ ...prev, ...newData }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (!id || !currentRole || !data) return

        try {
            await RoleService.update(Number(id), data)
            navigate(`/roles/detail/${id}`)
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchRole()
        }
        fetchData()
    }, [])

    return (
        <RoleFormView
            currentRole={currentRole}
            data={data}
            loading={loading}
            error={error}
            onDataChange={handleDataChange}
            onSubmit={handleSubmit}
        />
    )
}

export default RolesUpdate
