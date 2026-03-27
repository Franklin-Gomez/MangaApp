import { Request , Response } from 'express';
import { addDoc, collection, query, where , getDocs , documentId, doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';
//import { db }  from '../db/firebaseConfig';
import { uploadImageToCloudinary } from '../services/cloudinaryService';
import { db } from '../db/firebase';

export class ChapterController {

    static async createChapter (req : Request , res : Response) { 

        const urls : { id: number; url: string }[] = [];
        
        try {

            const { mangaId, title, chapterNumber } = req.body;

            // for each no soporta los await dentro de su callback

            // req.files.forEach( async ( file : any , index : number ) => {
            //     const urlsPath = file.path;
            //     const pagesUrl = await uploadImageToCloudinary(urlsPath);

            //     const url : { id: number; url: string } = { id : index + 1, url: pagesUrl };
            //     urls.push( url );
                
            // });

            const results = await Promise.all( ( req.files  )
                
                .map( async ( file : any , index : number ) => {
                    const urlsPath = file.path;
                    const pagesUrl = await uploadImageToCloudinary(urlsPath);   

                return { id : index + 1, url: pagesUrl };

            }));

            urls.push( ...results );


            // Here you would typically add code to save the chapter to your database
            // const newChapter = await addDoc( collection( db ,  "chapters" ) , { 
            //     mangaId, 
            //     title, 
            //     chapterNumber : Number(chapterNumber) , 
            //     pages : urls
            // });



            // if( !newChapter.id ) {
            //     return res.status(500).json({ message: 'Error al Crear Capitulo' });
            // }

            return res.status(201).json({ message: 'Capitulo creado' });

        } catch (error) {

            console.error("Error adding document: ", error);  
            return res.status(500).json({ message: 'Error creating chapter' });

        }

    }   

    static async getAllChapters (req : Request , res : Response) {
        
        try { 

            const chapters = []; // Lógica para obtener los capítulos desde la base de datos
            const { mangaId } = req.params;

            // const chaptersQuery = query( 
            //     collection( db , "chapters" ) , 
            //     where( "mangaId" , "==" , mangaId ) 
            // );

            // const chaptersSnap = await getDocs(chaptersQuery);

            // chaptersSnap.forEach( ( doc ) => { 
            //     chapters.push( { id: doc.id , ...doc.data() } ); 
            // });
            
            return res.status(200).json(chapters);

        } catch (error) {            

            console.error("Error obteniendo los capitulos : ", error);  
            return res.status(500).json({ message: 'Error consiguiendo los capitulos' }); 
        
        }

    }


    static async getChapterById (req : Request , res : Response) {

        try {

            const { mangaId , chapterId } = req.params;
            let chapters = []; 

            // const chapterQuery = query( 
            //     collection( db , "chapters" ),
            //     where( "mangaId" , "==" , mangaId ),
            //     where( documentId() , "==" , chapterId)
            // );  

            // const chapterSnap = await getDocs( chapterQuery );

            // if( chapterSnap.empty ) {
            //     return res.status(404).json({ message: 'Capitulo no encontrado' }); 
            // }

            // chapterSnap.forEach( ( doc ) => { 
            //     chapters.push({ id: doc.id , ...doc.data() } );
            // });

            return res.status(200).json( chapters );
            
        } catch (error) {
            
            console.log( "error al obtener el capitulo : " , error );
            return res.status(500).json({ message: 'Error consiguiendo el capitulo' }); 
        
        }

    }

    static async updateChapter (req : Request , res : Response) {
         
        try {

            const { mangaId , chapterId } = req.params;
            const data  = req.body;

            // const ref = doc(db, "chapters", chapterId);
            // const chapterSnap = await getDoc(ref);

            // if( !chapterSnap.exists() ) {
            //     return res.status(404).json({ message: 'Capitulo no encontrado' }); 
            // }

            // const chapterData = chapterSnap.data();

            // if( chapterData.mangaId !== mangaId ) {
            //     return res.status(404).json({ message: 'Capitulo no pertenece a este manga' }); 
            // }

            // await updateDoc( ref , data );

            return  res.status(200).json({ message: 'Capitulo actualizado' });
            
        } catch (error) {

            console.log( "error al actualizar el capitulo : " , error );
            return res.status(500).json({ message: 'Error actualizando el capitulo' });
            
        }

    }

    static async deleteChapter (req : Request , res : Response) {

        try {

            const { mangaId , chapterId } = req.params;
            // const ref = doc(db, "chapters", chapterId); 
            
            // const chapterSnap = await getDoc(ref);

            // if( !chapterSnap.exists() ) {
            //     return res.status(404).json({ message: 'Capitulo no encontrado' }); 
            // }

            // const chapterData = chapterSnap.data();

            // if( chapterData.mangaId !== mangaId ) {
            //     return res.status(404).json({ message: 'Capitulo no pertenece a este manga' }); 
            // }

            // await deleteDoc( ref );

            return res.status(200).json({ message: 'Capitulo eliminado' });

        } catch (error) {

            console.log( "error al eliminar el capitulo : " , error );
            return res.status(500).json({ message: 'Error eliminando el capitulo' });

        }
    

    }

}