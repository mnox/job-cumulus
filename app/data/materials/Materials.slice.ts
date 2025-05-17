import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { API_URL } from '~/data/globals';
import type { Material } from '~/data/materials/Material';

interface MaterialsState {
  materials: Material[];
  selectedMaterial: Material | null;
  loading: boolean;
  error: string | null;
}

const initialState: MaterialsState = {
  materials: [],
  selectedMaterial: null,
  loading: false,
  error: null,
}

export const fetchMaterials = createAsyncThunk(`materials/fetchMaterials`, async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/materials`)
    return await response.json()
  } catch (error) {
    return rejectWithValue(`Failed to fetch materials`)
  }
})

export const fetchMaterialById = createAsyncThunk(
  `materials/fetchMaterialById`,
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/materials/${id}`)
      return await response.json()
    } catch (error) {
      return rejectWithValue(`Failed to fetch material with id ${id}`)
    }
  },
)

const materialsSlice = createSlice({
  name: `materials`,
  initialState,
  reducers: {
    setSelectedMaterial: (state, action: PayloadAction<Material>) => {
      state.selectedMaterial = action.payload
    },
    clearSelectedMaterial: (state) => {
      state.selectedMaterial = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.loading = false
        state.materials = action.payload
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchMaterialById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMaterialById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedMaterial = action.payload
      })
      .addCase(fetchMaterialById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setSelectedMaterial, clearSelectedMaterial } = materialsSlice.actions
export default materialsSlice.reducer
