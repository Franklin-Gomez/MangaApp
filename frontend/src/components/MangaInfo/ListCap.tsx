// import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteChapter, getAllChapters } from "../../api";
import { useStore } from "../../store";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ListCap ( ) {

    const pamra = useParams();
    const mangaId = pamra.MangaId

    const { setChapters } = useStore()
    const queryClient = useQueryClient()

    const { isPending , isError , data : chapters , error } = useQuery({
        queryKey: ['Chapters' , mangaId ],
        queryFn: () => getAllChapters(  mangaId! ),
        enabled: !!mangaId,
        retry: 0
    })

    useEffect(() => {
        if( chapters ) {
            setChapters( chapters )
        }
    }, [chapters])


    if( isPending ) return <div> "Cargando..."</div>
    if( isError ) return <div> { (error as Error).message || "Error cargando los capitulos" } </div>

    const handleDeleteChapter = async ( chapterId : string , mangaId : string ) => {
        // Aquí puedes implementar la lógica para eliminar el capítulo, por ejemplo, haciendo una solicitud a tu API
        const respuesta = await deleteChapter( chapterId , mangaId )

        if( respuesta.status != 200 ) return 

        toast.success(respuesta.message)
        
        queryClient.invalidateQueries({
            queryKey : ['Chapters' , mangaId ]
        })

    }

    return (
        <div className=" my-10 container  max-w-screen-xl mx-auto">  {/* Contenedor Principal */}

            <h2 className=" text-subtitle font-bold mb-4">Lista de Capitulos</h2>

    
            <div className=" space-y-4 max-h-[500px] overflow-y-auto pr-4 w-1/2 mx-auto">  {/* Contenedor de la Lista de Capitulos */}
            
                { 
                    chapters.map( ( cap ) => (
                        <div key={cap.id} className=" flex justify-between items-center p-4   bg-white/30 rounded transition-colors hover:bg-white/80 hover:shadow-lg">

                            <div className=" space-y-2">
                                <h3 className=" text-dialogue font-semibold"> <span className="font-bold mr-6  "> Cap : { cap.chapterNumber } : </span>  { cap.title }</h3>
                                <p className=" text-sm text-gray-300">Publicado el: 2024-01-01</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <Link to={`/viewer/${mangaId}/${cap.id}`} className=" bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">Leer</Link> 


                                <button 
                                    className=" flex items-center bg-red-500 hover:bg-red-800 cursor-pointer text-white px-4 py-2 rounded"
                                    onClick={ () => handleDeleteChapter( cap.id  , mangaId! ) }
                                >
                                    Eliminar
                                </button>
                            </div>                       
                        </div>
                    ))
                } 

            </div>

        </div> 
    )

}
