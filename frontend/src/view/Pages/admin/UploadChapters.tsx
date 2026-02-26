import { IoIosCloudUpload  } from "react-icons/io";
import { IoAdd } from "react-icons/io5"
import { FaTrashCan } from "react-icons/fa6";
import { LuUpload } from "react-icons/lu";


export const UploadChapters = () => {

    return (   
        <>
            <div className="max-w-5xl mx-auto space-y-10">
            
                <div className="p-10 bg-white rounded-xl shadow-sm border border-slate-200 mt-12"> 


                    {/* Manga Info */}
                
                    <div className="grid grid-cols-[1fr_8fr] gap-4 h-36">

                        <div className="h-full w-full overflow-hidden rounded-lg">

                            <img
                                src="/public/portada/OnePiece.jpg"
                                alt="Portada del Manga"
                                className="h-full object-contain"
                            />

                        </div>


                        <div className="space-y-4">

                            <h2 className="text-2xl font-bold ">One Piece</h2>
                            <p className="text-gray-600 "> Agregando Capitulo : <span className="text-[#0071E3] hover:text-[#0056B3] cursor-pointer"> 54 </span> </p>
                            <p className="text-gray-600 "> Ultimo Capitulo : <span className="text-[#0071E3] hover:text-[#0056B3] cursor-pointer"> 53 </span> </p>

                        </div>


                    </div>

                </div>

                {/* drop zone para subir Capitulo */}

                <div className="border-2 border-dashed border-slate-300 bg-slate-50 hover:border-[#0071E3] hover:bg-blue-100/20  rounded-2xl flex flex-col items-center justify-center py-16 transition-colors">

                    <div className="bg-blue-200  p-4  rounded-full mb-4">
                        <IoIosCloudUpload
                            className="text-[#0071E3] w-10 h-10"
                        />
                    </div>

                    <p className=" mb-2 font-bold">Arrastra y suelta las imágenes del capítulo aquí, o haz clic para seleccionar los archivos.</p>
                    <p className="mb-6 text-gray-600">  soporta JPG,PNG, WEBP. <span className="font-bold" > (5mb max por pagina)  </span></p>
                    <input type="file" className="hidden" id="fileInput" multiple />
                    <label htmlFor="fileInput" className="cursor-pointer  flex justify-center items-center  px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">

                        <IoAdd
                            className="text-white font-bold"
                        />

                        <span className="ml-2">
                            Seleccionar Archivos

                        </span>
                    </label>    

                </div>


                {/* Grilla de imagenes */}
                <div>

                    <div className="flex justify-between items-center">
                        <h3 className="font-bold"> Carga de Imagenes </h3>

                        <button className=" flex items-center justify-center gap-2 text-gray-600 cursor-pointer"> <span className=""> <FaTrashCan/> </span> Borrar todas </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">

                        <div className="flex items-center justify-center aspect-[3/4] bg-slate-100 rounded-md border-2 border-slate-300 border-dashed overflow-hidden group ">
              
                            <p className="text-gray-400"> Pagina 1 </p> 
                          
                        </div>

                    </div>

                </div>


            </div>

            { /* Barra de progreso y acciones */ }

            <div className=" flex items-center justify-between  mx-auto w-full max-w-5xl px-2 py-4 mt-10 mb-20 bg-slate-100 rounded-lg shadow-md overflow-hidden  ">

                <div className="px-2">
                    <p className="block text-gray-400 text-sm">Cargando Imagenes...</p>

                    <div className="flex justify-center items-center gap-2">
                        <div className=" flex-1 h-2 w-32 bg-slate-300 rounded-full overflow-hidden ">
                            <div className="bg-[#0071E3] h-full" style={{width: "25%"}}></div>
                        </div>
                        <div className=" text-black font-bold whitespace-nowrap"> 3 de 12  cargados </div>
                    </div>
                </div>
                
                
                <div className="flex justify-center items-center gap-4  px-4 py-2 ">
                    <button
                        type="button"
                        className="font-medium px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-300 transition-colors cursor-pointer"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className=" bg-[#0071E3] hover:bg-[#0056B3] font-medium text-white px-6 py-3 rounded-lg  transition-colors cursor-pointer"
                    >
                        <LuUpload className="inline-block mr-2" />
                        Cargar capitulo 
                    </button>
                </div>

            </div>
        </>

        
    )
}