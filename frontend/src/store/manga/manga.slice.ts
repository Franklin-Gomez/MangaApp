import type { StateCreator } from 'zustand'
import type{ MangaType } from '../../types'

export interface MangaSlice {
  mangas: MangaType[] , 
  manga: MangaType | null
  addManga : ( manga : MangaType ) => void
  setManga: ( manga: MangaType | null ) => void
  setMangas: (mangas: MangaType[]) => void
}

export const createMangaSlice : StateCreator<MangaSlice> = ( set ) => ({ 

    mangas: [],

    manga: null,
    

    addManga : ( manga ) => 
        set((state) => ({

        mangas: [...state.mangas, manga],
    })),

    setMangas: ( mangas ) => 
        set({ 
            mangas 
    }),

    setManga  : ( manga ) =>
        set({
            manga
    }),

})