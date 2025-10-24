import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        // You can add more reducers here for posts, etc. if you want
    }
});

export default store;