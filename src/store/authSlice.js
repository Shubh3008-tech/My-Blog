import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false, // user is not authenticated
    userData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Reducer for logging in
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        // Reducer for logging out
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;