import type { Entity, EntityUpdate } from "../../types"

interface EntitiesUpdateViewProps {
    currentEntity: Entity | null
    updateData: EntityUpdate | null
    loading: boolean
    loadingMsg: string
    error: string | null
    onUpdateDataChange: (data: EntityUpdate) => void
    onSubmit: (e: React.FormEvent) => void
}

const EntitiesUpdateView = ({
    currentEntity,
    updateData,
    loading,
    loadingMsg,
    error,
    onUpdateDataChange,
    onSubmit,
}: EntitiesUpdateViewProps) => {
    return (
        <div className='main_container'>
            <h1>Editar Obra Social</h1>
            <h2>{loading ? loadingMsg : currentEntity?.name}</h2>
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

export default EntitiesUpdateView
