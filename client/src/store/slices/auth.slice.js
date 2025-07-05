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
        loginRequest : (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        },
        loginFailure: (state, action) => {
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


export const {loginRequest, loginSuccess, loginFailure, logout} = authSlice.actions;

export default authSlice.reducer;