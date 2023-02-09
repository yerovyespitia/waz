import { create } from "zustand"

type InputState = {
  results: string
}

export const useInputStore = create<InputState>((set) => ({
  results: "",
}))
