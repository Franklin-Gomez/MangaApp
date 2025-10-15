import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { Manga } from "../../types";

export default function ViewerCap () {

  const [ mangaInfo , setmangaInfo ] = useState<Manga>();
  const [ contador , setContador ] = useState(0);

  const param =  useParams();
  const mangaId = param.MangaId;

  const aumentarContador = () => setContador( contador + 1 ); 
  const disminuirContador = () => setContador( contador - 1 ); 

  
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

  const { capitulos } = mangaInfo;

  return (
    <>

      <div>
          <section className="bg-oscuro w-full">

            <div className=" flex flex-col justify-center items-center gap-2 p-2">
              <h1 className="text-4xl text-primary">{ mangaInfo.title }</h1>

              { capitulos.map ( cap => (  
              
                <p className=" text-subtitle"> { cap.title }</p>

              ))}
              
            </div>

          </section>

          
          <div className="bg-primary">

            { capitulos.map ( cap => (

              <div key={ cap.id } className=" grid grid-cols-3 items-center gap-2 p-2">

                <div className=" w-full h-full flex justify-center">
                  <button 
                    onClick={ disminuirContador }
                    className="w-full h-full"
                  ></button>
                </div>

                <button onClick={ aumentarContador } >
                  <img className=" text-2xl text-primary h-full" src={ cap.pages[contador] } alt={`Pagina del capitulo ${ cap.title }` } />
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
              <div>
                <span> Capitulo Anterior </span>
              </div>

              <div>
                <span> Capitulo Siguiente </span>
              </div>
            </div>

          </section>

      </div>

    </>
  )
}