import React from "react";

const TicketDetails = ({ ticket }) => {
  return (
    <div>
      <h2>{ticket.title}</h2>
      <ul>
        {ticket.todos.map((todo) => (
          <li key={todo._id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TicketDetails;
