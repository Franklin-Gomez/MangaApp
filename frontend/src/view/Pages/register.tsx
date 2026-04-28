import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import type { RegisterType } from "../../types"
import { useState } from "react";
import { createUser } from "../../api";
import { toast } from "react-toastify";

export const Register = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    
    const { register, handleSubmit , formState : { errors } , reset ,  watch } = useForm<RegisterType>()

    const password = watch('password');
    const navigate = useNavigate();

    const handleRegister = async ( data : RegisterType ) => {

        try {
            
            const result = await createUser( data );
    
            toast.success(result.message);
            reset();
            navigate('/login');

        } catch (error) {

            toast.error(error instanceof Error ? error.message : 'Error desconocido');

        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-205px)]">
            <div className="text-center space-y-6 bg-gray-50  rounded-lg shadow-2xl w-md">

                <div className=" border-b-2 border-tenue px-4 pt-4">

                    <h2 className="text-xl font-bold text-muy-oscuro">MangaApp</h2>

                    <h1 className=" text-4xl font-bold text-muy-oscuro py-2">¡Únete a la Aventura!</h1>

                    <p className="text-sm text-secondary mb-8" > Crea tu cuenta para comenzar a explorar el mundo del manga </p>

                </div>

                <div>   

                    <form
                        className="px-8 border-b-2 border-tenue"
                        onSubmit={handleSubmit(handleRegister)}
                    >


                        <div className="flex flex-col mb-4">

                            <label className=" flex text-muy-oscuro font-bold ">Email</label>
                            <input 
                                type="email"
                                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Ingresa tu email"
                                {...register("email", { required: "El email es requerido" })}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col mb-4">

                            <label className=" flex text-muy-oscuro font-bold ">Contraseña</label>

                            <div className="flex">
                                
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Crea una contraseña segura"
                                    {...register("password", { 
                                        required: "La contraseña es requerida",
                                        minLength: {    
                                            value: 6,
                                            message: "La contraseña debe tener al menos 6 caracteres"
                                        }
                                    })}
                                />

                                <button
                                    type="button"
                                    className="ml-2 text-sm text-blue-500 hover:underline focus:outline-none"
                                    onClick={() => setShowPassword((v) => !v)}
                                >
                                    {showPassword ? "Ocultar" : "Mostrar"}
                                </button>

                            </div>


                            {errors.password && (
                                <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
                            )}  
                            
                        </div>

                        <div className="flex flex-col mb-6">


                            <label className=" flex text-muy-oscuro font-bold ">Confirmar Contraseña</label>
                            
                            <div className="flex">

                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Confirma tu contraseña"

                                    // validar que confirmPassword sea igual a password
                                    {...register("confirmPassword", {
                                        required: "La confirmación de contraseña es requerida",
                                        validate: value => value === password || "Las contraseñas no coinciden"
                                    })}
                                />

                                <button
                                    type="button"
                                    className="ml-2 text-sm text-blue-500 hover:underline focus:outline-none"
                                    onClick={() => setShowConfirmPassword((v) => !v)}
                                >
                                    {showConfirmPassword ? "Ocultar" : "Mostrar"}
                                </button>

                            </div>

                            {errors.confirmPassword && (
                                <span className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</span>
                            )}

                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 mb-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 cursor-pointer"
                        >
                            Registrarse
                        </button>

                    </form>

                    <p className="text-sm text-secondary mt-6 mb-6">
                        ¿Ya tienes una cuenta? <Link to="/login" className="text-blue-500 hover:underline cursor-pointer">Inicia sesión</Link>
                    </p>


                </div>

            </div>
        </div>
    )
}