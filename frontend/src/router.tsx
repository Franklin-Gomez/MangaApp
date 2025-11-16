import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ClientDashboard from './view/clienDashboard'
import Lobby from './view/Pages/Lobby'
import MangaInfo from './view/Pages/MangaInfo'
import ViewerCap from './view/Pages/viewerCap'
import ViewerCapDashboard from './view/viewerCapDashboard'
import Library from './view/Pages/Library'
import Login  from './view/Pages/Login'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes >
        <Route element={<ClientDashboard />}>

          <Route path="/" element={<Lobby/>} />
          <Route path="/library/:MangaId" element={<MangaInfo/>} />
          <Route path="/library" element={<Library/>} />
          <Route path="/login" element={<Login/>} />
          
        </Route>

        <Route element={<ViewerCapDashboard/>} >

          <Route path="/viewer/:mangaId/:capId" element={<ViewerCap/>} />
        
        </Route>
      </Routes>
    </BrowserRouter>
  )
}