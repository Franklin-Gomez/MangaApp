import { Link, useParams } from "react-router-dom"

export default function HeaderMangaView () {

  const param = useParams()
  const mangaId = param.MangaId;

  return (
    
    <div className=" text-primary  w-full "> 

      <nav className="flex justify-between items-center max-w-7xl mx-auto">

        <Link to="/">
          <h1 className="text-title p-4 font-">MangaApp</h1>
        </Link>

        <ul className=" flex justify-around p-4 space-x-6">

          <div>
            <input type="text" placeholder="Buscar...." className="rounded-md p-1 text-black bg-primary w-2xs"/>
          </div>

          <li className="hover:text-accent hover:text-secondary"><Link to="/biblioteca">Biblioteca</Link></li>
          <li className="hover:text-accent hover:text-secondary"><Link to={`/library/${mangaId}`}>Volver</Link></li>

        </ul>
      </nav>
    
    </div>
  )
}