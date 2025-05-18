import { createAsyncThunk, createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { API_URL } from '~/data/globals';
import type { Material } from '~/data/materials/Material';
import { type CacheProtectedState, cacheValid, withCacheDefaults } from '~/data/store/CacheProtectedState';
import { type AppRootState } from '~/data/store/root-store.config';

interface MaterialsState extends CacheProtectedState {
  materials: Material[];
  selectedMaterial: Material | null;
  loading: boolean;
  error: string | null;
}

export const fetchMaterials = createAsyncThunk(
  'materials/fetchMaterials',
  async (forceRefresh: boolean = false, { getState, rejectWithValue }) => {
    const state = getState() as AppRootState;
    const { lastFetched, cacheMinutes } = state.materials;
    
    // Skip fetch if within window and not forced
    if (!forceRefresh && cacheValid(lastFetched.collection, cacheMinutes.collection)) {
      return rejectWithValue('CACHE_VALID');
    }
    
    try {
      return (await fetch(`${API_URL}/materials`)).json();
    } catch (error) {
      return rejectWithValue('Failed to fetch materials');
    }
  }
);

export const fetchMaterialById = createAsyncThunk(
  'materials/fetchMaterialById',
  async ({ id, forceRefresh = false }: {id: number, forceRefresh: boolean}, { getState, rejectWithValue }) => {
    const state = getState() as AppRootState;
    const { lastFetched, cacheMinutes } = state.materials;
    
    // Skip individual fetch if within window
    if (!forceRefresh && cacheValid(lastFetched.individual[id], cacheMinutes.individual)) {
      return rejectWithValue('CACHE_VALID');
    }
    
    try {
      const response = await fetch(`${API_URL}/materials/${id}`);
      return await response.json();
    } catch (error) {
      return rejectWithValue(`Failed to fetch material ${id}`);
    }
  }
);

// omg where has this BEEN ALL MY LIFE. NGXS is officially dead to me.
export const materialsAdapter = createEntityAdapter({
  selectId: (material: Material) => material.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = materialsAdapter.getInitialState<MaterialsState>(
  withCacheDefaults({
    loading: false,
    error: null,
    selectedMaterial: null,
    materials: [],
  })
);

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
    invalidateCollectionCache(state) {
      state.lastFetched.collection = null;
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
        state.materials = action.payload;
        state.lastFetched.collection = Date.now();
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
});

export const { setSelectedMaterial, clearSelectedMaterial } = materialsSlice.actions
export default materialsSlice.reducer
