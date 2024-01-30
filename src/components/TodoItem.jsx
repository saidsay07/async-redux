import React from 'react';
import {useDispatch} from "react-redux";
import {deleteTodo, patchTodo} from "../store/todoSlice.jsx";

function TodoItem({id, title, completed}) {
    const dispatch = useDispatch()

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10
        }}>
            <input type="checkbox" checked={completed} onChange={() => dispatch(patchTodo(id))}/>
            <p>{title}</p>
            <span onClick={() => dispatch(deleteTodo(id))}>&times;</span>
        </div>
    );
}

export default TodoItem;