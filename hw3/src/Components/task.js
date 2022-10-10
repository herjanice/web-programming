import React, {useState} from "react"
import img from "./img/x.png"

const Task = ({todos, deleteTodo, checkedTodo}) => {
    
    return (
        <ul className="todo-app__list" id="todo-list">
            {todos.map ((t) => (
                <li key={t.id} id={"hello"+t.id} className="todo-app__item">
                    <div className="todo-app__checkbox">
                        <input id={t.id} type="checkbox" onClick={() => checkedTodo(t.id)} checked={t.checked}/>
                        <label htmlFor={t.id}></label>
                    </div>
                    <h1 className="todo-app__item-detail" style={{
                        textDecoration: t.checked ? 'line-through' : 'none',
                        opacity: t.checked ? '0.5' : '1.0'
                    }}> {t.todo} </h1>
                </li>
            ))}
        </ul>
    )
}

export default Task