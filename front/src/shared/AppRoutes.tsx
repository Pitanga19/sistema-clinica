import { useRoutes } from 'react-router-dom'
import authRoutes from '../modules/auth/routes'
import dashboardRoutes from '../modules/dashboard/routes'
import superuserRoutes from '../modules/superuser/routes'
import administrativeRoutes from '../modules/administrative/routes'

const AppRoutes = () => {
    const routes = useRoutes([...authRoutes, ...dashboardRoutes, ...superuserRoutes, ...administrativeRoutes])

    return routes
}

export default AppRoutes
