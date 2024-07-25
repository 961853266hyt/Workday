import { createSlice, createAsyncThunk, PayloadAction, AsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { API_URL } from "../constants";
import { RootState } from "./store";
import { JWT_KEY } from "../constants";
import { signIn, signUp, verifyToken } from "./userThunks";
import { User } from "./types";
import { Employee } from "./types";


export interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    employees?:Employee[] | null;
}

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
    employees: [],
};

export const fetchAllEmployees: AsyncThunk<any, {}, {}> = createAsyncThunk('user/fetchAllEmployees', async () => {
    const res = await axios.get(`${API_URL}/users/HR/employees`);
    console.log(res.data);
    return res.data;
}
);

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
            })
            .addCase(fetchAllEmployees.fulfilled, (state, action: PayloadAction<any>) => {
                state.employees = action.payload;
            })
            .addCase(fetchAllEmployees.rejected, (state) => {
                state.employees = null;
            })
            .addCase(fetchAllEmployees.pending, (state) => {
                state.employees = null;
            });

    }
});

export const { logOut } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectAllEmployees = (state: RootState) => state.user.employees;

export default userSlice.reducer;