interface DashboardViewProps {
    goToRolesList: () => void
    goToUsersList: () => void
    goToPersonsList: () => void
}

const DashboardView = ({
    goToRolesList,
    goToUsersList,
    goToPersonsList,
}: DashboardViewProps) => {
    return (
        <div className='main_container'>
            <h1>Sistema Clínica</h1>
            <p>Seleccione la tarea que desea realizar ...</p>
            <ul>
                <li>
                    <button onClick={goToRolesList}>Gestión de roles</button>
                </li>
                <li>
                    <button onClick={goToUsersList}>Gestión de usuarios</button>
                </li>
                <li>
                    <button onClick={goToPersonsList}>Gestión de personas</button>
                </li>
            </ul>
        </div>
    )
}

export default DashboardView
