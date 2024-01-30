import {configureStore} from "@reduxjs/toolkit";
import todoReducer from "./todoSlice.jsx";

export const store = configureStore({
    reducer: {
        todos: todoReducer
    }
})