import axios, { AxiosError } from 'axios';
import { MangasSchema , MangaSchema, ChaptersSchema, ChapterSchema, type LoginType, type RegisterType } from '../types';
// ------------------------------------Manga API ------------------------------------


export const createManga = async ( data : FormData  ) => {

    try {

        const url = `${import.meta.env.VITE_API_URL}/api/mangas/create`;

        
        const response = await axios.post( url , data  );
        if( response.status === 500 ) {
            throw new Error( response.data.message || 'Error respuesta de la API' );
        }
        
        return response.data;
        
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


export const deleteManga = async ( mangaId : string  ) => {

    try{
        const url = `${import.meta.env.VITE_API_URL}/api/mangas/deleteManga/${mangaId}`;

        const response = await axios.delete( url  )

        if ( response.status == 404 ) { 
            throw new Error( response.data.message || "Error al eliminar el Manga" )
        }

        return response.data

    } catch (error) {
        console.log('Error deleting Manga:', error);
        throw error;
    }
}


// ------------------------------------Chapter API ------------------------------------

export const createChapter = async ( formData : FormData ) => {

    let progreso = 0;

    try {

        const url = `${import.meta.env.VITE_API_URL}/api/chapters/create`;

        const response = await axios.post( url , formData  , {

            onUploadProgress: (progressEvent) => {

                const percent = (progressEvent.loaded * 100) / progressEvent.total!

                progreso = (Math.round(percent))

            }

        });

        if( response.status === 500 ) {
            throw new Error( response.data.message || 'Error respuesta de la API' );
        }

        response.data.progreso = progreso;
        
        return response.data;
        
    } catch (error) {
        
        console.log('Error fetching mangas:', error);
        throw error;

    }
    
    // await axios.post(url, formData, {

    //         headers: {
    //         "Content-Type": "multipart/form-data"
    //         },

    //         onUploadProgress: (progressEvent) => {

    //             const percent = (progressEvent.loaded * 100) / progressEvent.total! 

    //             setUploadProgress(Math.round(percent))

    //         },

    //         maxRedirects: 0

    //     })

}

export const getAllChapters = async  ( mangaId : string) => {

    const url = `${import.meta.env.VITE_API_URL}/api/chapters/${mangaId}/getAllChapter`;

    const response = await axios.get( url );

    console.log( response.data )

    const responseValidacion = ChaptersSchema.safeParse( response.data );

    if( responseValidacion.success === false ) {
        throw new Error( "Error en la forma del capitulo" );
    }

    return responseValidacion.data;
}

export const getChapterById = async ( { mangaId , capId  }  : { mangaId : string , capId : string}) => {

    const url = `${import.meta.env.VITE_API_URL}/api/chapters/${mangaId}/getOneChapter/${capId}`;

    const response = await axios.get( url );

    const responseValidacion = ChapterSchema.safeParse( response.data );

    console.log( responseValidacion)

    if( responseValidacion.success === false ) {
        throw new Error( response.data.message || 'Something went wrong' );
    }

    return responseValidacion.data;

}

export const updateChapter = async (  ) => {}

export const deleteChapter = async ( chapterId : string , mangaId : string ) => {

    try {

        const url = `${import.meta.env.VITE_API_URL}/api/chapters/${mangaId}/deleteChapter/${chapterId}`;

        const response = await axios.delete( url );

        if( response.status === 404 ) {
            throw new Error( response.data.message || 'Error Al eliminar el capitulo' );
        }

        return response.data;

    } catch (error) {

        console.log('Error deleting chapter:', error);
        throw error;

    }


}


// ------------------------------------User API ------------------------------------

export const createUser = async ( userData : RegisterType ) => {

    try {

        const url = `${import.meta.env.VITE_API_URL}/api/users/create`;

        const response = await axios.post( url , userData );

        console.log( response )

        return response.data;
        
    } catch (error) {

        if( axios.isAxiosError(error) && error.response ) {
           throw new Error( error.response.data.message || 'Error al crear el usuario' );
        }
 
    }

}

export const loginUser = async ( user : LoginType  ) => {

    try {

        const url = `${import.meta.env.VITE_API_URL}/api/users/login`;

        const response = await axios.post( url , user );

        // localStorage.setItem('AUTH_TOKEN', response.data.token)

        return response.data;

    } catch (error ) {

        if( axios.isAxiosError(error) && error.response ) {
            throw new Error( error.response.data.message)
        }

    }
}

export const getUserById = async (  ) => {}

export const updateUser = async ( ) => {}

export const deleteUser = async ( ) => {}