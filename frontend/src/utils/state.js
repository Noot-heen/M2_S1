import { create } from 'zustand'
import { React} from 'react'

export const useFototenyStore = create((set) => ({
    fototeny: null,
    setFototeny: (fototeny) => set({ fototeny }),
}))

export const useAutocompleteStore = create((set) => ({
    autocomplete: null,
    setAutocomplete: (autocomplete) => set({ autocomplete }),
}))

export const useSuggestionsStore = create((set) => ({
    suggestions: null,
    setSuggestions: (suggestions) => set({ suggestions }),
})) 

