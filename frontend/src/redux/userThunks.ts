import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL, JWT_KEY } from "../constants";

export const signIn = createAsyncThunk('user/signIn', async(credentials: {email: string; password: string}) => {
    const res = await axios.post(`${API_URL}/auth/signin`, credentials);
    return res.data;
});

export const signUp = createAsyncThunk('user/signUp', async(credentials: {email: string; password: string; role: string}) => {
    const res = await axios.post(`${API_URL}/auth/signup`, credentials);
    return res.data;
});

export const verifyToken = createAsyncThunk('user/verifyToken', async(token: string) => {
    const res = await axios.post(`${API_URL}/auth/verifyToken`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
});