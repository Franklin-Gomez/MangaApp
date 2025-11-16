// import data from '../../manga.json'
import { Link } from 'react-router-dom'
import type { Manga } from '../../types'

export default function MangaCard (  { manga }   : { manga: Manga } ) {

    return (
        <>

            <div className="">
   
                <div className=" ">
                    
                    <div className='flex flex-col items-center text-center text-dialogue '>

                        <div className='relative overflow-hidden group'>

                            <div className=" w-52 h-82  shadow-2xl rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-ou group-hover:scale-105 ">
                                <img  
                                    className=" w-full h-full object-cover"
                                    src={ manga.coverUrl }
                                />
                            </div>
                            

                            <div className="absolute left-0 top-0 w-full h-full  flex flex-col justify-between rounded  bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto py-4">
                            
                                <span className="text-white text-lg flex-grow overflow-auto px-4"></span>

                                <div className='flex justify-center gap-2 mt-2 '>
                                    <Link 
                                        to={`/library/${manga.id}`}
                                        className="bg-blue-500 text-white px-4 py-2 rounded m-2 hover:bg-blue-600 transition-colors" 
                                    >Leer</Link>
                                    <button className="bg-green-500 text-white px-4 py-2 rounded m-2 hover:bg-green-600 transition-colors">Agregar</button>
                                </div>
                                
                            </div>

                        </div>

                    </div>
     
                </div>
            </div>
        </>
    
    )

}