import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import goalsService from '../goals/goalsService';

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getGoals = createAsyncThunk('goals/getGoals', async (thunkAPI) => {
  try {
    return await goalsService.getGoals();
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const createGoal = createAsyncThunk(
  'goals/createGoal',
  async (thunkAPI) => {
    try {
      return await goalsService.createGoal();
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateGoal = createAsyncThunk(
  'goals/updateGoal',
  async (thunkAPI) => {
    try {
      return await goalsService.updateGoal();
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteGoal = createAsyncThunk(
  'goals/deleteGoal',
  async (thunkAPI) => {
    try {
      return await goalsService.deleteGoal();
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {},
});

export const { reset } = goalsSlice.actions;
export default goalsSlice.reducer;
