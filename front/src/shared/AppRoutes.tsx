import { useRoutes } from 'react-router-dom'
import authRoutes from '../modules/auth/routes'
import dashboardRoutes from '../modules/dashboard/routes'
import superuserRoutes from '../modules/superuser/routes'

const AppRoutes = () => {
    const routes = useRoutes([...authRoutes, ...dashboardRoutes, ...superuserRoutes])

    return routes
}

export default AppRoutes
