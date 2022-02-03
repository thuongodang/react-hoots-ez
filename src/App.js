import React, { useEffect, useState } from "react";
import "./App.scss";
import ColorBox from "./component/ColorBox";
import PostList from "./component/PostList";
import TodoForm from "./component/TodoForm";
import TodoList from "./component/TodoList";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "I learn ReactJs! X" },
    { id: 2, title: "We learn ReactJs! X" },
    { id: 3, title: "they learn ReactJs! X" },
  ]);

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchPostList() {
      try {
        const requestUrl = "http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1";
      const response = await fetch(requestUrl);
      const responseJSON = await response.json();
      console.log({ responseJSON });

      const { data } = responseJSON;
      setPostList(data);
      } catch (error) {
        console.log('Failed', error.message);
      }
      
    }

    fetchPostList();
  }, []);

  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;

    const newTodolist = [...todoList];
    newTodolist.splice(index, 1);
    setTodoList(newTodolist);
  }

  function handleTodoFormSubmit(formValues) {
    console.log("Form submit: ", formValues);
    // add new todo to current todo list
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    };
    const newTodolist = [...todoList];
    newTodolist.push(newTodo);
    setTodoList(newTodolist);
  }

  return (
    <div className="app">
      <h1>React hooks - Todolist</h1>

      {/* <TodoForm onSubmit={handleTodoFormSubmit} /> */}
      {/* <TodoList todos={todoList} onTodoClick={handleTodoClick}/> */}
      <PostList posts={postList}/>
    </div>
  );
}

export default App;
