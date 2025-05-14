interface RolesCreateViewProps {
    name: string
    error: string | null
    onNameChange: (name: string) => void
    onSubmit: (e: React.FormEvent) => void
}

const RolesCreateView = ({
    name,
    error,
    onNameChange,
    onSubmit,
}: RolesCreateViewProps) => {
    return (
        <div className='main_container'>
            <h1>Crear Rol</h1>
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

export default RolesCreateView
