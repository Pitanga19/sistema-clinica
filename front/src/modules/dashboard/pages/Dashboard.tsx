import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if (!token) {
            navigate('/login')
        }
    }, [navigate])

    return (
        <div className='main_container'>
            <h1>Sistema Clínica</h1>
            <p>Seleccione la tarea que desea realizar ...</p>
        </div>
    )
}

export default Dashboard
