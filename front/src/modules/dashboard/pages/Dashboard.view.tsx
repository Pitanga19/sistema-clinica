interface DashboardViewProps {
    goToRolesList: () => void
    goToUsersList: () => void
}

const DashboardView = ({
    goToRolesList,
    goToUsersList,
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
            </ul>
        </div>
    )
}

export default DashboardView
