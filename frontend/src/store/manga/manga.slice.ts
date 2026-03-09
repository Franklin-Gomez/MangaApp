import type { StateCreator } from 'zustand'
import type{ ChaptersType, MangasType, MangaType } from '../../types'

export interface MangaSlice {
  mangas: MangasType, 
  manga: MangaType | null

  chapters: ChaptersType ,
  
  addManga : ( manga : MangaType ) => void
  setManga: ( manga: MangaType | null ) => void
  setMangas: (mangas: MangaType[]) => void

  addChapter : ( chapter : any ) => void
  setChapters: ( chapters: ChaptersType ) => void
}

export const createMangaSlice : StateCreator<MangaSlice> = ( set ) => ({ 

    mangas: [],

    manga: null,

    chapters: [],

    addManga : ( manga ) => 
        set((state) => ({

        mangas: [...state.mangas, manga],
    })),

    addChapter : ( chapter ) =>
        set((state) => ({
            chapters: [...state.chapters, chapter]
    })),

    setMangas: ( mangas ) => 
        set({ 
            mangas 
    }),

    setManga  : ( manga ) =>
        set({
            manga
    }),

    setChapters: ( chapters ) =>
        set({
            chapters
    })

})