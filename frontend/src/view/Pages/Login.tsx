import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import type { LoginType } from "../../types"
import { useState } from "react";
import { loginUser } from "../../api";
import { toast } from "react-toastify";
import { useAuth } from "../../auth/AuthProvider";

export default function Login () {

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [serverError, setServerError] = useState("")

    
    const { login } = useAuth();
    const navigate = useNavigate();
    const { register , handleSubmit , formState : { errors } , reset } = useForm({
        defaultValues : {
            email: '',
            password: ''
        }
    })

    const handleLogin = async ( data : LoginType) => {

        try {
            const respuesta = await loginUser( data )
            login( { token: respuesta.token  } );
            toast.success(respuesta.message);
            reset();
            navigate('/');
        
        } catch (error) {

            console.log('Error en el login:', error);
            toast.error(error instanceof Error ? error.message : 'Error desconocido');  
        }

    }

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

                        <form 
                            className="px-8 border-b-2 border-tenue"
                            onSubmit={handleSubmit( handleLogin )}    
                        >

                            <div className="flex flex-col mb-4">
                                <label className=" flex text-muy-oscuro font-bold ">Email</label>
                                <input 
                                    type="email" 
                                    placeholder="Ingresa Tu Email"
                                    className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:border-transparent"
                                    {...register("email" , { required: true })} 
                                />

                                { errors.email && 
                                    <span className="text-red-500 text-sm mt-1">El email es requerido</span> 
                                }
                            </div>

                            <div className="flex flex-col mb-6">

                                <label className="flex justify-between font-bold text-muy-oscuro pb-2">Contraseña 
                                    <span className=" hover:underline hover:text-gray-800 cursor-pointer "> Olvidastes tu Contraseña ?  </span>
                                </label>

                                <div className=" flex items-center justify-evenly">
                                    <input 
                                        type={showPassword ? "text" : "password" }
                                        placeholder="Ingresa Tu Contraseña"
                                        className="bg-white border border-gray-300 rounded-md px-4 py-2 w-full"
                                        {...register("password" , { required: true })}
                                    />

                                    <button
                                        type="button"
                                        className="ml-2 text-sm text-blue-500 hover:underline focus:outline-none"
                                        onClick={() => setShowPassword((v) => !v)}
                                    >
                                        {showPassword ? "Ocultar" : "Mostrar"}
                                    </button>

                                </div>

                                { errors.password && 
                                    
                                    <span className=" text-red-500 text-sm mt-1">La contraseña es requerida</span> 
                                    
                                }
                                
                            </div>

                            <button 
                                type="submit"
                                className="w-full py-3 bg-muy-oscuro text-white rounded-md mb-4 hover:bg-gray-800 hover:shadow-lg hover:font-bold transition duration-150 cursor-pointer"
                            >Iniciar Sesion</button>

                        </form>
                        
                    </div>

                    <div 
                        className="mb-8 text-primary"
                    >
                        No tienes una cuenta? <Link to="/register" className="font-mediusm text-blue-500 hover:font-bold  hover:underline">Registrarse</Link>    
                    </div>

                </div>

            </div>
        
        
        </>
    )
}