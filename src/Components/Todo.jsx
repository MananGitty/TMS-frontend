import React from "react";

const Todo = ({ todo, handleTodoCheck }) => {
  return (
    <div>
      <input type="checkbox" onChange={handleTodoCheck} />
      {todo.text}
    </div>
  );
};

export default Todo;
