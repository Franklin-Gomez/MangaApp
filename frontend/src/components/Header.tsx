

export default function Header() {
  return (
    <div className=" text-primary  w-full"> 

      <nav className="flex justify-between items-center max-w-7xl mx-auto">

        <div>
          <h1 className="text-title p-4 font-">MangaApp</h1>
        </div>

        <ul className=" flex justify-around p-4 space-x-6">

          <div>
            <input type="text" placeholder="Buscar...." className="rounded-md p-1 text-black bg-primary w-2xs"/>
          </div>

          <li className="hover:text-accent hover:text-secondary"><a href="/biblioteca">Biblioteca</a></li>
          <li className="hover:text-accent hover:text-secondary"><a href="/perfile">Perfil</a></li>
          <li className="hover:text-accent hover:text-secondary"><a href="/registrarse">Registrarse</a></li>
          <li className="hover:text-accent hover:text-secondary"><a href="/cerrarsesion">Cerrar Sesion</a></li>

        </ul>
      </nav>
    
    </div>  
  )
}