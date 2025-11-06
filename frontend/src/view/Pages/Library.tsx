import {  useEffect, useState } from "react"
import type { Manga } from "../../types"

export default function Library () {

    const [Mangas , setMangas] = useState<Manga[]>()

    async function fetchMangas () {
        // Lógica para obtener la lista de mangas de la biblioteca del usuario

        try {

            const response = await fetch('/public/manga.json')

            console.log( response)
            const data = await response.json()

            console.log( data )

            if( data.error ) { 
                throw new Error(data.message || "Error al cargar la biblioteca")
            }

            setMangas( data.mangas )

            // Procesar y establecer los datos obtenidos    
            
        } catch (error) {
            console.log( error )
        }
    }

    useEffect(() => {   
        fetchMangas()
    },[])


    console.log( Mangas )
    
    return ( 

        <>

            <div className="flex"> 
                
                <div className=" flex content-center space-x-4 py-4">

                    <form className="flex">
                        <div className="flex items-center space-between space-x-2">

                            <input type="text" placeholder="Buscar...." className="rounded-md p-1 text-black bg-white w-2xs"/>

                            <label> Ordenar por : </label>

                            <select className="bg-white"> 
                                <option value="title-asc">Titulo Ascendente</option>
                                <option value="title-desc">Titulo Descendente</option>
                                <option value="date-added-asc">Fecha de agregado Ascendente</option>
                                <option value="date-added-desc">Fecha de agregado Descendente</option>
                                <option value="author-asc">Puntuacion Ascendente</option>
                                <option value="author-desc">Puntuacion Descendente</option>
                            </select>

                        </div>

                        

                        <input type="submit" value="Buscar" className="bg-secondary rounded-md p-1 ml-2"/>

                    </form>

                </div>

            </div>

            <div className=" flex flex-row gap-4   ">

                <form className="basis-xs bg-gray-400 p-4 rounded-md">

                    <aside>
                        <div>
                            <label> Genero:</label>
                            <select>
                                <option value="all">Todos</option>
                                <option value="action">Accion</option>
                                <option value="romance">Romance</option>
                                <option value="comedy">Comedia</option>
                                <option value="horror">Horror</option>
                            </select>
                        </div>
                    </aside>

                    <button type="submit" className="bg-gray-500 hover:bg-gray-600 rounded-md p-1 mt-2 w-full"> Filtrar </button>
                    
                </form>


                <main className="basis-2/3">
                    {/* Aquí iría la lista de mangas en la biblioteca del usuario */}
                    <p>Lista de mangas en la biblioteca del usuario</p>
                </main>


            </div>
        </>

    )

}