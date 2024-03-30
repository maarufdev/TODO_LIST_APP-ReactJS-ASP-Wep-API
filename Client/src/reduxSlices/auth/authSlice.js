import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authActions";


const authData = localStorage.getItem('authData') 
                ?
                JSON.parse(localStorage.getItem("authData"))
                :
                null 

const initialState = {
    login: null,
    register: null,
    authData,
    isLoading: false,
    isError: false,
    errorMessage: null
}


const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("authData");
            state.authData = null;
            state.isLoading = false;
            state.isError = false;
            state.errorMessage = null;
            state.login = null;
            state.register = null;
        },
        setCredential: (state, action) => {
            state.authData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        // login
        .addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            localStorage.setItem("authData", JSON.stringify(action.payload))
            state.isLoading = false;
            state.isError = false;
            state.authData = action.payload;
            state.errorMessage = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload
        })
        // register
        .addCase(registerUser.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.errorMessage = null;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        })

    }
})

export const { logout, setCredential } = authSlice.actions;

export default authSlice.reducer;