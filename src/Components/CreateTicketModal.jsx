import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CreateTicketModal = ({ onCreate, onCancel }) => {
  const [ticketTitle, setTicketTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState("");

  const handleTicketTitleChange = (event) => {
    setTicketTitle(event.target.value);
  };

  const handleTodoChange = (event) => {
    setCurrentTodo(event.target.value);
  };

  const handleAddTodo = () => {
    setTodos([...todos, currentTodo]);
    setCurrentTodo("");
  };

  const handleCreate = () => {
    onCreate(ticketTitle, todos);
  };

  return (
    <div className="create-ticket-modal">
      <h2>Create Ticket</h2>
      <label>
        Ticket Title:
        <input
          type="text"
          value={ticketTitle}
          onChange={handleTicketTitleChange}
        />
      </label>
      <h3>Todos:</h3>
      <div className="todos">
        {todos.map((todo) => (
          <div key={todo} className="todo">
            {todo}
          </div>
        ))}
      </div>
      <label>
        Add Todo:
        <input type="text" value={currentTodo} onChange={handleTodoChange} />
        <button onClick={handleAddTodo}>+</button>
      </label>
      <div className="actions">
        <button onClick={handleCreate}>Create</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateTicketModal;
