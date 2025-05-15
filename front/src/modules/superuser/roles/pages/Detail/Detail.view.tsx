interface RolesDetailViewProps {
    name: string
    loading: boolean
    loadingMsg: string
    error: string | null
}

const RolesDetailView = ({
    name,
    loading,
    loadingMsg,
    error,
}: RolesDetailViewProps) => {
    return (
        <div className='main_container'>
            <h1>Detalles del Rol</h1>
            <h2>{loading ? loadingMsg : name}</h2>
            {error && <p className='error'>{error}</p>}
        </div>
    )
}

export default RolesDetailView
