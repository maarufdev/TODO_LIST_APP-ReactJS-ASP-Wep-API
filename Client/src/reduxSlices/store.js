import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todo/todoSlice";
import authSlice from "./auth/authSlice";

export default configureStore({
    reducer:{
        auth: authSlice,
        todo: todoSlice,
    }
})