import React, { useEffect, useState } from "react";
import queryString from 'query-string';
import "./App.scss";
import ColorBox from "./component/ColorBox";
import Pagination from "./component/Pagination";
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
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  });
 
  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });

      const { data, pagination } = responseJSON;
      setPostList(data);
      setPagination(pagination);
      } catch (error) {
        console.log('Failed', error.message);
      }
      
    }

    fetchPostList();
  }, [filters]);

  function handlePageChange(newPage) {
    console.log("New Page", newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

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

      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
