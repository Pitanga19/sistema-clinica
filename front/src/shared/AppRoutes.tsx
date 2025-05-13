import { useRoutes } from 'react-router-dom'
import authRoutes from '../modules/auth/routes'

const AppRoutes = () => {
    const routes = useRoutes([
        ...authRoutes,
    ])

    return routes
}

export default AppRoutes
