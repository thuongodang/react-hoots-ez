import React, { useState } from "react";
import "./App.scss";
import ColorBox from "./component/colorBox";
import TodoList from "./component/TodoList";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "I learn ReactJs! X" },
    { id: 2, title: "We learn ReactJs! X" },
    { id: 3, title: "they learn ReactJs! X" },
  ]);

  function handleTodoClick(todo){
    console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if(index < 0) return;

    const newTodolist = [...todoList];
    newTodolist.splice(index, 1);
    setTodoList(newTodolist);
    
  }

  return (
    <div className="app">
      <h1>React hooks - Todolist</h1>
      <TodoList todos={todoList} onTodoClick={handleTodoClick}/>
    </div>
  );
}

export default App;
