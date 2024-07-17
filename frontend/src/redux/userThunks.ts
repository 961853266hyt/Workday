import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../constants";
import { signInPayload } from "./types";
import { MyKnownError } from "./types";

export const signIn:AsyncThunk<signInPayload, {username: string; password: string}, {}> = createAsyncThunk('user/signIn', async(credentials) => {
    try {
        const res = await axios.post(`${API_URL}/auth/signin`, credentials);
        return res.data;
    } catch (error) {
        alert('password or email incorrect!'); 
        console.log(error);
    }
});

export const signUp:AsyncThunk<signInPayload, {username: string; email:string;password: string; role: string}, {}> = createAsyncThunk('user/signUp', async(credentials) => {
    // const res = await axios.post(`${API_URL}/auth/signup`, credentials);
    // return res.data;
    try {
        const res = await axios.post(`${API_URL}/auth/signup`, credentials);
        return res.data;
    } catch (error: any) {
        if (error.response && error.response.data.errors) {
            error.response.data.errors.forEach((err: {field:string, message:string}) => {
                alert(`${err.field}: ${err.message}`);
            });
        } else {
            alert('An error occurred during sign-up. Please try again later.');
            console.log(error);
        }
    }
});

export const verifyToken:AsyncThunk<signInPayload, string, {}> = createAsyncThunk('user/verifyToken', async(token) => {
    const res = await axios.post(`${API_URL}/auth/verifyToken`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
});