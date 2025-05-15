import type { RouteObject } from 'react-router-dom'
import Login from './pages/Login/Login'

const authRoutes: RouteObject[] = [
    {
        path: '/login',
        element: <Login />,
    },
]

export default authRoutes
