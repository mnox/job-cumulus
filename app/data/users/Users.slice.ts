import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { API_URL } from '~/data/globals';
import type { User } from '~/data/users/User';

interface UserState {
  currentUser: User | null
  users: User[]
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  currentUser: null,
  users: [],
  loading: false,
  error: null,
}

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/users`)
    return await response.json()
  } catch (error) {
    return rejectWithValue("Failed to fetch users")
  }
})

export const fetchCurrentUser = createAsyncThunk("users/fetchCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("${API_URL}/users/me")
    return await response.json()
  } catch (error) {
    return rejectWithValue("Failed to fetch current user")
  }
})

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },
    logout: (state) => {
      state.currentUser = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setCurrentUser, logout } = userSlice.actions
export default userSlice.reducer
