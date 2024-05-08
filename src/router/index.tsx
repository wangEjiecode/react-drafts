import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { lazy } from 'react'

const Introduction = lazy(() => import('@/views/introduction'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/introduction'} />,
  },
  {
    path: '/introduction',
    element: <Introduction />,
  },
]

export default routes
