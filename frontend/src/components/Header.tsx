import { Link , NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className=" text-primary  w-full"> 

      <nav className="flex justify-between items-center max-w-7xl mx-auto">

        <Link to="/">
          <h1 className="text-title p-4 font-">MangaApp</h1>
        </Link>

        <ul className=" flex justify-around p-4 space-x-6">
     
          <div>
            <input type="text" placeholder="Buscar...." className="rounded-md p-1 text-black bg-primary w-2xs"/>
          </div>

          <li className="hover:text-accent hover:text-secondary"><NavLink to="/library">Biblioteca</NavLink></li>
          <li className="hover:text-accent hover:text-secondary"><NavLink to="/perfile">Perfil</NavLink></li>
          <li className="hover:text-accent hover:text-secondary"><NavLink to="/login">Registrarse</NavLink></li>
          <li className="hover:text-accent hover:text-secondary"><NavLink to="/admin">Admin</NavLink></li>
          <li className="hover:text-accent hover:text-secondary"><NavLink to="/cerrarsesion">Cerrar Sesion</NavLink></li>

        </ul>
      </nav>
    
    </div>  
  )
}