import type { RouteObject } from 'react-router-dom'
import EvaluationsList from './evaluations/pages/List/List'
import EvaluationsCreate from './evaluations/pages/Create/Create'
import EvaluationsDetail from './evaluations/pages/Detail/Detail'
import EvaluationsUpdate from './evaluations/pages/Update/Update'

const administrativeRoutes: RouteObject[] = [
    { path: '/evaluations', element: <EvaluationsList /> },
    { path: '/evaluations/create', element: <EvaluationsCreate /> },
    { path: '/evaluations/detail/:id', element: <EvaluationsDetail /> },
    { path: '/evaluations/update/:id', element: <EvaluationsUpdate /> },
]

export default administrativeRoutes
