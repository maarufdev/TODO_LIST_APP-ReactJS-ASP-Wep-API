import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { TODO_URL } from "../../constants/apiEndpoints";

const baseUrl = "https://localhost:7023"

const SLICE_NAME = "todo";

const getHeaderConfig = (token = null) => {
    let headers = {
        "Content-Type": "application/json",
    }

    if(token){
        headers["Authorization"] = "Bearer " + token
    }

    return headers
}

export const getTodos = createAsyncThunk(
    SLICE_NAME + "/list",
    async () => {
        try {
            const authData  = JSON.parse(localStorage.getItem('authData'));
            const { data } = await axios.get(baseUrl + TODO_URL.GET_TODOS + `/${authData.username}`, {
                headers: getHeaderConfig(authData.token)
            })
            return data

        } catch(err){
            console.log(err)
        }
    }
)

export const getTodoById = createAsyncThunk(
    SLICE_NAME + "getByid",
    async (id) => {
        try{
            const authData  = JSON.parse(localStorage.getItem('authData'));
            const { data } = await axios.get(baseUrl + TODO_URL.GET_TODO_BY_ID + `/${id}`, {
                headers: getHeaderConfig(authData.token)
            });

            return data;

        } catch(err){

        }
    }
)

export const upsertTodo = createAsyncThunk(
    SLICE_NAME + "/save",
    async ( payload ) => {
        try{

            const authData  = JSON.parse(localStorage.getItem('authData'));
            const response = await axios.post(baseUrl + TODO_URL.SAVE_TODO, payload, {
                headers: getHeaderConfig(authData.token)
            });

            return response.data

        } catch(err){
            console.log(err)
        }
    }
)

export const removeTodoById = createAsyncThunk(
    SLICE_NAME + "/removeTodo",
    async (id) => {
        try{
            const authData  = JSON.parse(localStorage.getItem('authData'));

            const response = await axios.put(
                                            baseUrl + TODO_URL.DELETE_TODO_BY_ID + `/${id}`,{}, {
                                                headers: getHeaderConfig(authData.token)
                                            })
            
            return response.data

        } catch(err){
            console.log(err.message)
        }
    }
)