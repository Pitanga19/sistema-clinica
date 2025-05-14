interface UsersCreateViewProps {
    props: null
}

const UsersCreateView = ({
    props,
}: UsersCreateViewProps) => {
    console.log(props)

    return (
        <div className='main_container'>
            <h1>Crear Usuario</h1>
            <p>Complete la información del nuevo usuario ...</p>
        </div>
    )
}

export default UsersCreateView
