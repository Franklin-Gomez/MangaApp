import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ClientDashboard from './view/clienDashboard'
import Lobby from './view/Principal/lobby'


export default function Router() {
  return (
    <BrowserRouter>
      <Routes >
        <Route element={<ClientDashboard />}>

          <Route path="/" element={<Lobby/>} />
          <Route path="/about" element={<div>About</div>} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}