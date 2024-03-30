import { createSlice } from '@reduxjs/toolkit'
import { 
    getTodoById,
    getTodos,
    upsertTodo,
    removeTodoById 
} from './todoActions'


// const selectedItemInitialState = {
//     id: 0,
//     title: null,
//     description: null,
//     isDone: true,
//     isActive: true,
//     username: null
// }

const initialState = {
    selectedItem: null,
    todos:[],
    todoModal: false,
    isUpdate: false,
    isLoading: false,
    isError: true,
    errorMessage: null
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers:{
        showModal: (state, action) => {
            state.todoModal = true
            state.isUpdate = true;
        },
        closeModal: (state) => {
            state.todoModal = false
            state.selectedItem = null;
            state.isUpdate = false;
            state.isError= false;
        },
        cleanState: (state) => {
            state.selectedItem = null;
            state.todos = [];
            state.todoModal = false;
            state.isError = false;
            state.isLoading = false;
            
        },
    },
    extraReducers: (builder) => {
        builder
        // get Todos
        .addCase(getTodos.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(getTodos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.todos = [...action.payload];
            state.selectedItem = null;
        })
        .addCase(getTodos.rejected, (state, action) => {
            state.isLoading = false;
        })
        // getTodos ById
        .addCase(getTodoById.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isUpdate = true;
        })
        .addCase(getTodoById.fulfilled, (state, action) => {
            state.selectedItem = action.payload;
            state.isUpdate = false;
            state.isLoading = false;
            state.isError = false;
        })
        .addCase(getTodoById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
        // todo upsert
        .addCase(upsertTodo.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isUpdate = false;
        })
        .addCase(upsertTodo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.selectedItem = null;
            state.isError = false;
            state.isUpdate = true;
        })
        .addCase(upsertTodo.rejected, (state, action) => {
            state.isError = true;
            isLoading = false;
        })
        // Delete todo
        .addCase(removeTodoById.pending, (state, action) => {
            state.isUpdate = true;
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(removeTodoById.fulfilled, (state, action) => {
            state.isUpdate = false;
            state.isError = false;
            state.isLoading = false;
            state.selectedItem = null;
        })
        .addCase(removeTodoById.rejected, (state, action) => {
            state.isUpdate = false;
            state.isError = true;
            state.isLoading = false;
        })
    },
})


export const { 
            showModal, 
            closeModal, 
            cleanState,
        } = todoSlice.actions;

export default todoSlice.reducer