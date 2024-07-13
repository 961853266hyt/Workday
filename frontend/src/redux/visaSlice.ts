import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../constants';
import { RootState } from './store';

export interface VisaState {
  visaStatus: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: VisaState = {
  visaStatus: [],
  status: 'idle',
  error: null,
};

export const fetchVisaStatus = createAsyncThunk('visa/fetchVisaStatus', async () => {
  const response = await axios.get(`${API_URL}/visa-status`);
  return response.data;
});

export const updateVisaStatus = createAsyncThunk('visa/updateVisaStatus', async (visaStatus: any) => {
  const response = await axios.patch(`${API_URL}/visa-status`, visaStatus);
  return response.data;
});

const visaSlice = createSlice({
  name: 'visa',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisaStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVisaStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.visaStatus = action.payload;
      })
      .addCase(fetchVisaStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updateVisaStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateVisaStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.visaStatus.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.visaStatus[index] = action.payload;
        }
      })
      .addCase(updateVisaStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const selectVisaStatus = (state: RootState) => state.visa.visaStatus;
export const selectVisaStatusState = (state: RootState) => state.visa.status;
export const selectVisaStatusError = (state: RootState) => state.visa.error;

export default visaSlice.reducer;