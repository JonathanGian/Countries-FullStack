import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { testApi } from '../../api/services/test';
import type { TestResponse, TestState } from '../../types/test';
import type { RootState } from '../store';

const initialState: TestState = {
  data: [],
  error: null,
};

export const fetchTestData = createAsyncThunk<
  TestResponse,
  void,
  { rejectValue: string }
>('test/fetchTestData', async (_, { rejectWithValue }) => {
  try {
    const response = await testApi.getTestData();
    return response;
  } catch (err) {
    const error = err as { response?: { data?: { message?: string } } };
    return rejectWithValue(
      error.response?.data?.message || 'Failed to fetch test data'
    );
  }
});

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    clearTestData: (state) => {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.error = null;
      })
      .addCase(fetchTestData.rejected, (state, action) => {
        state.error = action.payload || 'An error occurred';
      });
  },
});

export const selectTestData = (state: RootState) => state.test.data;
export const selectTestError = (state: RootState) => state.test.error;

export const { clearTestData } = testSlice.actions;
export default testSlice.reducer; 