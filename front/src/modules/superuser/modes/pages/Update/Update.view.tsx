interface ModesUpdateViewProps {
    name: string
    currentName: string
    loading: boolean
    loadingMsg: string
    error: string | null
    onChangeName: (name: string) => void
    onSubmit: (e: React.FormEvent) => void
}

const ModesUpdateView = ({
    name,
    currentName,
    loading,
    loadingMsg,
    error,
    onChangeName,
    onSubmit,
}: ModesUpdateViewProps) => {
    return (
        <div className='main_container'>
            <h1>Editar Modo</h1>
            <h2>{loading ? loadingMsg : currentName}</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='name'>Nombre</label>
                    <input
                        type='text'
                        id='name'
                        value={name}
                        onChange={(e) => onChangeName(e.target.value)}
                        required
                    />
                </div>
                {error && <p className='error'>{error}</p>}
                <button type='submit'>Guardar</button>
            </form>
        </div>
    )
}

export default ModesUpdateView
