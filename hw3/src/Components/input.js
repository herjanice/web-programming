import React, { useState } from "react"

const Input = ({ addTodo, todo, setTodo}) => {

    return (
        <div>
            <form className="todo-app__main" onSubmit={addTodo}>
                <input className="todo-app__input" placeholder="What needs to be done?" type="text" value={todo} onChange={(e)=>setTodo(e.target.value)}/>
            </form>
        </div>
        
    )
}

export default Input