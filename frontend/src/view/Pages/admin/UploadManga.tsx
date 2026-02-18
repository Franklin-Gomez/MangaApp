import { IoIosAlert } from "react-icons/io";
import { RiImageAddLine } from "react-icons/ri";
import { useState , useRef , useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useForm , type SubmitHandler } from "react-hook-form";
import type { MangaFormType } from "../../../types";
import { createManga } from "../../../api";



export const UploadManga = () => {

    const [ popOver , setPopOver]  =  useState<boolean>(false)
    const [ generoSeleccionado , setGeneroSeleccionado ] = useState<string[]>([])

    const [ loading , setLoading ] = useState<boolean>( false )
    const [ error , setError ] = useState<string | null>( null )

    const [ previewImage , setPreviewImage ] = useState<string | null>( null )

    const { register , handleSubmit , formState : { errors }} = useForm<MangaFormType >({
        defaultValues : {
            title : "",
            author : "",
            genre : generoSeleccionado,
            description : "",
            coverUrl : ""
        }
    })

    const generos = [ "Action" , "Adventure" , "Comedy" , "Drama" , "Fantasy" , "Horror" , "Mystery" , "Romance" , "Sci-Fi" , "Slice of Life" , "Sports" , "Supernatural" , "Thriller" ]

    const popoverRef = useRef<HTMLDivElement | null>(null);

    const handleGenneroChange = () : void  => {
        setPopOver( !popOver )
    }


    // mi forma para cerrar el popooover
    // if( popOver && document.getElementById("popover-menu") ) {

    //     document.addEventListener("click" , (e  : MouseEvent) => {
    //         const target = e.target as HTMLElement  ;
    //         document.getElementById(" popover-menu")?.contains(target) || setPopOver(false)
    //     })
    // }

    // forma comun de cerrar el popover || ChapGPT
    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setPopOver(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }

    }, [popoverRef]);    

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => { 

        const file = e.target.files?.[0];  

        // si se subio imagen
        // if (file) {
        //     const reader = new FileReader();

        //     console.log( reader )

        //     // reader.onloadend = () => {
        //     //     setPreviewImage( reader.result as string );
        //     // }

        //     // reader.readAsDataURL(file);

        // }

        if( !file ) return;
        const url = URL.createObjectURL( file )

        setPreviewImage( url )
    }


    const onSubmit : SubmitHandler<MangaFormType > = async ( values ) => { 

        if(!previewImage) return

        values.genre = generoSeleccionado
        //values.coverUrl = previewImage || ""
        values.coverUrl = ""

        console.log( values )
        return;
                
        const resultado = await createManga( values )

        console.log( resultado )

        // const formData = new FormData(e.currentTarget)
        // const data = Object.fromEntries(formData.entries());

        // console.log( data )
    }

    return (
        <div className="">  
            
            <div className="space-y-1 mb-6">

                <h1 className=" font-bold text-5xl" > Agregar Nuevo Manga</h1>

                <p className="text-[#5a5a5b]"> Ingresa la informacion del nuevo manga</p>

            </div>


            {/* Contenedor principal del formulario de subida de manga */}
            <div className="bg-white text-[#1d1d1F] max-w-[800px] p-[40px] my-[60px] mx-auto rounded-xl border border-[#D2D2D7] rounded-lgs">


                <form className=""  onSubmit={ handleSubmit( onSubmit )  } >

                    <div className=" grid grid-cols-[1fr_2fr] gap-6 space-y-4 p-4 mb-12 ">

                        {/* Portada */}
                        <div className="">
                            <h2 className=" font-bold text-lg mb-2 "> Portada</h2>

                            <div 
                                className="bg-[#FAFAFA] border-2 border-dashed border-[#D2D2D7] py-[60px] px-[20px] rounded-xl h-80 flex flex-col items-center justify-center relative "
                            >

                                <RiImageAddLine
                                    size={50}
                                    className="text-[#B0B0B5] mx-auto "
                                />

                                { previewImage  &&                                 
                                
                                    <img
                                        src={previewImage}
                                        alt="previewImage"
                                        className="w-full rounded-lg border"
                                    /> 
                                    
                                }   

                                <input
                                    type="file"
                                    accept="image/*"
                                    className=" absolute opacity-0 w-full h-full cursor-pointer"
                                    { ...register("coverUrl" , 
                                        { 
                                            //validate: (files) => files && files.length > 0 || "La portada es requerida" ,
                                            onChange : (e ) => handleImageChange(e)
                                        }
                                    )}

                                    // { ...errors.coverUrl && 
                                    //    ( <p className="text-red-500 text-sm mt-1">{ errors.coverUrl.message }</p> )
                                    // }
                                />

                            </div>                      

                            <p className="text-[#B0B0B5] text-center"> Agregar Portada</p>


                            <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-[#5a5a5b]">

                                <IoIosAlert
                                    size={25}
                                    className="text-[#B0B0B5]"
                                />

                                <p> Gran calidad de la portada reciben 40% mas de clicks</p>

                            </div>
                        </div>


                        {/* Formulario de informacion del manga */}
                        <div className="space-y-6">
                            <div>
                                <label className="block mb-2 font-bold text-lg">Titulo</label>
                                <input 
                                    type="text" 
                                    className="w-full py-3 px-4 border border-[#D2D2D7] placeholder:text-[#B0B0B5]  rounded-lg" 
                                    placeholder="E.g. One Piece"
                                    { ...register("title" , { required : "El titulo es requerido" })}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-bold text-lg">Autor</label>
                                <input 
                                    type="text" 
                                    className="w-full py-3 px-4 border border-[#D2D2D7] placeholder:text-[#B0B0B5]  rounded-lg" 
                                    placeholder="E.g . Eiichiro Oda"
                                    { ...register("author" , { required : "El autor es requerido" })}
                                /> 
                            </div>

                            <div>
                                <label className="block mb-2 font-bold text-lg">Genero</label>
                                {/* <div 
                                     
                                    className="w-full py-3 px-4 border border-[#D2D2D7] placeholder:text-[#B0B0B5]  rounded-lg" 
                                    onClick={ (e) => handleGenneroChange(e) }
                                /> 
                                    E.g . Terror

                                <div/> */}

                                <div className="w-full border border-[#D2D2D7] rounded-lg py-3 px-4 flex flex-wrap items-center gap-2 focus-within:ring-2 focus-within:ring-blue-500">
  
                                    {/* Tags */}

                                    {generoSeleccionado.map( (genero , index) => (

                                        <div 
                                            key={index} 
                                            className=" flex gap-1 bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm ">

                                            <span 
                                                key={index}
                                                className=""
                                            >
                                                {genero}
                                            </span>

                                            <IoCloseCircleOutline 
                                                size={10}
                                                className=" cursor-pointer"
                                                onClick={ () => setGeneroSeleccionado( generoSeleccionado.filter( g => g != genero ))}
                                            />

                                        </div>

                                    ))}


                                    {/* <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm">
                                        Action
                                    </span>

                                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm">
                                        Fantasy
                                    </span> */}
                                    
                                    <div className="relative" ref={popoverRef}>
                                       {/* Botón Add */}
                                        <button
                                            type="button"
                                            className="text-blue-600 text-sm hover:underline"
                                            onClick={ () => handleGenneroChange() }
                                            // id=" popover-menu"
                                        >
                                            + Add genre
                                        </button>

                                        { 
                                            // popOver && (
                                            //     <div className="mt-2 p-4 border border-[#D2D2D7] rounded-lg bg-white shadow-lg absolute w-36 transition-all duration-1000 ease-out ">

                                            //         { generos.map( (genero , index) => (
                                            //             <div 
                                            //                 key={index}
                                            //                 className="text-sm text-[#5a5a5b] hover:bg-gray-100 rounded-md cursor-pointer px-2 py-1"
                                            //             >
                                            //                 {genero}
                                            //             </div>
                                            //         ))}
                                                    
                                                    
                                            //     </div>
                                            // )

                                            <div
                                                className={` absolute mt-2 w-36 p-4 border border-[#D2D2D7] rounded-lg bg-white shadow-lg  transition-all duration-200 ease-out
                                                    ${popOver ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
                                                `}
                                               
                                            >   
                                                

                                                {generos.map((genero, index) => (
                                                    // <div
                                                    //     key={index}
                                                    //     className="text-sm text-[#5a5a5b] hover:bg-gray-100 rounded-md cursor-pointer px-2 py-1"
                                                    // >

                                                    //     {genero}

                                                    // </div>

                                                    <button
                                                        key={index}
                                                        type="button"
                                                        value={genero}
                                                        //className="text-sm text-[#5a5a5b] hover:bg-gray-100 rounded-md cursor-pointer px-2 py-1 block hover:font-bold"
                                                        //onClick={ () => setGeneroSeleccionado( [...generoSeleccionado , genero] ) }
                                                        { 
                                                            ...( generoSeleccionado.includes(genero) ? 
                                                                { className : "text-sm text-[#5a5a5b] hover:bg-gray-100 rounded-md cursor-pointer px-2 py-1 block font-bold" } : 
                                                                { className : "text-sm text-[#5a5a5b] hover:bg-gray-100 rounded-md cursor-pointer px-2 py-1 block" } 
                                                            ) 
                                                        }

                                                        {...register("genre" , { 
                                                            minLength : 1 
                                                        })}
                                                        
                                                        onClick={ () => {
                                                            // Evitar agregar generos duplicados
                                                            if( !generoSeleccionado.includes(genero) ) {
                                                                setGeneroSeleccionado( [...generoSeleccionado , genero] )
                                                            } else { 
                                                                setGeneroSeleccionado( generoSeleccionado.filter( g => g !== genero ) )
                                                            }
                                                        } }
                                                    >

                                                        {genero}       
                                                            
                                                    </button>
                                                ))}

                                            </div>

                                        }

                                    </div>

                                </div>


                            </div>

                            <div>
                                <label className="block mb-2 font-bold text-lg">Descripcion</label>
                                <textarea 
                                    className="w-full py-3 px-4 border border-[#D2D2D7] placeholder:text-[#B0B0B5]  rounded-lg h-24 resize-none" 
                                    placeholder="Escribe una breve descripcion del manga"
                                    
                                    { ...register("description" , 
                                       { required : "La descripcion es requerida" 
                                    })}
                                />
                            </div>

                        </div>


                    </div>


                    <div className=" flex justify-end space-x-4 mt-6 border-t border-[#e9e5e5] pt-12">

                        <button
                            type="button"
                            className="  font-medium py-3 px-6 rounded-lg hover:bg-[#D2D2D7] hover:cursor-pointer transition-colors duration-300 border border-[#D2D2D7]"
                        >
                            Cancelar
                        </button>

                        <button 
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-medium py-3 px-6 rounded-lg hover:bg-accent transition-colors duration-300"
                        >
                            Subir Manga
                        </button>


                    </div>
                    

                </form>

            </div>
            


        </div>
    )
}