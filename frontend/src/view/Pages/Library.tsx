import {  useEffect, useState } from "react"
import type { Manga } from "../../types"
import MangaCard from "../../components/lobby/MangaCard"
import { useForm, type SubmitHandler } from "react-hook-form"
import { set } from "zod"

type FormsInputs = {
    search: string
    sortBy: string
}

export default function Library () {

    const [Mangas , setMangas] = useState<Manga[]>()
    const { register, handleSubmit } = useForm<FormsInputs>({
        defaultValues : { 
            search: "",
            sortBy: "title-asc"
        }
    })

    async function fetchMangas () {
        // Lógica para obtener la lista de mangas de la biblioteca del usuario

        try {

            const response = await fetch('/public/manga.json')
            const data = await response.json()

            if( data.error ) { 
                throw new Error(data.message || "Error al cargar la biblioteca")
            }

            setMangas( data.mangas ) 
            
        } catch (error) {
            console.log( error )
        }

    }

    useEffect(() => {   
        fetchMangas()
    },[])

    const handleSearch : SubmitHandler<FormsInputs> = ( data ) => {
        const { search , sortBy } = data

        const filteredMangas = Mangas?.filter( manga => 
            manga.title.toLowerCase().includes( search.toLowerCase() )
        )

        filteredMangas && ( setMangas( filteredMangas ) )        

        // Lógica para ordenar los mangas según el criterio seleccionado
        //let sortedMangas = [...(filteredMangas || [])]

    }

    { console.log(Mangas) }


    return ( 

        <>

            <div className="flex"> 
                
                <div className=" flex content-center space-x-4 py-4">

                    <form className="flex" onSubmit={  handleSubmit( handleSearch ) } >
                        <div className="flex items-center space-between space-x-2">

                            <input 
                                type="text" 
                                placeholder="Buscar...." 
                                className="rounded-md p-1 text-black bg-white w-2xs"
                                {...register("search")}
                            />

                            <label> Ordenar por : </label>

                            <select className="bg-white" {...register("sortBy")}> 
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

                <form className="basis-1/4 bg-gray-400 p-4 rounded-md mt-4 h-auto">

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
                    <MangaCard/>
                </main>


            </div>
        </>

    )

}