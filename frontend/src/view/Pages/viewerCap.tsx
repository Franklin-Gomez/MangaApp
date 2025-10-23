import { useEffect, useState } from "react";
import { useParams , Link } from "react-router-dom"
import type { Manga } from "../../types";

export default function ViewerCap () {

  const [ mangaInfo , setmangaInfo ] = useState<Manga>();
  const [ paginaActual , setpaginaActual ] = useState(0);

  const param =  useParams();
  const mangaId = param.MangaId;  // id del manga 

  const aumentarContador = () => setpaginaActual( paginaActual + 1 ); 
  const disminuirContador = () => setpaginaActual( paginaActual - 1 ); 

  
  if(!mangaId) {  return <div>No se encontro el manga</div>  }

  async function fetchCap ( id: string ) {
    const response = await fetch(`/manga.json `)
    const data = await response.json() 

    if( data.error ) {
      throw new Error(data.message || "Manga no Encontrado")
    } 

    setmangaInfo( data.mangas[0] )  // Cambiar despues por el id
    
  }

  useEffect(() => {

    fetchCap(mangaId)

  } , [mangaId]);

  if( !mangaInfo ) return <div> "Cargando..."</div>

  const { capitulos } = mangaInfo; // todos los capitulos del manga

  const Idcapituloactual = capitulos[0].number

  const capituloActualx = capitulos.find((c) => c.id === mangaId);

  if( !capituloActualx ) return <div> No se encontro el capitulo </div>

  const handleChangePage = ( event: React.ChangeEvent<HTMLSelectElement> ) => {
    const selectedPageId = Number(event.target.value);
    
    setpaginaActual( selectedPageId - 1 )
  }

  return (
    <>

      <div>
          <section className="bg-oscuro w-full">

            <div className=" flex flex-col justify-center items-center gap-2 p-2">

              <h1 className="text-4xl text-primary">{ mangaInfo.title }</h1>
              
              <p className=" text-subtitle"> { mangaInfo.capitulos[Idcapituloactual - 1].title }</p>
              
            </div>

          </section>
          
          <div className="bg-primary"> {/* Layout para Pasar de Hoja dando click en los lados  y en la misma hoja del manga*/}
                
            <div className=" flex justify-center items-center">

              <select className="  p-2 rounded-md m-4" onChange={ (e) => handleChangePage(e) }>

                { capituloActualx.pages.map( ( cap ) =>(

                  // paginaActual + 1  porque el indice empieza en 0, Sin embargo las paginas empiezan en 1 
                  <option key={ cap.id } value={ cap.id} > Pagina : { paginaActual + 1  } </option>

                ))}
                
              </select>

            </div>

            { capitulos.map ( cap => (

              <div key={ cap.id } className=" grid grid-cols-3 items-center gap-2 p-2">

                <div className=" w-full h-full flex justify-center">
                  <button 
                    onClick={ disminuirContador }
                    className="w-full h-full"
                  ></button>
                </div>

                <button onClick={ aumentarContador } >

                  { cap.id ==  mangaId &&
                    <img className=" text-2xl text-primary h-full" 
                      src={ cap.pages[paginaActual].paginaUrl  } 
                      alt={`Pagina del capitulo ${ cap.title }` } 
                    />
                  }
                  
                </button>

                <div className="  w-full h-full flex justify-center">
                  <button 
                    onClick={ aumentarContador }
                    className="w-full h-full"
                  ></button>
                </div>
              </div>

            ))}

          </div>

          <section className="bg-oscuro w-full ">

            <div className=" flex justify-between items-center p-4 text-primary max-w-7xl mx-auto">

              <Link
                to="#"
                className=" hover:text-accent hover:text-secondary"
              >
                <div className="flex gap-2 items-center ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>

                  <span> Cap. Anterior </span>
                </div>
              </Link>


              <Link
                to="#"
                className=" hover:text-accent hover:text-secondary"
              >
                <div className="flex gap-2 items-center ">
                  <span> Cap. Siguiente </span>
                  
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>

            </div>

          </section>

      </div>

    </>
  )
}