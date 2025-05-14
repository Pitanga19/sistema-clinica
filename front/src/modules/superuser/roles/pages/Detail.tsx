import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RoleService } from '../service'

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

    return (
        <div className='main_container'>
            <h1>Detalles del Rol</h1>
            <h2>{loading ? loadingMsg : name}</h2>
            {error && <p className='error'>{error}</p>}
        </div>
    )
}

export default RolesDetail
