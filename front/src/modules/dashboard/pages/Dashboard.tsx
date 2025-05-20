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

    const navigateToRolesList = () => navigate('/roles')

    const navigateToUsersList = () => navigate('/users')
    
    const navigateToEntitiesList = () => navigate('/entities')
    
    const navigateToPlansList = () => navigate('/plans')
    
    const navigateToPersonsList = () => navigate('/people')

    return (
        <DashboardView
            goToRolesList={navigateToRolesList}
            goToUsersList={navigateToUsersList}
            goToPersonsList={navigateToPersonsList}
            goToEntitiesList={navigateToEntitiesList}
            goToPlansList={navigateToPlansList}
        />
    )
}

export default Dashboard
