import MangaCard from "../../components/lobby/MangaCard";
import { useEffect, useState } from "react";
import type { Manga } from "../../types";

export default function Lobby () {

  const [ Mangas, setMangas ] = useState<Manga[]>() 

  async function fetchMangas() {
      const response = await fetch('./manga.json')
      const data = await response.json()

      if( data.error )  {
          throw new Error( data.message || 'Something went wrong' )
      }

      setMangas( data.mangas )
  }

  useEffect(() => {
      
      fetchMangas()

  }, [])

  if ( !Mangas ) return <div> Loading... </div>

  return (
    <>

    <div className=" container  my-8 w-full ">
      <div>
        <h1 className=" text-subtitle my-2 p-2"> Mas Populares </h1>
      </div>

      <div className=" grid  grid-cols-7 ">

        { Mangas.map( ( manga ) => (
          
          <MangaCard
            key={ manga.id }
            manga={ manga }
          />
          
        ))}
        
      </div>
      
      {/* 
      <div>
        <h1 className=" text-subtitle my-2 p-2"> Mangas Tendencias </h1>
      </div>

      <div className=" grid grid-cols-3 gap-4 ">
        <MangaCard/>
      </div>

      <div>
        <h1 className=" text-subtitle"> Ultimpos grgados </h1>
      </div>

      <div className=" grid grid-cols-3 gap-4 ">
        <MangaCard/>
      </div>

      <div>
        <h1 className="text-subtitle"> Ultimos subidos </h1>
      </div>

      <div className=" grid grid-cols-3 gap-4 ">
        <MangaCard/>
      </div> */}

    </div>

    </>

  )
}