import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user : null,
    domains : null,
    loading: false,
    error: null
}

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
    }
})


export const {authRequest, authSuccess, authFailure, logout} = authSlice.actions;

export default authSlice.reducer;