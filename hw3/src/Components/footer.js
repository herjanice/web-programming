import React from "react"

const Footer = ({todos}) => {
    if (todos.length !== 0) {
        return (
            <div className="todo-app__footer" id="todo-footer">
                <div className="todo-app__total"> 
                    <p> {todos.length} left </p>
                </div>
                <ul className="todo-app__view-buttons">
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </ul>
                <div className="todo-app__clean"> 
                    <button> Clear Completed </button>
                </div>
            </div>
        )
    }
}

export default Footer