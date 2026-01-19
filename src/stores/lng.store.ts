import type { LngType } from '@/types/lng.type'
import { create } from 'zustand'


interface LngStore {
    lng: LngType,
    handleLng: (lng: LngType) => void
}

export const useLngStore = create<LngStore>((set) => ({
    lng: 'uz',
    handleLng: (lng) => set({ lng })
}))