import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'

export const App = () => {
  const elements = useRoutes(routes)

  return (
    <div>
      <Suspense fallback='loading'>
        <div>{elements}</div>
      </Suspense>
    </div>
  )
}
