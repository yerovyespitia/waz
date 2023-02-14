import { ChangeEvent } from "react"
import { create } from "zustand"

type InputState = {
  search: string
  searching: (e: ChangeEvent<HTMLInputElement>) => void
}

export const useInputStore = create<InputState>((set) => ({
  search: "",
  searching: (e) => set(() => ({ search: e.target.value })),
}))
