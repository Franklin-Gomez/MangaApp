// import data from '../../manga.json'
import { useEffect , useState } from 'react'
import type { Manga } from '../../types'
import { Link } from 'react-router-dom'

export default function MangaCard () {

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

            <div className=" container  my-4 w-max">
   
                <div className=" grid grid-cols-6 gap-4 ">
                    
                     { Mangas.map( ( manga ) => (
                        <div key={ manga.id } className='flex flex-col items-center text-center text-dialogue '>

                            <div className='relative overflow-hidden group'>

                                <div className=" w-52 h-82  shadow-2xl rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-ou group-hover:scale-105 ">
                                    <img src={`/public/${manga.coverUrl}` } className=" w-full h-full object-cover"/>
                                </div>
                                

                                <div className="absolute left-0 top-0 w-full h-full  flex flex-col justify-between rounded  bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto py-4">
                                
                                    <span className="text-white text-lg flex-grow overflow-auto px-4">{manga.description}</span>

                                    <div className='flex justify-center gap-2 mt-2 '>
                                        <Link className="bg-blue-500 text-white px-4 py-2 rounded m-2 hover:bg-blue-600 transition-colors" to={`/library/${manga.id}`} >Leer</Link>
                                        <button className="bg-green-500 text-white px-4 py-2 rounded m-2 hover:bg-green-600 transition-colors">Agregar</button>
                                    </div>
                                    
                                </div>

                            </div>

                            { manga.title }

                        </div>
                    ) ) } 
                           
                </div>
            </div>
        </>
    
    )

}