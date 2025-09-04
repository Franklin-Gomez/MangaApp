import { Request, Response } from 'express';
import { getFirestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs , getDoc , Timestamp, query } from "firebase/firestore";
import { db }  from '../db/firebaseConfig';

export class MangaController {

    static async  createManga (req : Request , res : Response) {

        try {

            const mangaRef = await addDoc(collection( db , 'Manga'), {
                title: "Shin Kami",
                author: "Franklin",
                genre: "Fantasía",
                description: "Manga de prueba",
                coverUrl: "https://example.com/cover.jpg",
                createdAt: Timestamp.now()
            });

            console.log("Manga created with ID: ", mangaRef);

        } catch (error) {

            console.error("Error adding document: ", error);  
            return res.status(500).json({ message: 'Error creating manga' });
            
        }

        res.json({ message: 'Manga created' });
    }

    static async getMangaList(req : Request , res : Response) {

        const mangaList : any[] = [];
        const querySnapshot = await getDocs(collection(db, "Manga"));

        querySnapshot.forEach((doc) => {
            mangaList.push({ id: doc.id, ...doc.data() });
        });

        res.json(mangaList);

    }

    static async getMangaById(req : Request , res : Response) {

        const mangaId = req.params.id;  // req.params.id;

        const mangaRef = doc(db, "Manga", mangaId);
        const mangaSnap = await getDoc(mangaRef);
        const chapters : any[] = [];

        if (!mangaSnap.exists()) {
            return res.status(404).json({ message: 'Manga no Encontrado' });
        }

        chapters.push({ id: mangaSnap.id, ...mangaSnap.data() });

        res.json({ mangaId, chapters });

    }

    static async updateManga(req : Request , res : Response) {
        
        const mangaId = req.params.id;  // req.params.id;

        const mangaRef = doc(db, "Manga", mangaId);
        const mangaSnap = await getDoc(mangaRef);

        if (!mangaSnap.exists()) {
            return res.status(404).json({ message: 'Manga no Encontrado' });
        }

        //const mangaData = req.body;    // Datos actualizados del manga desde el cuerpo de la solicitud

        const mangaData =  { // simular datos actualizados del formulario
            "coverUrl": "https://exampleActualizado.com/cover.jpg",
            "description": "Manga de prueba actualizado",
            "title": "Shin Kami Actualizado",
            "genre": "Fantasía Actualizado",
            "author": "Franklin Actualizado",
        }

        const updateMangaa = await updateDoc(mangaRef, mangaData);

        res.json({ message: 'Manga actualizado', mangaId, updateMangaa });
        
    }

    static async deleteManga(req : Request , res : Response) {
        //const mangaId = req.params.id;  // req.params.id;       
        const mangaId = 'Manga';  // req.params.id;

        const mangaRef = doc(db, "Manga", mangaId);
        const mangaSnap = await getDoc(mangaRef);

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