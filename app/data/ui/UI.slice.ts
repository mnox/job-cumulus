import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UiState {
  sidebarExpanded: boolean
  searchQuery: string
  darkMode: boolean
  settings: {
    enableAiSearch: boolean
    enableMaterialSuggestions: boolean
    enableNotifications: boolean
    enableDarkMode: boolean
  }
}

const initialState: UiState = {
  sidebarExpanded: true,
  searchQuery: "",
  darkMode: true,
  settings: {
    enableAiSearch: true,
    enableMaterialSuggestions: true,
    enableNotifications: true,
    enableDarkMode: false,
  },
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarExpanded = !state.sidebarExpanded
    },
    setSidebarExpanded: (state, action: PayloadAction<boolean>) => {
      state.sidebarExpanded = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
      state.settings.enableDarkMode = state.darkMode
    },
    updateSettings: (state, action: PayloadAction<Partial<UiState["settings"]>>) => {
      state.settings = { ...state.settings, ...action.payload }
      if ("enableDarkMode" in action.payload) {
        state.darkMode = action.payload.enableDarkMode || false
      }
    },
  },
})

export const { toggleSidebar, setSidebarExpanded, setSearchQuery, toggleDarkMode, updateSettings } = uiSlice.actions
export default uiSlice.reducer
