import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoleService } from '../service'
import type { RoleCreate } from '../types'

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
        <div className='main_container'>
            <h1>Crear Rol</h1>
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
                <button type='submit'>Crear</button>
            </form>
        </div>
    )
}

export default RolesCreate
