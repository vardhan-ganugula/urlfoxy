import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice.js'

const store = configureStore({

    reducer: {
        authReducer
    }
});



export default store;