import type { RouteObject } from 'react-router-dom'
import RolesList from './roles/pages/List'
import RolesCreate from './roles/pages/Create'
import RolesDetail from './roles/pages/Detail'
import RolesUpdate from './roles/pages/Update'
import UsersList from './users/pages/List'
import UsersCreate from './users/pages/Create'
import UsersDetail from './users/pages/Detail'
import UsersUpdate from './users/pages/Update'

const superuserRoutes: RouteObject[] = [
    {
        path: '/roles',
        element: <RolesList />,
    },
    {
        path: '/roles/create',
        element: <RolesCreate />,
    },
    {
        path: '/roles/detail/:id',
        element: <RolesDetail />,
    },
    {
        path: '/roles/update/:id',
        element: <RolesUpdate />,
    },
    {
        path: '/users',
        element: <UsersList />,
    },
    {
        path: '/users/create',
        element: <UsersCreate />,
    },
    {
        path: '/users/detail/:id',
        element: <UsersDetail />,
    },
    {
        path: '/users/update/:id',
        element: <UsersUpdate />,
    },
]

export default superuserRoutes
