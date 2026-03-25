import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(

  <QueryClientProvider client={queryClient} > 

    <StrictMode>
      <Router />

      <ToastContainer/>
    </StrictMode>

  </QueryClientProvider>
)
