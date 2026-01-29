import axios from 'axios';
import { MangasSchema , MangaSchema, ChaptersSchema } from '../types';
// ------------------------------------Manga API ------------------------------------

export const createManga = async () => {

    try {

        const url = `${import.meta.env.VITE_API_URL}/api/mangas/create`;

        const response = await axios.post( url );

        const responseValidacion = MangasSchema.safeParse( response.data );   

        if( responseValidacion.success === false ) {
            throw new Error( response.data.message || 'Something went wrong' );
        }
        
        return responseValidacion.data;
        
    } catch (error) {
        
        console.log('Error fetching mangas:', error);
        throw error;

    }

}

export const getAllMangas = async () => {

    try {

        const url = `${import.meta.env.VITE_API_URL}/api/mangas/getAll`;

        const response = await axios.get( url );

        const responseValidacion = MangasSchema.safeParse( response.data );   

        if( responseValidacion.success === false ) {
            throw new Error( response.data.message || 'Something went wrong' );
        }
        
        return responseValidacion.data;
        
    } catch (error) {

        console.log('Error fetching mangas:', error);
        throw error;
    }


}


export const getMangaById = async ( id: string ) => {

    try {

        const url = `${import.meta.env.VITE_API_URL}/api/mangas/getOneManga/${id}`;

        const response = await axios.get( url );


        const responseValidacion = MangaSchema.safeParse( response.data );   

        if( responseValidacion.success === false ) {
            throw new Error( response.data.message || 'Something went wrong' );
        }
        
        return responseValidacion.data;

        
    } catch (error) {
        
        console.log('Error fetching manga by id:', error);
        throw error;

    }
}


export const updateManga = async (  ) => {}


export const deleteManga = async (  ) => {}


// ------------------------------------Chapter API ------------------------------------

export const createChapter = async ( ) => {}

export const getAllChapters = async  ( mangaId : string) => {

    const url = `${import.meta.env.VITE_API_URL}/api/chapters/${mangaId}/getAllChapter`;

    const response = await axios.get( url );

    const responseValidacion = ChaptersSchema.safeParse( response.data );

    if( responseValidacion.success === false ) {
        throw new Error( response.data.message || 'Something went wrong' );
    }

    return responseValidacion.data;
}

export const getChapterById = async ( { mangaId , chapterId  }  : { mangaId : string , chapterId : string}) => {

    const url = `${import.meta.env.VITE_API_URL}/api/chapters/${mangaId}/getOneChapter/${chapterId}`;

    const response = await axios.get( url );

    const responseValidacion = ChaptersSchema.safeParse( response.data );

    if( responseValidacion.success === false ) {
        throw new Error( response.data.message || 'Something went wrong' );
    }

    return responseValidacion.data;

}

export const updateChapter = async (  ) => {}

export const deleteChapter = async (  ) => {}


// ------------------------------------User API ------------------------------------

export const createUser = async (  ) => {}

export const getAllUsers = async () => {}

export const getUserById = async (  ) => {}

export const updateUser = async ( ) => {}

export const deleteUser = async ( ) => {}