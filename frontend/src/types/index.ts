export type Manga = { 
    id: number;
    title: string;
    author: string;
    genre: Array<string>;
    description: string;    
    coverUrl: string;
    createdAt: string;
    capitulos: Array<{
        id: string;
        title: string; 
        pages: Array<{ 
            id: number;
            paginaUrl: string;
        }>;
        createdAt: string;
        number: number;
    }>; 
}

export type MangaCapitulos = Array<{
    id: string;
    title: string; 
    pages: Array<{ 
        id: number;
        paginaUrl: string;
    }>;
    createdAt: string;
    number: number;
}>