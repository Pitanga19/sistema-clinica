import type { RouteObject } from 'react-router-dom'
import ModesList from './modes/pages/List/List'
import ModesCreate from './modes/pages/Create/Create'
import ModesDetail from './modes/pages/Detail/Detail'
import ModesUpdate from './modes/pages/Update/Update'
import RolesList from './roles/pages/List/List'
import RolesCreate from './roles/pages/Create/Create'
import RolesDetail from './roles/pages/Detail/Detail'
import RolesUpdate from './roles/pages/Update/Update'
import UsersList from './users/pages/List/List'
import UsersCreate from './users/pages/Create/Create'
import UsersDetail from './users/pages/Detail/Detail'
import UsersUpdate from './users/pages/Update/Update'

const superuserRoutes: RouteObject[] = [
    {path: '/modes', element: <ModesList />},
    {path: '/modes/create', element: <ModesCreate />},
    {path: '/modes/detail/:id', element: <ModesDetail />},
    {path: '/modes/update/:id', element: <ModesUpdate />},
    {path: '/roles', element: <RolesList />},
    {path: '/roles/create', element: <RolesCreate />},
    {path: '/roles/detail/:id', element: <RolesDetail />},
    {path: '/roles/update/:id', element: <RolesUpdate />},
    {path: '/users', element: <UsersList />},
    {path: '/users/create', element: <UsersCreate />},
    {path: '/users/detail/:id', element: <UsersDetail />},
    {path: '/users/update/:id', element: <UsersUpdate />},
]

export default superuserRoutes
