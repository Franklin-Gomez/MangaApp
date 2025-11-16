import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

export default function Login () {

    const { register, handleSubmit } = useForm()

    return (
        <>

            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-205px)]">
                <div className="text-center space-y-6 bg-gray-50  rounded-lg shadow-2xl w-md">

                    <div className=" border-b-2 border-tenue px-4 pt-4">

                        <h2 className="text-xl font-bold text-muy-oscuro">MangaApp</h2>

                        <h1 className=" text-4xl font-bold text-muy-oscuro py-2">Bienvenido!</h1>

                        <p className="text-sm text-secondary mb-8" > Inicia sesion para continuar con la Aventura </p>

                    </div>               
                    
                    <div>

                        <form className="px-8 border-b-2 border-tenue">

                            <div className="flex flex-col mb-4">
                                <label className=" flex text-muy-oscuro font-bold ">Email</label>
                                <input 
                                    type="email" {...register("email")} 
                                    placeholder="Ingresa Tu Email"
                                    className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:border-transparent"
                                />
                            </div>

                            <div className="flex flex-col mb-6">

                                <label className="flex justify-between font-bold text-muy-oscuro pb-2">Contraseña 
                                    <span className=" hover:underline hover:text-gray-800 cursor-pointer "> Olvidastes tu Contraseña ?  </span>
                                </label>

                                <input 
                                    type="password" {...register("password")} 
                                    placeholder="Ingresa Tu Contraseña"
                                    className="bg-white border border-gray-300 rounded-md px-4 py-2 "
                                />
                                
                            </div>

                            <button 
                                type="submit"
                                className="w-full py-3 bg-muy-oscuro text-white rounded-md mb-8 hover:bg-gray-800 hover:shadow-lg hover:font-bold transition cursor-pointer"
                            >Iniciar Sesion</button>

                        </form>
                        
                    </div>

                    <div 
                        className="mb-8 text-primary"
                    >
                        No tienes una cuenta? <Link to="/registrarse" className="font-mediusm text-secondary hover:font-black hover:underline">Registrarse</Link>    
                    </div>

                </div>

            </div>
        
        
        </>
    )
}