import { Request, Response } from 'express';
import { getFirestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs , getDoc , Timestamp, query } from "firebase/firestore";
import { db }  from '../db/firebaseConfig';

export class MangaController {

    static async  createManga (req : Request , res : Response) {

        try {

            const { title, author, genre, description, coverUrl } = req.body;

            const mangaRef = await addDoc(collection( db , 'Manga'),{
                title: title,
                author: author,
                genre: genre,
                description: description,
                coverUrl: coverUrl,
                createdAt: Timestamp.now() 
            });

            if ( !mangaRef.id) {
                return res.status(500).json({ message: 'Error al Crear Manga' });
            }

            return res.status(201).json({ message: 'Manga creado' });

        } catch (error) {

            console.error("Error adding document: ", error);  
            return res.status(500).json({ message: 'Error creating manga' });
            
        }
    }

    static async getAllMangas(req : Request , res : Response) {

        const mangaList : any[] = [];

        try {

            const querySnapshot = await getDocs(collection(db, "Manga"));

            querySnapshot.forEach((doc) => {
                mangaList.push({ id: doc.id, ...doc.data() });
            });

            return res.json(mangaList);

        } catch (error) {

            console.error("Error getting documents: ", error);
            return res.status(500).json({ message: 'Error al Mostrar los Mangas' });
            
        }

    }

    static async getMangaById(req : Request , res : Response) {

        try {

            const mangaId = req.params.id;  // req.params.id;

            const mangaRef = doc(db, "Manga", mangaId); // direccion del documento a donde buscar 
            const mangaSnap = await getDoc(mangaRef); // buscar el documento con la direccion o referencia

            if (!mangaSnap.exists()) { // verificamos si el documento existe
                return res.status(404).json({ message: 'Manga no Encontrado' });
            }

            res.json({ ...mangaSnap.data() });

        } catch (error) {
            
            return res.status(500).json({ message: 'Error al Mostrar el Manga' });
        
        }

    }

    static async updateManga(req : Request , res : Response) {

        try {

            const mangaId = req.params.id;  // req.params.id;

            const mangaRef = doc(db, "Manga", mangaId);
            const mangaSnap = await getDoc(mangaRef);
    
            if (!mangaSnap.exists()) {
                return res.status(404).json({ message: 'Manga no Encontrado' });
            }

            const existingMangaData = mangaSnap.data();

            if( !req.body || Object.keys(req.body).length === 0 ) {
                return res.status(400).json({ message: 'Datos de manga no proporcionados para actualizar' });
            }

            const newMangaData = req.body;    // Datos actualizados del manga desde el cuerpo de la solicitud

            const mangaData =  { // simular datos actualizados del formulario
                coverUrl: newMangaData.coverUrl ?? existingMangaData.coverUrl,
                description: newMangaData.description ?? existingMangaData.description,
                title: newMangaData.title ?? existingMangaData.title,
                genre: newMangaData.genre ?? existingMangaData.genre,
                author: newMangaData.author ?? existingMangaData.author,
            }

            await updateDoc(mangaRef, mangaData);

            res.json({ message: 'Manga actualizado'});
            
        } catch (error) {

            console.error("Error updating document: ", error);
            return res.status(500).json({ message: 'Error al actualizar el Manga' });
            
        }
        
    }

    static async deleteManga(req : Request , res : Response) {
        //const mangaId = req.params.id;  // req.params.id;       
        const mangaId = 'Manga';  // req.params.id;

        const mangaRef = doc(db, "Manga", mangaId); // referencia al documento del manga
        const mangaSnap = await getDoc(mangaRef); // obtener el documento del manga

        // verificar si el manga existe
        if (!mangaSnap.exists()) {
            return res.status(404).json({ message: 'Manga no Encontrado' });
        }

        // eliminar el manga
        await deleteDoc(mangaRef);

        // verificar si el manga fue eliminado
        if(!mangaSnap.exists()){
            return res.status(200).json({ message: 'Manga Eliminado Correctamente' });
        } else { 
            return res.status(500).json({ message: 'Error al eliminar el Manga' });
        }
    
    }

}