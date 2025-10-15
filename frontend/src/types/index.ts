export type Manga = { 
    id: number;
    title: string;
    author: string;
    genre: Array<string>;
    description: string;    
    coverUrl: string;
    createdAt: string;
    capitulos: Array<{
        id: number;
        title: string; 
        pages: Array<string>;
        createdAt: string;
        number: number;
    }>; 
}