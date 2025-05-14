interface UsersListViewProps {
    props: null
}

const UsersListView = ({
    props,
}: UsersListViewProps) => {
    console.log(props)

    return (
        <div className='main_container'>
            <h1>Lista de Usuarios</h1>
            <p>Seleccione el usuario que desea operar ...</p>
        </div>
    )
}

export default UsersListView
