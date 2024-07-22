import { createSlice, createAsyncThunk, PayloadAction, AsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { API_URL } from "../constants";
import { RootState } from "./store";
import { JWT_KEY } from "../constants";



export interface OnboardingState {
  data: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OnboardingState = {
  data: null,
  status: 'idle',
  error: null,
};

export const submitOnboardingApplication:AsyncThunk< any, FormData, {} > = createAsyncThunk(
  'onboarding/submit',
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/onboarding`, formData);
      //console.log('xxxxx:'+ response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchOnboardingStatus:AsyncThunk<any, string, {}> = createAsyncThunk('onboarding/fetchStatus', async (userId: string, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/onboarding/user/${userId}`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
}
);

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    resetOnboarding: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOnboardingApplication.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitOnboardingApplication.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(submitOnboardingApplication.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectOnboardingData = (state: RootState) => state.onboarding.data;
export const selectOnboardingStatus = (state: RootState) => state.onboarding.status;
export const selectOnboardingError = (state: RootState) => state.onboarding.error;

export default onboardingSlice.reducer;