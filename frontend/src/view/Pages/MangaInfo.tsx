import { useEffect } from "react"
import ListCap from "../../components/MangaInfo/ListCap"
import { NavLink, useParams , useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { deleteManga, getMangaById } from "../../api"
import { useStore } from "../../store"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

export default function MangaInfo () { 

    const { MangaId } = useParams<{ MangaId: string }>()
    const { manga , setManga } = useStore() 
    const  navigate  = useNavigate()
    const queryClient = useQueryClient()

    const {  data , error: queryError , isLoading } = useQuery({
        queryKey: ['OneManga' , MangaId],
        queryFn: () => getMangaById( MangaId! ),
        enabled: !!MangaId && !manga,
        retry: 0
    })

    useEffect(() => {
        if ( !manga && data ) {
            setManga( data )
        }
    }, [data])

    
    const handleDeleteManga = async ( mangaId : string ) => { 
        
        try { 
            await deleteManga( mangaId ) ; 

            queryClient.invalidateQueries({ queryKey: ['mangas'] })
    
            navigate("/")
            toast.success("Manga eliminado exitosamente")
 
        } catch ( error ) { 

            console.log( error )
        
        }

    }

    if ( !MangaId  ) return <div> "Manga no encontrado"</div>
    if ( isLoading ) return <div> "Cargando..."</div>
    if ( queryError ) return <div> Error </div>
    if (!manga && !data ) return <div> "Manga no encontrado"</div>
    if ( !manga ) return 

    return (

        <>
            <div className="relative ">

                <div 
                    className={` relative bg-cover bg-[center_25%] h-96 w-full z-0`}
                    style={{ backgroundImage: `url('${manga.coverUrl}')` }}
                >  {/* Div Con el Background */}
                    <div className="absolute inset-0 bg-black/60"></div>

                </div>
                

                <div className=" relative z-10 container mx-auto -mt-38 backdrop-blur-lg  ">
                    <div className=" grid grid-cols-[1fr_2fr] gap-6">  {/* Grid con la Imagen y el Titulo */}

                        <div className="">  {/* Div con la Imagen */}

                            <img src={`${manga.coverUrl}`} 
                                alt="{manga.title}" 
                                className=" w-48 h-74  border-4 border-white shadow-lg mx-auto rounded "
                            />

                        </div>

                        <div>
                            <h1 className=" text-title text-white">{manga.title}</h1>
                            <p className="  text-tenue mt-2">{manga.description}</p>
                            <p className=" text-primary  mt-2"> {manga.author}</p>

                            <div className=" mt-4 flex gap-4 space-x-3.5">

                                { manga.genre.map( (gen, index ) => (
                                    <p key={index} className="  px-2 py-1 rounded shadow hover:shadow-lg transition text-primary bg-muy-oscuro">{gen}</p>
                                ))}

                            </div>
                            
                            <p className="mt-4 text-dialogue text-oscuro">En Publicacion</p>

                            <div>
                                <button 
                                    className="mt-4 ml-4 px-4 py-2 border rounded shadow hover:shadow-lg transition hover:cursor-pointer"
                                >
                                    Leer Ahora

                                </button>

                                <button 
                                    className="mt-4 ml-4 px-4 py-2 border rounded shadow hover:shadow-lg transition hover:cursor-pointer"
                                >
                                    Agregar a Favoritos
                                </button>


                                <NavLink 
                                    className=" mt-4 ml-4 px-4 py-2 border rounded shadow hover:shadow-lg transition hover:cursor-pointer"
                                    to={`/admin/uploadChapters/${manga.id}`}

                                >Agregar Capitulos</NavLink>


                                <button
                                    className="mt-4 ml-4 px-4 py-2 border rounded shadow hover:shadow-lg transition hover:cursor-pointer"

                                    onClick={ () => handleDeleteManga( MangaId )}
                                >
                                    Eliminar Manga 
                                </button>
                                
                            </div>
                        </div>

                    </div>

                    <ListCap /> 

                </div>

            </div>
        </>



        
    )
}
