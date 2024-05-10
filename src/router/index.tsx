import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { lazy } from 'react'

const Country = lazy(() => import('@/views/country'))
const CountryV2 = lazy(() => import('@/views/countryV2'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/countryV2?currentPage=1'} />,
  },
  {
    path: '/country',
    element: <Country />,
  },
  {
    path: '/countryV2',
    element: <CountryV2 />,
  },
]

export default routes
