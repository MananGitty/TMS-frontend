import React from "react";
import Todo from "./Todo";

const TodoList = ({ ticket: { todos }, handleTodoCheck }) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <Todo key={index} todo={todo} handleTodoCheck={handleTodoCheck} />
      ))}
    </ul>
  );
};

export default TodoList;
