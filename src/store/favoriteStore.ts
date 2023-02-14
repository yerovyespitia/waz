import { create } from "zustand"
import { persist } from "zustand/middleware"

interface FavoriteState {
  favorites: string[]
  addFavorite: (id: string) => void
  removeFavorite: (id: string) => void
}

export const useFavoriteStore = create(
  persist<FavoriteState>(
    (set) => ({
      favorites: [],
      addFavorite: (id) =>
        set((state) => ({ favorites: [...state.favorites, id] })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav !== id),
        })),
    }),
    { name: "favorites" }
  )
)
