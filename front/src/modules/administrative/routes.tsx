import type { RouteObject } from 'react-router-dom'
import EntitiesList from './entities/pages/List/List'
import EntitiesCreate from './entities/pages/Create/Create'
import EntitiesDetail from './entities/pages/Detail/Detail'
import EntitiesUpdate from './entities/pages/Update/Update'
import PlansList from './plans/pages/List/List'
import PlansCreate from './plans/pages/Create/Create'
import PlansDetail from './plans/pages/Detail/Detail'
import PlansUpdate from './plans/pages/Update/Update'
import PeopleList from './people/pages/List/List'
import PeopleCreate from './people/pages/Create/Create'
import PeopleDetail from './people/pages/Detail/Detail'
import PeopleUpdate from './people/pages/Update/Update'

const administrativeRoutes: RouteObject[] = [
    { path: '/entities', element: <EntitiesList /> },
    { path: '/entities/create', element: <EntitiesCreate /> },
    { path: '/entities/detail/:id', element: <EntitiesDetail /> },
    { path: '/entities/update/:id', element: <EntitiesUpdate /> },
    { path: '/plans', element: <PlansList /> },
    { path: '/plans/create', element: <PlansCreate /> },
    { path: '/plans/detail/:id', element: <PlansDetail /> },
    { path: '/plans/update/:id', element: <PlansUpdate /> },
    { path: '/people', element: <PeopleList /> },
    { path: '/people/create', element: <PeopleCreate /> },
    { path: '/people/detail/:id', element: <PeopleDetail /> },
    { path: '/people/update/:id', element: <PeopleUpdate /> },
]

export default administrativeRoutes
