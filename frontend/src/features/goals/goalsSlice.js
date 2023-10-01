import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default goalsSlice.reducer;
