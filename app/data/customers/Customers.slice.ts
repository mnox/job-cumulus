import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Customer } from '~/data/customers/Customer';
import { API_URL } from '~/data/globals';

interface CustomersState {
  customers: Customer[]
  selectedCustomer: Customer | null
  loading: boolean
  error: string | null
}

const initialState: CustomersState = {
  customers: [],
  selectedCustomer: null,
  loading: false,
  error: null,
}

export const fetchCustomers = createAsyncThunk("customers/fetchCustomers", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/customers`)
    return await response.json()
  } catch (error) {
    return rejectWithValue("Failed to fetch customers")
  }
})

export const fetchCustomerById = createAsyncThunk(
  "customers/fetchCustomerById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/customers/${id}`)
      return await response.json()
    } catch (error) {
      return rejectWithValue(`Failed to fetch customer with id ${id}`)
    }
  },
)

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<Customer>) => {
      state.selectedCustomer = action.payload
    },
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false
        state.customers = action.payload
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchCustomerById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedCustomer = action.payload
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})
export const { setSelectedCustomer, clearSelectedCustomer } = customersSlice.actions
export default customersSlice.reducer;
