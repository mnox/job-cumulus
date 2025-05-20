import { createSlice } from "@reduxjs/toolkit"

interface UiState {
  darkMode: boolean;
}

const initialState: UiState = {
  darkMode: true,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
  },
})

export const { toggleDarkMode } = uiSlice.actions
export default uiSlice.reducer
