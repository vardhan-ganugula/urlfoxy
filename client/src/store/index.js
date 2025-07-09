import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice.js'
import apiSlice from './apis/index.js';


const store = configureStore({

    reducer: {
        authReducer,
        [apiSlice.reducerPath] : apiSlice.reducer
    },
    middleware: function(prev){
        return [...prev(), apiSlice.middleware]
    } 
});



export default store;