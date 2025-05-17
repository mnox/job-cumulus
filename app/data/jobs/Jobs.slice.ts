import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { API_URL } from '~/data/globals';
import type { Job } from '~/data/jobs/Job';

interface JobsState {
  jobs: Job[]
  selectedJob: Job | null
  loading: boolean
  error: string | null
}

const initialState: JobsState = {
  jobs: [],
  selectedJob: null,
  loading: false,
  error: null,
}

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/jobs`)
    return await response.json()
  } catch (error) {
    return rejectWithValue("Failed to fetch jobs")
  }
})

export const fetchJobById = createAsyncThunk("jobs/fetchJobById", async (id: number, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/jobs/${id}`)
    return await response.json()
  } catch (error) {
    return rejectWithValue(`Failed to fetch job with id ${id}`)
  }
})

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setSelectedJob: (state, action: PayloadAction<Job>) => {
      state.selectedJob = action.payload
    },
    clearSelectedJob: (state) => {
      state.selectedJob = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false
        state.jobs = action.payload
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedJob = action.payload
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
});

export const { setSelectedJob, clearSelectedJob } = jobsSlice.actions;
export default jobsSlice.reducer;