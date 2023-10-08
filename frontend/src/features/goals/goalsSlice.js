import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import goalsService from '../goals/goalsService';

const initialState = {
  goals: [],
  goal: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getGoals = createAsyncThunk('goals/getGoals', async (thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalsService.getGoals(token);
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
  async (text, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalsService.createGoal(text, token);
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
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goal = action.payload;
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.goal = null;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalsSlice.actions;
export default goalsSlice.reducer;
