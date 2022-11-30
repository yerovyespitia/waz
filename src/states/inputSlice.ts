import { createSlice } from "@reduxjs/toolkit"

export const inputSlice = createSlice({
  name: "input",
  initialState: {
    value: { results: "" },
  },
  reducers: {
    search: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { search } = inputSlice.actions
export default inputSlice.reducer
