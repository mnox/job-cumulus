import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { CostFormula } from '~/data/costs/CostFormula';
import { API_URL } from '~/data/globals';

interface FormulasState {
  formulas: CostFormula[]
  selectedFormula: CostFormula | null
  loading: boolean
  error: string | null
}

const initialState: FormulasState = {
  formulas: [],
  selectedFormula: null,
  loading: false,
  error: null,
}

export const fetchCostFormulas = createAsyncThunk("formulas/fetchFormulas", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/formulas`)
    return await response.json()
  } catch (error) {
    return rejectWithValue("Failed to fetch formulas")
  }
})

export const fetchCostFormulaById = createAsyncThunk(
  "formulas/fetchFormulaById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/formulas/${id}`)
      return await response.json()
    } catch (error) {
      return rejectWithValue(`Failed to fetch formula with id ${id}`)
    }
  },
)

const costFormulasSlice = createSlice({
  name: "formulas",
  initialState,
  reducers: {
    setSelectedFormula: (state, action: PayloadAction<CostFormula>) => {
      state.selectedFormula = action.payload
    },
    clearSelectedFormula: (state) => {
      state.selectedFormula = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCostFormulas.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCostFormulas.fulfilled, (state, action) => {
        state.loading = false
        state.formulas = action.payload
      })
      .addCase(fetchCostFormulas.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchCostFormulaById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCostFormulaById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedFormula = action.payload
      })
      .addCase(fetchCostFormulaById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setSelectedFormula, clearSelectedFormula } = costFormulasSlice.actions
export default costFormulasSlice.reducer
