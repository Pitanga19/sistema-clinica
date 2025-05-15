import type { RouteObject } from 'react-router-dom'
import PersonsList from './persons/pages/List/List'
import PersonsCreate from './persons/pages/Create/Create'
import PersonsDetail from './persons/pages/Detail/Detail'
import PersonsUpdate from './persons/pages/Update/Update'
import EntitiesList from './entities/pages/List/List'
import EntitiesCreate from './entities/pages/Create/Create'
import EntitiesDetail from './entities/pages/Detail/Detail'
import EntitiesUpdate from './entities/pages/Update/Update'

const administrativeRoutes: RouteObject[] = [
    {path: '/persons', element: <PersonsList />},
    {path: '/persons/create', element: <PersonsCreate />},
    {path: '/persons/detail/:id', element: <PersonsDetail />},
    {path: '/persons/update/:id', element: <PersonsUpdate />},
    {path: '/entities', element: <EntitiesList />},
    {path: '/entities/create', element: <EntitiesCreate />},
    {path: '/entities/detail/:id', element: <EntitiesDetail />},
    {path: '/entities/update/:id', element: <EntitiesUpdate />},
]

export default administrativeRoutes
