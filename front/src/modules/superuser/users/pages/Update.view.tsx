interface UsersUpdateViewProps {
    props: null
}

const UsersUpdateView = ({
    props,
}: UsersUpdateViewProps) => {
    console.log(props)

    return (
        <div className='main_container'>
            <h1>Editar Usuario</h1>
            <p>Modifique la información del usuario ...</p>
        </div>
    )
}

export default UsersUpdateView
