import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './auth/AuthProvider'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <QueryClientProvider client={queryClient} > 

      <AuthProvider>

          <Router />

          <ToastContainer/>

      </AuthProvider>

    </QueryClientProvider>
  </StrictMode>
)
