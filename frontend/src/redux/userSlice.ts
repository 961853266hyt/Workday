import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios'
import { API_URL } from "../constants";
import { RootState } from "./store";
import { JWT_KEY } from "../constants";
import { signIn, signUp, verifyToken } from "./userThunks";

export interface UserState {
    user: {
        id: string;
        name: string;
        role: 'EMP' | 'HR';
    } | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    user: { id:'1', name: 'jj', role: 'EMP'},
    status: 'succeeded',
    error: null,
    isAuthenticated: true,
};



const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem(JWT_KEY);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.isAuthenticated = true;
                localStorage.setItem(JWT_KEY, action.payload.token);
            })
            .addCase(signIn.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(signUp.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signUp.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.isAuthenticated = true;
                localStorage.setItem(JWT_KEY, action.payload.token);
            })
            .addCase(signUp.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(verifyToken.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(verifyToken.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(verifyToken.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
                state.isAuthenticated = false;
            });
    }
});

export const { logOut } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;