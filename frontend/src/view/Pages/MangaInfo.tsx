import { useEffect, useState } from "react"
import type  { Manga } from "../../types"
import ListCap from "../../components/MangaInfo/ListCap"

export default function MangaInfo () { 

    const [ MangaInfo , SetMangaInfo] = useState<Manga>()

    async function fetchManga () {

        const response = await fetch('/manga.json')
        const data = await response.json()
       
        if( data.error ) { 
            throw new Error(data.message || "Manga no Encontrado")
        }

        SetMangaInfo( data.mangas[0])

    }

    useEffect(() => {

        fetchManga() 
        
    },[])

    
    if( !MangaInfo ) return <div> "Cargando..."</div>

    console.log(MangaInfo.genre)

    return (

        <>
            <div className="relative ">

              
                <div 
                    className={` relative bg-cover bg-[center_25%] h-96 w-full z-0`}
                    style={{ backgroundImage: `url('${MangaInfo.coverUrl}')` }}
                >  {/* Div Con el Background */}
                    <div className="absolute inset-0 bg-black/60 "></div>

                </div>
                

                <div className=" relative z-10 container mx-auto -mt-38 backdrop-blur-lg  ">
                    <div className=" grid grid-cols-[1fr_2fr] gap-6">  {/* Grid con la Imagen y el Titulo */}

                        <div className="">  {/* Div con la Imagen */}

                            <img src={`${MangaInfo.coverUrl}`} 
                                alt="{MangaInfo.title}" 
                                className=" w-48 h-74  border-4 border-white shadow-lg mx-auto rounded "
                            />

                        </div>

                        <div>
                            <h1 className=" text-title text-white">{MangaInfo.title}</h1>
                            <p className="  text-tenue mt-2">{MangaInfo.description}</p>
                            <p className=" text-primary  mt-2"> {MangaInfo.author}</p>

                            <div className=" mt-4 flex gap-4 space-x-3.5">

                                { MangaInfo.genre.map( (gen, index) => (
                                    <p key={index} className="  px-2 py-1 rounded shadow hover:shadow-lg transition text-primary bg-muy-oscuro">{gen}</p>
                                ))}

                            </div>
                            
                            <p className="mt-4 text-dialogue text-oscuro">En Publicacion</p>

                            <div>
                                <button className=" mt-4 px-4 py-2 border  rounded shadow hover:shadow-lg transition">Leer Ahora</button>
                                <button className=" mt-4 ml-4 px-4 py-2 border  rounded shadow hover:shadow-lg transition">Agregar a Favoritos</button>
                                <button className=" mt-4 ml-4 px-4 py-2 border rounded shadow hover:shadow-lg transition">Ver Capitulos</button>
                            </div>
                        </div>


                    </div>

                    <ListCap/>

                </div>

            </div>
        </>



        
    )
}
