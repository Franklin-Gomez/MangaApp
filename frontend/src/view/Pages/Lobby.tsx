import MangaCard from "../../components/lobby/MangaCard";
import { getAllMangas } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../store";
import { useEffect } from "react";

export default function Lobby () {

  //const [ Mangas, setMangas ] = useState<Manga[]>() 
  //const { mangas, setMangas } = useStore()

  const { isPending , isError , data  } = useQuery({
    queryKey: ['mangas'],
    queryFn: getAllMangas,
    retry: 0,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })

  // useEffect(() => {
  //   if( data) { 
  //     setMangas( data )
  //   }
  // }, [ data, setMangas ] )

  if(isPending) return <div> Loading... </div>
  if(isError) return <div> Error: llamado a API fallo </div>
  if (!data ) return <div> Loading... </div>




  //console.log( mangas )

  // async function fetchMangas() {
  //     const response = await fetch('./manga.json')
  //     const data = await response.json()

  //     if( data.error )  {
  //         throw new Error( data.message || 'Something went wrong' )
  //     }

  //     setMangas( data.mangas )
  // }

  // useEffect(() => {
      
  //   fetchMangas()

  // }, [])

  return (
    <>

      <div className=" container  my-8 w-full ">
        <div>
          <h1 className=" text-subtitle my-2 p-2"> Mas Populares </h1>
        </div>

        <div className=" grid  grid-cols-7 ">

          { data.map( ( manga ) => (
            
            <MangaCard
              key={ manga.id }
              manga={ manga }
            />
            
          ))} 

        </div>
        
        
        {/* <div>
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