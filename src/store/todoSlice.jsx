import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getTodos = createAsyncThunk(
    "todos/getTodos",
    async (_, thunkAPI) => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos")

            if (!response.ok) {
                return new Error("Server get error")
            }

            return response.json()
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deleteTodo = createAsyncThunk(
    "todos/deleteTodo",
    async (id, thunkAPI) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "DELETE"
            })

            if (!response.ok) {
                return new Error("Server delete error")
            }

            thunkAPI.dispatch(removeTodo({id}))
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const patchTodo = createAsyncThunk(
    "todos/patchTodos",
    async (id, thunkApi) => {
        const todo = thunkApi.getState().todos.todos.findIndex(todo => todo.id === id)
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    completed: !todo.completed
                })
            })

            if (!response.ok) {
                return new Error("Server patch error")
            }

            thunkApi.dispatch(toggleCompleted({id}))
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const postTodo = createAsyncThunk(
    "todos/postTodo",
    async (_, thunkAPI) => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: "new todo",
                    completed: false
                })
            })

            if (!response.ok) {
                return new Error("Server post error")
            }

            const data = await response.json();

            thunkAPI.dispatch(addTodo(data))
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        status: null,
        error: null,
    },
    reducers: {
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        },
        toggleCompleted(state, action) {
            state.todos = state.todos.map(todo => {
                if (todo.id !== action.payload.id) return todo

                return {
                    ...todo,
                    completed: !todo.completed
                }
            })
        },
        addTodo(state, action) {
            state.todos.unshift(action.payload)
        }
    },
    extraReducers(builder) {
        builder.addCase(getTodos.pending, (state, action) => {
            state.status = "pending"
            state.error = null
        })
        builder.addCase(getTodos.fulfilled, (state, action) => {
            state.status = "fulfilled"
            state.todos = action.payload
        })
        builder.addCase(getTodos.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.payload
        })
        builder.addCase(deleteTodo.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.payload
        })
        builder.addCase(postTodo.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.payload
        })
        builder.addCase(patchTodo.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.payload
        })
    }
})

export const {removeTodo, toggleCompleted, addTodo} = todoSlice.actions

export default todoSlice.reducer