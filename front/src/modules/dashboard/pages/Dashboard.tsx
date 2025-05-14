import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardView from './Dashboard.view'

const Dashboard = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if (!token) {
            navigate('/login')
        }
    }, [navigate])

    return (
        <DashboardView
            props={null}
        />
    )
}

export default Dashboard
