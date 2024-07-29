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
    //
    pendingApplications: any;
    rejectedApplications: any;
    approvedApplications: any;
    applicationDetail: any;
}

const initialState: RegistrationState = {
    history: [],
    loading: false,
    error: null,
    //
    pendingApplications: [],
    rejectedApplications: [],
    approvedApplications: [],
    applicationDetail: null,
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

// thunk for onboarding application
export const  fetchApplicationsByStatus:AsyncThunk<any, {status: string}, {}> = createAsyncThunk(
    'registration/fetchApplicationsByStatus',
    async ({ status }, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/onboarding/status/${status}`);
            //console.log(`${API_URL}/onboarding/status/${status}`);
            //console.log(response.data);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateApplicationStatus:AsyncThunk<any, {id: string, status: string, feedback?: string}, {}> = createAsyncThunk(
    'registration/updateApplicationStatus',
    async ({ id, status, feedback }, thunkAPI) => {
        try {
            const response = await axios.put(`${API_URL}/onboarding/${id}`, { status, feedback }); 
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchApplicationDetails:AsyncThunk<any, string, {}> = createAsyncThunk(
    'registration/fetchApplicationDetails',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/onboarding/detail/${id}`);
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateApplicationStatusDetails:AsyncThunk<any, {id: string, status: string, feedback?: string}, {}> = createAsyncThunk(
    'registration/updateApplicationStatusDetails',
    async ({ id, status, feedback }, thunkAPI) => {
        try {
            const response = await axios.put(`${API_URL}/onboarding/${id}`, { status, feedback });
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
            })
            // extra reducers for onboarding application
            .addCase(fetchApplicationsByStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchApplicationsByStatus.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                const status = action.meta.arg.status;
                if (status === 'Pending') {
                    state.pendingApplications = action.payload;
                } else if (status === 'Rejected') {
                    state.rejectedApplications = action.payload;
                } else if (status === 'Approved') {
                    state.approvedApplications = action.payload;
                }
            })
            .addCase(fetchApplicationsByStatus.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateApplicationStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateApplicationStatus.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                const updatedApplication = action.payload;
                const status = updatedApplication.status;
                if (status === 'Pending') {
                    state.pendingApplications = state.pendingApplications.map(app => app._id === updatedApplication._id ? updatedApplication : app);
                } else if (status === 'Rejected') {
                    state.pendingApplications = state.pendingApplications.filter(app => app._id !== updatedApplication._id);
                    state.rejectedApplications.push(updatedApplication);
                } else if (status === 'Approved') {
                    state.pendingApplications = state.pendingApplications.filter(app => app._id !== updatedApplication._id);
                    state.approvedApplications.push(updatedApplication);
                }
            })
            .addCase(updateApplicationStatus.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchApplicationDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchApplicationDetails.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.applicationDetail = action.payload;
            })
            .addCase(fetchApplicationDetails.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateApplicationStatusDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateApplicationStatusDetails.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.applicationDetail = action.payload;
            })
            .addCase(updateApplicationStatusDetails.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export const selectRegistrationHistory = (state: RootState) => state.registration.history;
export const selectRegistrationLoading = (state: RootState) => state.registration.loading;
export const selectRegistrationError = (state: RootState) => state.registration.error;

export const selectPendingApplications = (state: RootState) => state.registration.pendingApplications;
export const selectRejectedApplications = (state: RootState) => state.registration.rejectedApplications;
export const selectApprovedApplications = (state: RootState) => state.registration.approvedApplications;

export const selectApplicationDetail = (state: RootState) => state.registration.applicationDetail;
export const selectApplicationDetailLoading = (state: RootState) => state.registration.loading;
export const selectApplicationDetailError = (state: RootState) => state.registration.error;

export default registrationSlice.reducer;