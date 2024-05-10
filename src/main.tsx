import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'
import { QueryParamProvider } from 'use-query-params'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { App } from './App.tsx'
import store from './store/index.tsx'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </Provider>
        </QueryClientProvider>
      </QueryParamProvider>
    </BrowserRouter>
  </React.StrictMode>
)
