import { Link , NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { toast } from "react-toastify";

export default function Header() {
  
  // const login = localStorage.getItem('AUTH_TOKEN');

  const { token , logout } = useAuth();
  
  return (
    <div className=" text-primary  w-full"> 

      <nav className="flex justify-between items-center max-w-7xl mx-auto">

        <Link to="/">
          <h1 className="text-title p-4 font-">MangaApp</h1>
        </Link>

        <ul className=" flex justify-around items-center p-4 space-x-6">
     
          <div>
            <input type="text" placeholder="Buscar...." className="rounded-md p-1 text-black bg-primary w-2xs"/>
          </div>

          <li className="hover:text-accent hover:text-secondary"><NavLink to="/library">Biblioteca</NavLink></li>
          <li className="hover:text-accent hover:text-secondary"><NavLink to="/perfile">Perfil</NavLink></li>
          <li className="hover:text-accent hover:text-secondary"><NavLink to="/admin/uploadManga">Subir Manga</NavLink></li>
          <li className="hover:text-accent hover:text-secondary"><NavLink to="/admin">Admin</NavLink></li>

          { token ? 
            ( <li className="hover:text-accent hover:text-secondary" >

              <button 
                onClick={() => {
                  logout();
                  toast.success('Sesion cerrada exitosamente');
                }}
                className="cursor-pointer"
              >
                Cerrar Sesion

              </button></li> ) 

          :
            ( <li className="hover:text-accent hover:text-secondary"><NavLink to="/login">Iniciar Sesion</NavLink></li> ) 
          }  
          

        </ul>
      </nav>
    
    </div>  
  )
}