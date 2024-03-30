import { createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_URL } from "../../constants/apiEndpoints";
import axios from "axios";

const baseUrl = "https://localhost:7023"

export const loginUser = createAsyncThunk(
    "auth/login",
    async (payload) => {
        try {

            const { data } = await axios.post(baseUrl + AUTH_URL.LOGIN, payload, {
                headers:{
                    "Content-Type" : "application/json"
                }
            });
            
            return data;

        } catch(err) {
            console.log(err)
            return err.message
        }
    }
)

export const registerUser = createAsyncThunk(
    "auth/register",
    async (payload) => {
        try {

            const { data } = await axios.post(baseUrl + AUTH_URL.REGISTER, payload, {
                headers: {
                    "Content-Type" : "application/json"
                }
            });

            return data;

        } catch(err) {
            console.log(err.message)
            return err.message;
        }
    }
)