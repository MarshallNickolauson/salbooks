import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem("userInfo-salbooks")
        ? JSON.parse(localStorage.getItem("userInfo-salbooks"))
        : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo-salbooks", JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo-salbooks");
        }
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
