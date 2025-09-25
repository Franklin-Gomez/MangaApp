import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ClientDashboard from './view/clienDashboard'
import Lobby from './view/Pages/Lobby'
import MangaInfo from './view/Pages/MangaInfo'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes >
        <Route element={<ClientDashboard />}>

          <Route path="/" element={<Lobby/>} />
          <Route path="/library/:MangaId" element={<MangaInfo/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}