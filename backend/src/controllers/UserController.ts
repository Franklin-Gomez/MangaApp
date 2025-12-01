import { Request, Response } from 'express';
import { db } from '../db/firebaseConfig';
import { collection, addDoc , getDoc , doc , deleteDoc , updateDoc, where , query, getDocs } from 'firebase/firestore';
//import { ref } from 'firebase/database';

export class UserController {

    static async createUser (req: Request, res: Response) {

        try {

            const { email, password } = req.body;   

            if( !email || !password ) {
                return res.status(400).json({ message: 'Usuario y Contraseña son obligatorio' });
            }

            // Lógica para crear el usuario en la base de datos
            // Simulación de creación de usuario
            const userRef = await addDoc(collection( db , 'Users'),{
                email,
                password
            });

            if(!userRef) {
                return res.status(500).json({ message: 'Error creando el usuario' });
            }

            return res.status(201).json({ message: 'Usuario creado exitosamente', userId: userRef.id });
            
        } catch (error) {

            return res.status(500).json({ message: 'Error creando el usuario' });
            
        }        

    }

    static async loginUser (req: Request, res: Response) {      

        try {

            const { email, password } = req.body;   

            if( !email || !password ) {
                return res.status(400).json({ message: 'Usuario y Contraseña son obligatorio' });
            }

            const  userRef = collection( db, "Users");

            // consulta para buscar el usuario por email
            const q = query(userRef, where ("email" , "==" , email ) );
            const querySnapshot = await getDocs( q );

            if( querySnapshot.empty ) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            if ( !querySnapshot.docs[0].data().email) {
                return res.status(401).json({ message: querySnapshot.docs[0].data() });
            }

            if ( querySnapshot.docs[0].data().password !== password ) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            return res.status(200).json({ message: 'Usuario logueado exitosamente'});

            
        } catch (error) {

            console.log(error);
            return res.status(500).json({ message: 'Error Iniciando sesion' });
            
        }        

    }

    static async logoutUser (req: Request, res: Response) {      
        

    }

    static async getUserProfile (req: Request, res: Response) {   

        try {

            const userId = req.params.id;

            if( !userId ) {
                return res.status(400).json({ message: 'Usuario no existe' });
            }

            // Lógica para obtener el perfil del usuario desde la base de datos
            // Simulación de obtención de perfil de usuario
            
            //reference a la coleccion de usuarios
            const userRef = doc( db, "Users" , userId);

            // sacar el documento
            const userSnap = await getDoc( userRef );

            if( !userSnap.exists() ) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.json({ id: userSnap.id, ...userSnap.data() });
            
        } catch (error) {

            console.log(error);
            return res.status(500).json({ message: 'Error obteniendo el perfil del usuario' });
            
        }

    }

    static async updateUserProfile (req: Request, res: Response) {      
        try {

            const userId = req.params.id;
            const updatedData = req.body;
            if (!userId) {
                return res.status(400).json({ message: 'Usuario no existe' });
            }

            // Lógica para obtener el perfil del usuario desde la base de datos
            // Simulación de obtención de perfil de usuario 
            const userRef = doc(db, "Users", userId);

            // Aquí iría la lógica para actualizar el perfil del usuario con los datos de req.body
            await updateDoc(userRef, updatedData);

            res.json({ message: 'Perfil del usuario actualizado correctamente' });;

        } catch (error) {

            console.log(error);
            return res.status(500).json({ message: 'Error actualizando el perfil del usuario' });

        }
    }

    static async changePassword (req: Request, res: Response) {      

    }

    static async deleteUser (req: Request, res: Response) {     
        
        try {

            const userId = req.params.id;

            if( !userId ) {
                return res.status(400).json({ message: 'Usuario no existe' });
            }

            // Lógica para obtener el perfil del usuario desde la base de datos
            // Simulación de obtención de perfil de usuario
            
            //reference a la coleccion de usuarios
            const userRef = doc( db, "Users" , userId);

            if( !userRef ) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // sacar el documento
            await deleteDoc( userRef );

            res.json({ ok:true , message : "Usuario eliminado Correctamente"});
            
        } catch (error) {

            console.log(error);
            return res.status(500).json({ message: 'Error al Eliminar el usuario' });
            
        }

    }
}

