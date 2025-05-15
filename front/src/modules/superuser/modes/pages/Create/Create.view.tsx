interface ModesCreateViewProps {
    name: string
    error: string | null
    onNameChange: (name: string) => void
    onSubmit: (e: React.FormEvent) => void
}

const ModesCreateView = ({
    name,
    error,
    onNameChange,
    onSubmit,
}: ModesCreateViewProps) => {
    return (
        <div className='main_container'>
            <h1>Crear Modo</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='name'>Nombre</label>
                    <input
                        type='text'
                        id='name'
                        value={name}
                        onChange={(e) => onNameChange(e.target.value)}
                        required
                    />
                </div>
                {error && <p className='error'>{error}</p>}
                <button type='submit'>Crear</button>
            </form>
        </div>
    )
}

export default ModesCreateView
