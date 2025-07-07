import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../libs/axios.lib";


const initialState = {
    user : null,
    domains : null,
    loading: false,
    error: null
}

export const checkAuth = createAsyncThunk('auth/fetchDetails', async () => {
    const data = await axios.get('/user/profile');
    return data.data.user || [];
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authRequest : (state) => {
            state.loading = true;
        },
        authSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        },
        authFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.loading = false;
            state.user = null;
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(checkAuth.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(checkAuth.fulfilled, (state, payload) => {
            state.loading = false;
            state.error = null;
            state.user = payload;
        });
        builder.addCase(checkAuth.rejected, (state) => {
            state.loading = false;
            state.error = 'User Authentication failed';
            state.user = null;
        })
    }
})


export const {authRequest, authSuccess, authFailure, logout} = authSlice.actions;

export default authSlice.reducer;