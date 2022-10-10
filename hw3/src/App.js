import React, { useState } from "react"
import "./styles.css";
import Header from "./Components/header"
import Main from "./Components/input"
import Task from "./Components/task"
import Footer from "./Components/footer"

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([]);
 
  const addTodo = (e) => {
    e.preventDefault();

    setTodos([{ id: `${todo}-${Date.now()}`, todo, checked: false }, ...todos]);
    setTodo('');
  }


  const deleteTodo = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  };

  const checkTodo = (id) => {
    const update = todos.map( to => {
      if( to.id === id ) {
        return ({ ...to, checked: !to.checked })
      }
      return to;
    })
    setTodos([...update]);
  }


  return (
    <div>
      <Header />
      <Main addTodo={addTodo} todos={todos} todo={todo} setTodo={setTodo}/>
      <Task todos={todos} deleteTodo={deleteTodo} checkedTodo={checkTodo} />
      <Footer todos={todos}/>
    </div>
  );
}

export default App;
