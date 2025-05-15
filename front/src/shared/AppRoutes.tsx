import { useLocation, useRoutes } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import authRoutes from '../modules/auth/routes'
import dashboardRoutes from '../modules/dashboard/routes'
import superuserRoutes from '../modules/superuser/routes'
import administrativeRoutes from '../modules/administrative/routes'

const AppRoutes = () => {
    const location = useLocation()
    const routes = useRoutes([
        ...authRoutes,
        ...dashboardRoutes,
        ...superuserRoutes,
        ...administrativeRoutes
    ])

    const hideNavBarPaths = ['/login']
    const showNavBar = !hideNavBarPaths.includes(location.pathname)


    return (
        <>
            {showNavBar && <NavBar />}
            {routes}
        </>
    )
}

export default AppRoutes
