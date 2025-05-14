interface DashboardViewProps {
    props: null
}

const DashboardView = ({
    props,
}: DashboardViewProps) => {
    console.log(props)

    return (
        <div className='main_container'>
            <h1>Sistema Clínica</h1>
            <p>Seleccione la tarea que desea realizar ...</p>
        </div>
    )
}

export default DashboardView
