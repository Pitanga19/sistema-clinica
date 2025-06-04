import type { RouteObject } from 'react-router-dom'
import RolesList from './roles/pages/List/List'
import RolesCreate from './roles/pages/Create/Create'
import RolesDetail from './roles/pages/Detail/Detail'
import RolesUpdate from './roles/pages/Update/Update'
import UsersList from './staff/pages/List/List'
import UsersCreate from './staff/pages/Create/Create'
import UsersDetail from './staff/pages/Detail/Detail'
import UsersUpdate from './staff/pages/Update/Update'

const superuserRoutes: RouteObject[] = [
    {path: '/roles', element: <RolesList />},
    {path: '/roles/create', element: <RolesCreate />},
    {path: '/roles/detail/:id', element: <RolesDetail />},
    {path: '/roles/update/:id', element: <RolesUpdate />},
    {path: '/staff', element: <UsersList />},
    {path: '/staff/create', element: <UsersCreate />},
    {path: '/staff/detail/:id', element: <UsersDetail />},
    {path: '/staff/update/:id', element: <UsersUpdate />},
]

export default superuserRoutes
