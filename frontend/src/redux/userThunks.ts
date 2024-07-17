import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constants";
import { signInPayload } from "./types";

export const signIn:AsyncThunk<signInPayload, {username: string; password: string}, {}> = createAsyncThunk('user/signIn', async(credentials) => {
    const res = await axios.post(`${API_URL}/auth/signin`, credentials);
    return res.data;
});

export const signUp:AsyncThunk<signInPayload, {username: string; email:string;password: string; role: string}, {}> = createAsyncThunk('user/signUp', async(credentials) => {
    const res = await axios.post(`${API_URL}/auth/signup`, credentials);
    return res.data;
});

export const verifyToken:AsyncThunk<signInPayload, string, {}> = createAsyncThunk('user/verifyToken', async(token) => {
    const res = await axios.post(`${API_URL}/auth/verifyToken`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
});