import type { Mode, ModeUpdate } from "../../types"

interface ModesUpdateViewProps {
    currentMode: Mode | null
    updateData: ModeUpdate | null
    loading: boolean
    loadingMsg: string
    error: string | null
    onUpdateDataChange: (data: ModeUpdate) => void
    onSubmit: (e: React.FormEvent) => void
}

const ModesUpdateView = ({
    currentMode,
    updateData,
    loading,
    loadingMsg,
    error,
    onUpdateDataChange,
    onSubmit,
}: ModesUpdateViewProps) => {
    return (
        <div className='main_container'>
            <h1>Editar Modo</h1>
            <h2>{loading ? loadingMsg : currentMode?.name}</h2>
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

export default ModesUpdateView
