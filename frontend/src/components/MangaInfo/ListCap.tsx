// import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import type { MangaCapitulos } from "../../types"

type ListCapProps = {
    capitulos: MangaCapitulos
}

export default function ListCap ( { capitulos } : ListCapProps  ) {

    const pamra = useParams();
    const mangaId = pamra.MangaId;

    // const [ mangas , setMangas ] =  useState<Manga[]>()

    // async function fetchCaps () {
    //     const response = await fetch('/manga.json')
    //     const data = await response.json()

    //     if( data.error ) { 
    //         throw new Error(data.message || "Manga no Encontrado")
    //     }

    //     setMangas( data.mangas )
    // }

    // useEffect(() => {
    //     fetchCaps()
    // },[])


    // if ( !mangas ) return <div> "Cargando..."</div>


    return (
        <div className=" my-10 container  max-w-screen-xl mx-auto">  {/* Contenedor Principal */}

            <h2 className=" text-subtitle font-bold mb-4">Lista de Capitulos</h2>

    
            <div className=" space-y-4 max-h-[500px] overflow-y-auto pr-4 w-1/2 mx-auto">  {/* Contenedor de la Lista de Capitulos */}
            
                { 
                    capitulos.map( ( cap ) => (
                        <div key={cap.id} className=" flex justify-between items-center p-4   bg-white/30 rounded transition-colors cursor-pointer">

                            <div>
                                <h3 className=" text-dialogue font-semibold"> { cap.title }</h3>
                                <p className=" text-sm text-gray-300">Publicado el: 2024-01-01</p>
                            </div>

                            <div>
                                <Link to={`/viewer/${mangaId}/${cap.id}`} className=" bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Leer</Link>   
                            </div>

                        </div>
                    ))
                }

            </div>

        </div> 
    )

}
