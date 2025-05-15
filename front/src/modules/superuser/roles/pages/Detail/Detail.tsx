import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RoleService } from '../../service'
import RolesDetailView from './Detail.view'

const RolesDetail = () => {
    const { id } = useParams<{ id: string }>()
    const [name, setName] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const loadingMsg = 'Cargando ...'

    useEffect(() => {
        const fetchRole = async () => {
            try {
                if (!id) {
                    throw new Error('ID no proporcionado')
                }
                const response = await RoleService.getById(Number(id))
                setName(response.data.name)
            } catch (error) {
                setError(`${error}`)
            } finally {
                setLoading(false)
            }
        }

        fetchRole()
    }, [])

    return <RolesDetailView name={name} loading={loading} loadingMsg={loadingMsg} error={error} />
}

export default RolesDetail
