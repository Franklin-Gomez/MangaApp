import { create } from 'zustand'
import { createMangaSlice, type MangaSlice } from './manga/manga.slice';

type StoreState = MangaSlice;

export const useStore = create<StoreState>()( ( ...a ) => ({
    ...createMangaSlice( ...a ),
}) )