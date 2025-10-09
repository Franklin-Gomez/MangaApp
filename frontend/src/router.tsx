import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ClientDashboard from './view/clienDashboard'
import Lobby from './view/Pages/Lobby'
import MangaInfo from './view/Pages/MangaInfo'
import ViewerCap from './view/Pages/viewerCap'
import ViewerCapDashboard from './view/viewerCapDashboard'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes >
        <Route element={<ClientDashboard />}>

          <Route path="/" element={<Lobby/>} />
          <Route path="/library/:MangaId" element={<MangaInfo/>} />

        </Route>

        <Route element={<ViewerCapDashboard/>} >

          <Route path="/viewer/:MangaId/" element={<ViewerCap/>} />
        
        </Route>
      </Routes>
    </BrowserRouter>
  )
}