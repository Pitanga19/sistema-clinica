interface EntitiesCreateViewProps {
    name: string
    error: string | null
    onNameChange: (name: string) => void
    onSubmit: (e: React.FormEvent) => void
}

const EntitiesCreateView = ({
    name,
    error,
    onNameChange,
    onSubmit,
}: EntitiesCreateViewProps) => {
    return (
        <div className='main_container'>
            <h1>Crear Obra Social</h1>
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

export default EntitiesCreateView
