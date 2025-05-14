import type { Role } from "../types"

interface RolesListViewProps {
    roles: Role[]
    loading: boolean
    error: string | null
}

const RolesListView = ({
    roles,
    loading,
    error,
}: RolesListViewProps) => {
    let content

    if (loading) {
        content = <p>Cargando roles ...</p>
    } else if (error) {
        content = <p className='error'>{error}</p>
    } else if (roles.length === 0) {
        content = <p>No hay roles para mostrar</p>
    } else {
        content = (
            <ul>
                {roles.map((role) => (
                    <li key={role.id}>{role.name}</li>
                ))}
            </ul>
        )
    }

    return (
        <div className='main_container'>
            <h1>Lista de Roles</h1>
            {content}
        </div>
    )
}

export default RolesListView
