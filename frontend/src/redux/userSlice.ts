import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios'
import { API_URL } from "../constants";
import { RootState } from "./store";
import { JWT_KEY } from "../constants";
import { signIn, signUp, verifyToken } from "./userThunks";
import { User } from "./types";

// export interface UserState {
//     user: {
//         id: string;
//         name: string;
//         role: 'EMP' | 'HR';
//     } | null;
//     status: 'idle' | 'loading' | 'succeeded' | 'failed';
//     error: string | null;
//     isAuthenticated: boolean;
// }

// const initialState: UserState = {
//     user: null,
//     status: 'idle',
//     error: null,
//     isAuthenticated: false,
// };



// const userSlice = createSlice({
//     name: 'User',
//     initialState,
//     reducers: {
//         logOut: (state) => {
//             state.user = null;
//             state.isAuthenticated = false;
//             state.status = 'idle';
//             localStorage.removeItem(JWT_KEY);
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(signIn.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
//                 state.status = 'succeeded';
//                 state.user = action.payload.user;
//                 state.isAuthenticated = true;
//                 localStorage.setItem(JWT_KEY, action.payload.token);
//             })
//             .addCase(signIn.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message || null;
//             })
//             .addCase(signUp.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(signUp.fulfilled, (state, action: PayloadAction<any>) => {
//                 state.status = 'succeeded';
//                 state.user = action.payload.user;
//                 state.isAuthenticated = true;
//                 localStorage.setItem(JWT_KEY, action.payload.token);
//             })
//             .addCase(signUp.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message || null;
//             })
//             .addCase(verifyToken.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(verifyToken.fulfilled, (state, action: PayloadAction<any>) => {
//                 state.status = 'succeeded';
//                 state.user = action.payload.user;
//                 state.isAuthenticated = true;
//             })
//             .addCase(verifyToken.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message || null;
//                 state.isAuthenticated = false;
//             });
//     }
// });

// export const { logOut } = userSlice.actions;

// export const selectUser = (state: RootState) => state.user.user;
// export const selectUserStatus = (state: RootState) => state.user.status;
// export const selectUserError = (state: RootState) => state.user.error;
// export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;

// export default userSlice.reducer;

export interface UserState {
    user: User | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
};

// const initialState: UserState = {
//     user: { id:'1', username: 'jj', role: 'EMP'},
//     isAuthenticated: true,
// };
const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        logOut: (state: UserState) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem(JWT_KEY);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
                localStorage.setItem(JWT_KEY, action.payload.token);
            })
            .addCase(signUp.fulfilled, (state, action: PayloadAction<any>) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
                localStorage.setItem(JWT_KEY, action.payload.token);
            })
            .addCase(signIn.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(signUp.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(verifyToken.fulfilled, (state, action: PayloadAction<any>) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(verifyToken.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            });
    }
});

export const { logOut } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;

export default userSlice.reducer;