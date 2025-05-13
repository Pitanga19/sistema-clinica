import { useRoutes } from 'react-router-dom'
import authRoutes from '../modules/auth/routes'
import dashboardRoutes from '../modules/dashboard/routes'

const AppRoutes = () => {
    const routes = useRoutes([
        ...authRoutes,
        ...dashboardRoutes,
    ])

    return routes
}

export default AppRoutes
