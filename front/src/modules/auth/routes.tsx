import type { RouteObject } from 'react-router-dom'
import Login from './pages/Login'

const authRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Login />,
    }
]

export default authRoutes
