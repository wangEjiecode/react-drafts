import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import Login from './views/login'

export const App = () => {
  const elements = useRoutes(routes)

  return (
    <div>
      <Suspense fallback='loading'>
        <Login />
        <div>{elements}</div>
      </Suspense>
    </div>
  )
}
