import { z } from "zod";

export const MangaSchema = z.object({ 
    id: z.string(),
    title: z.string(),
    author: z.string(),
    genre: z.array(z.string()),
    description: z.string(),    
    coverUrl: z.string(),
    createdAt: z.object({
        seconds: z.number(),
        nanoseconds: z.number()
    })
})

export const MangasSchema = z.array(MangaSchema);

export const MangaFormSchema = MangaSchema
    .omit({ 
        id: true, 
        createdAt: true 
    })
;

export type MangaFormType = z.infer<typeof MangaFormSchema>;
    

// export type MangaCapitulos = Array<{
//     id: string;
//     title: string; 
//     pages: Array<{ 
//         id: number;
//         paginaUrl: string;
//     }>;
//     createdAt: string;
//     number: number;
// }>

export type MangaType = z.infer<typeof MangaSchema>;
export type MangasType = z.infer<typeof MangasSchema>;

// export const MangaWithChapters = Manga.extend({
//     chapters: z.array(MangaCapitulos)
// })


// -----------------------------------Chapter Schema ------------------------------------

export const ChapterSchema = z.object({
    id: z.string(), 
    mangaId: z.string(),
    title: z.string(),
    number: z.number(),
    pages: z.array(z.object({
        id: z.number(),
        paginaUrl: z.string()
    }))
});

export const ChaptersSchema = z.array(ChapterSchema);

export type ChapterType = z.infer<typeof ChapterSchema>;
export type ChaptersType = z.infer<typeof ChaptersSchema>;