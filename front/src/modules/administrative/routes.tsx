import type { RouteObject } from 'react-router-dom'
import PersonsList from './persons/pages/List/List'
import PersonsCreate from './persons/pages/Create/Create'
import PersonsDetail from './persons/pages/Detail/Detail'
import PersonsUpdate from './persons/pages/Update/Update'

const administrativeRoutes: RouteObject[] = [
    {path: '/persons', element: <PersonsList />},
    {path: '/persons/create', element: <PersonsCreate />},
    {path: '/persons/detail/:id', element: <PersonsDetail />},
    {path: '/persons/update/:id', element: <PersonsUpdate />},
]

export default administrativeRoutes
