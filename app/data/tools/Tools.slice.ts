import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { API_URL } from '~/data/globals';
import type { Tool } from '~/data/tools/Tool';

interface ToolsState {
  tools: Tool[]
  selectedTool: Tool | null
  loading: boolean
  error: string | null
}

const initialState: ToolsState = {
  tools: [],
  selectedTool: null,
  loading: false,
  error: null,
}

export const fetchTools = createAsyncThunk("tools/fetchTools", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/tools`)
    return await response.json()
  } catch (error) {
    return rejectWithValue("Failed to fetch tools")
  }
})

export const fetchToolById = createAsyncThunk("tools/fetchToolById", async (id: number, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/tools/${id}`)
    return await response.json()
  } catch (error) {
    return rejectWithValue(`Failed to fetch tool with id ${id}`)
  }
})

const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    setSelectedTool: (state, action: PayloadAction<Tool>) => {
      state.selectedTool = action.payload
    },
    clearSelectedTool: (state) => {
      state.selectedTool = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTools.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTools.fulfilled, (state, action) => {
        state.loading = false
        state.tools = action.payload
      })
      .addCase(fetchTools.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchToolById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchToolById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedTool = action.payload
      })
      .addCase(fetchToolById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setSelectedTool, clearSelectedTool } = toolsSlice.actions
export default toolsSlice.reducer
