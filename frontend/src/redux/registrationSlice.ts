import { createSlice, createAsyncThunk, AsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../constants';
import { RootState } from './store';

export interface RegistrationToken {
    _id: string;
    email: string;
    name: string;
    token: string;
    expiration: string;
    status: string; 
}

export interface RegistrationState {
    history: RegistrationToken[];
    loading: boolean;
    error: any;
}

const initialState: RegistrationState = {
    history: [],
    loading: false,
    error: null,
};


export const generateTokenAndSendEmail:AsyncThunk<any, { email: string, name: string }, {} > = createAsyncThunk(
    'registration/generateTokenAndSendEmail',
    async ({ email, name }, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/registration/generate-token`, { email, name });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getRegistrationHistory:AsyncThunk<RegistrationToken[], void, {} > = createAsyncThunk(
    'registration/getRegistrationHistory',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/registration`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const registrationSlice = createSlice({
    name: 'registration',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(generateTokenAndSendEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(generateTokenAndSendEmail.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
            })
            .addCase(generateTokenAndSendEmail.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getRegistrationHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRegistrationHistory.fulfilled, (state, action: PayloadAction<RegistrationToken[]>) => {
                state.loading = false;
                state.history = action.payload;
            })
            .addCase(getRegistrationHistory.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const selectRegistrationHistory = (state: RootState) => state.registration.history;
export const selectRegistrationLoading = (state: RootState) => state.registration.loading;
export const selectRegistrationError = (state: RootState) => state.registration.error;

export default registrationSlice.reducer;