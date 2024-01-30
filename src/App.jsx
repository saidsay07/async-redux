import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTodos, postTodo} from "./store/todoSlice.jsx";
import TodoItem from "./components/TodoItem.jsx";

function App() {
    const {todos, status, error} = useSelector(state => state.todos)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTodos())
    }, [dispatch]);

    return (
        <>
            <button onClick={() => dispatch(postTodo())}>Add</button>
            {status === "pending" && <h2>Pending...</h2>}
            {error && <h2>Error: {error}</h2>}

            {todos.map(todo => {
                return <TodoItem key={todo.id} {...todo}/>
            })}
        </>
    )
}

export default App