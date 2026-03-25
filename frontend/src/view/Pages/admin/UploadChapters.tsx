import { IoIosCloudUpload  } from "react-icons/io";
import { IoAdd } from "react-icons/io5"
import { FaTrashCan } from "react-icons/fa6";
import { LuUpload } from "react-icons/lu";
import { useStore } from "../../../store";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createChapter } from "../../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const UploadChapters = () => {

    const { manga , chapters  } = useStore()
    const { register, handleSubmit  } = useForm()
    const [ previewImage , setPreviewImage  ] = useState<string[]>([])
    const [ uploadProgress, setUploadProgress] = useState(0)
    const [ files, setFiles ] = useState<File[]>([])
    const [ numberChapter, setNumberChapter ] = useState<number>(0)
    const [ titleChapter, setTitleChapter ] = useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState(false) // estado de carga 
    
    const navigate  = useNavigate()

    if( !manga ) return <div> "Manga no encontrado"</div>
    if( !chapters ) return <div> "Cargando..."</div>

    const ultimoCapitulo = chapters.length > 0 ? chapters[chapters.length - 1 ].chapterNumber : 0 ;

    
    // Generar URLs de vista previa para cada archivo seleccionado, guardamos en state
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const filesRaw = Array.from(event.target.files || [])
        const urls = filesRaw.map( ( file ) =>  URL.createObjectURL(file))
        
        setFiles(filesRaw)
        setPreviewImage(urls)

    };

    // Función para subir el capítulo al backend
    // const uploadChapter = async () => {

    //     const formData = new FormData()

    //     const url = `${import.meta.env.VITE_API_URL}/api/chapters/create`;

    //     files.forEach(file => {
    //         formData.append("pages", file)
    //     })

    //     await axios.post(url, formData, {

    //         headers: {
    //         "Content-Type": "multipart/form-data"
    //         },

    //         onUploadProgress: (progressEvent) => {

    //             const percent = (progressEvent.loaded * 100) / progressEvent.total! 

    //             setUploadProgress(Math.round(percent))

    //         },

    //         maxRedirects: 0

    //     })

    // }

    const onSubmit = async ( ) => {

        try {
            setIsSubmitting( true )
            const formData = new FormData()

            files.forEach(file => {
                formData.append("pages", file)
            })

            formData.append("chapterNumber", numberChapter.toString())
            formData.append("title", titleChapter)
            formData.append("mangaId", manga.id)


            formData.forEach( ( value , key ) => {
            console.log("FormData key: ", key, " value: ", value)
            })

            const response = await createChapter( formData )

            setUploadProgress(response.progreso)

            
             
            if( response.progreso == 100 ) { 
                navigate( `/library/${manga.id}`)
                toast.success("Capitulo agregado correctamente")
            }
            
            
        } catch (error) {

            console.log( error )
            toast.error("Error al agregar el capitulo ")

        } finally { 
            
            setIsSubmitting(false )

        }

    }
    
    return (   
        <form 
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="max-w-5xl mx-auto space-y-10">

                
                {/* Manga Info Containers */}
            
                <div className="p-10 bg-white rounded-xl shadow-sm border border-slate-200 mt-12"> 
                
                    <div className="grid grid-cols-[1fr_8fr] gap-4 ">

                        <div className="h-full w-full overflow-hidden rounded-lg">

                            <img
                                src={manga.coverUrl}
                                alt="Portada del Manga"
                                className="h-full object-contain"
                            />

                        </div>


                        <div className="space-y-4">

                            <h2 className="text-2xl font-bold ">{manga?.title}</h2>
                            <p className="text-gray-600 "> Ultimo Capitulo : <span className="text-[#0071E3] hover:text-[#0056B3] cursor-pointer"> { ultimoCapitulo } </span> </p>

                            <div className="flex items-center  gap-2" >
                                <label htmlFor="tituloChapter" className="block text-sm font-medium text-gray-700 ">
                                    Titulo del Capítulo : 
                                </label>
                                <input
                                    type="text"
                                    id="tituloChapter"
                                    className="text-gray-600 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={(e) => setTitleChapter(e.target.value)}
                                    // {...register("title", { required: true }) }
                                />
                            </div>

                            <div className="flex   items-center  gap-2" >
                                <label htmlFor="numberChapter" className="block text-sm font-medium text-gray-700 ">
                                    Número de Capítulo : 
                                </label>
                                <input
                                    id="numberChapter"
                                    type="number"
                                    className="text-gray-600 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={(e) => setNumberChapter(parseInt(e.target.value) || 0)}
                                    // {...register("chapterNumber", { required: true, valueAsNumber: true }) }
                                />
                            </div>

                        </div>


                    </div>

                </div>

                {/* drop zone para subir Capitulo */}

                <label 
                    htmlFor="fileInput" 
                    className="border-2 border-dashed border-slate-300 bg-slate-50 hover:border-[#0071E3] hover:bg-blue-100/20  rounded-2xl flex flex-col items-center justify-center py-16 transition-colors hover:cursor-pointer"
                >

                    <div className="bg-blue-200  p-4  rounded-full mb-4">
                        <IoIosCloudUpload
                            className="text-[#0071E3] w-10 h-10"
                        />
                    </div>

                    <p className=" mb-2 font-bold">Arrastra y suelta las imágenes del capítulo aquí, o haz clic para seleccionar los archivos.</p>
                    <p className="mb-6 text-gray-600">  soporta JPG,PNG, WEBP. <span className="font-bold" > (5mb max por pagina)  </span></p>

                    <input 
                        type="file" 
                        className="hidden" 
                        id="fileInput" 
                        multiple
                        accept="image/jpeg, image/png, image/webp"
                        {...register("pages", { required: true })}
                        onChange={(e) => handleFileChange(e)} 
                    />

                    <div  className="cursor-pointer  flex justify-center items-center  px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">

                        <IoAdd
                            className="text-white font-bold"
                        />

                        <span className="ml-2">
                            Seleccionar Archivos
                        </span>
                    </div>    

                </label>


                {/* Grilla de imagenes */}
                <div>

                    <div className="flex justify-between items-center">
                        <h3 className="font-bold"> Carga de Imagenes </h3>

                        <button 
                            className=" flex items-center justify-center gap-2 text-gray-600 cursor-pointer"
                        > 
                            <span className=""> 
                                <FaTrashCan/> 
                            </span> Borrar todas 
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">

                        {
                            previewImage.length > 0 && (
                                
                                previewImage.map((image, index) => (

                                    <div className="relative flex items-center justify-center aspect-[3/4] bg-slate-100 rounded-md border-2 border-slate-300 border-dashed overflow-hidden ">

                                        <img    
                                            src={image} 
                                            alt="Vista previa" 
                                            className="w-full h-full object-contain"
                                        /> 

                                        <span className="absolute bottom-0 left-0 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                            {index + 1}
                                        </span>
                                        
                                        <button 
                                            type="button"
                                            className="absolute top-0 right-0 bg-black/70 text-white text-xs px-2 py-1 rounded"
                                        >
                                            X
                                        </button>

                                    </div>
                                ))
                            )
                        }

                    </div>

                </div>


            </div>

            { /* Barra de progreso y acciones */ }

            <div className=" flex items-center justify-between  mx-auto w-full max-w-5xl px-2 py-4 mt-10 mb-20 bg-slate-100 rounded-lg shadow-md overflow-hidden  ">

                <div className="px-2">
                    <p className="block text-gray-400 text-sm">Cargando Imagenes...</p>

                    <div className="flex justify-center items-center gap-2">
                        <div className=" flex-1 h-2 w-32 bg-slate-300 rounded-full overflow-hidden transition-all duration-300">
                            <div className="bg-[#0071E3] h-full" style={{width: `${ uploadProgress }%`}}></div>
                        </div>
                        <div className=" text-black font-bold whitespace-nowrap"> {uploadProgress} %  </div>
                    </div>
                </div>
                
                
                <div className="flex justify-center items-center gap-4  px-4 py-2 ">
                    <button
                        type="button"
                        className="font-medium px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-300 transition-colors cursor-pointer"
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className=" bg-[#0071E3] hover:bg-[#0056B3] font-medium text-white px-6 py-3 rounded-lg  transition-colors cursor-pointer"
                        disabled={isSubmitting}
                    >
                        <LuUpload className="inline-block mr-2" />
                        { isSubmitting ? " Cargando Capitulo..." : "Cargar capitulo" }
                    </button>
                </div>

            </div>
        </form>
    )
}