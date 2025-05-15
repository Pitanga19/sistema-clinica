import type { Role, RoleUpdate } from "../../types"

interface RolesUpdateViewProps {
    currentRole: Role | null
    updateData: RoleUpdate | null
    loading: boolean
    loadingMsg: string
    error: string | null
    onUpdateDataChange: (data: RoleUpdate) => void
    onSubmit: (e: React.FormEvent) => void
}

const RolesUpdateView = ({
    currentRole,
    updateData,
    loading,
    loadingMsg,
    error,
    onUpdateDataChange,
    onSubmit,
}: RolesUpdateViewProps) => {
    return (
        <div className='main_container'>
            <h1>Editar Rol</h1>
            <h2>{loading ? loadingMsg : currentRole?.name}</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='name'>Nombre</label>
                    <input
                        type='text'
                        id='name'
                        onChange={(e) => 
                            onUpdateDataChange({
                                ...updateData,
                                name: e.target.value,
                            })
                        }
                    />
                </div>
                {error && <p className='error'>{error}</p>}
                <button type='submit'>Guardar</button>
            </form>
        </div>
    )
}

export default RolesUpdateView
