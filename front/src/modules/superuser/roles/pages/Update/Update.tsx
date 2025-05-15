import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RoleService } from '../../service'
import type { Role, RoleUpdate } from '../../types'
import RolesUpdateView from './Update.view'

const RolesUpdate = () => {
    const { id } = useParams<{ id: string }>()
    const [currentRole, setCurrentRole] = useState<Role | null>(null)
    const [updateData, setUpdateData] = useState<RoleUpdate | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const loadingMsg = 'Cargando rol ...'
    const navigate = useNavigate()

    useEffect(() => {
        const fetchRole = async () => {
            try {
                if (!id) {
                    throw new Error('ID no proporcionado')
                }
                setCurrentRole(await RoleService.getById(Number(id)))
            } catch (error) {
                setError(`${error}`)
            } finally {
                setLoading(false)
            }
        }

        fetchRole()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)


        if (!id || !currentRole || !updateData) return

        try {
            await RoleService.update(Number(id), updateData)
            navigate(`/roles/detail/${id}`)
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <RolesUpdateView
            currentRole={currentRole}
            updateData={updateData}
            loading={loading}
            loadingMsg={loadingMsg}
            error={error}
            onUpdateDataChange={setUpdateData}
            onSubmit={handleSubmit}
        />
    )
}

export default RolesUpdate
