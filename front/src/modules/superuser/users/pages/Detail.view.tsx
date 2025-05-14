interface UsersDetailViewProps {
    props: null
}

const UsersDetailView = ({
    props,
}: UsersDetailViewProps) => {
    console.log(props)

    return (
        <div className='main_container'>
            <h1>Detalles del Usuario</h1>
            <p>Consulte, edite o elimine el usuario ...</p>
        </div>
    )
}

export default UsersDetailView
