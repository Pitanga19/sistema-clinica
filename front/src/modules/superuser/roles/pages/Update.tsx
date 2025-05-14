import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RoleService } from '../service'
import type { RoleUpdate } from '../types'

const RolesUpdate = () => {
    const { id } = useParams<{ id: string }>()
    const [name, setName] = useState<string>('')
    const [currentName, setCurrentName] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const loadingMsg = 'Cargando ...'

    useEffect(() => {
        const fetchRole = async () => {
            try {
                if (!id) {
                    throw new Error('ID no proporcionado')
                }
                const response = await RoleService.getById(Number(id))
                setName(response.data.name)
                setCurrentName(response.data.name)
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

        const updateRoleData: RoleUpdate = {
            name,
        }

        try {
            if (!id) {
                throw new Error('ID no proporcionado')
            }
            await RoleService.update(Number(id), updateRoleData)
            navigate(`/roles/detail/${id}`)
        } catch (error) {
            setError(`${error}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='main_container'>
            <h1>Editar Rol</h1>
            <h2>{loading ? loadingMsg : currentName}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Nombre</label>
                    <input
                        type='text'
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                {error && <p className='error'>{error}</p>}
                <button type='submit'>Guardar</button>
            </form>
        </div>
    )
}

export default RolesUpdate
