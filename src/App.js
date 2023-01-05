import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateTicketModal from "./Components/CreateTicketModal";
import TicketsList from "./Components/TicketsList";
import Navbar from "./Components/Navbar/Navbar";

import { v4 as uuidv4 } from "uuid";
import "./app.css";

function App() {
  const url = "http://localhost:3000/tickets";
  const [tickets, setTickets] = useState([]);
  const [completedTickets, setCompletedTickets] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateTicket = async (ticketTitle, todos) => {
    const newTicket = {
      id: uuidv4(),
      title: ticketTitle,
      todos: todos.map((todo) => ({
        id: uuidv4(),
        text: todo,
        isComplete: false,
      })),
      completionPercentage: 0,
    };

    const newTickets = [...tickets, newTicket];
    setTickets(newTickets);
    setShowCreateModal(false);
    const url = "http://localhost:3000/tickets/";
    try {
      const response = await axios.post(url, {
        title: ticketTitle,
        todos: todos.map((todo) => ({ title: todo })),
      });
      console.log(response.data.ticket);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete the Ticket Object
  const handleDelete = async (ticketId) => {
    // Find the ticket object in the tickets state
    const ticket = tickets.find((ticket) => ticket.id === ticketId);
    if (!ticket) {
      console.error(`Ticket with id ${ticketId} not found in tickets state`);
      return;
    }

    // Remove the ticket from the tickets state
    setTickets(tickets.filter((ticket) => ticket.id !== ticketId));

    // Send delete request to backend to delete ticket from database
    const url = "http://localhost:3000/tickets";
    try {
      await axios.delete(`${url}/${ticketId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTodoCheck = (ticketId, todoId) => {
    // Find the ticket object in the tickets state
    const ticket = tickets.find((ticket) => ticket.id === ticketId);
    console.log(ticket);
    if (!ticket) {
      console.error(`Ticket with id ${ticketId} not found in tickets state`);
      return;
    }

    // Update the ticket object
    const newTicket = {
      ...ticket,
      todos: ticket.todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, isComplete: true };
        }
        return todo;
      }),
    };
    console.log("New Ticket - >", newTicket);
    newTicket.completionPercentage =
      (newTicket.todos.filter((todo) => todo.isComplete).length /
        newTicket.todos.length) *
      100;

    // Update the tickets state with the updated ticket
    setTickets(
      tickets.map((ticket) => {
        if (ticket.id === ticketId) {
          return newTicket;
        }
        return ticket;
      })
    );

    // Send patch request to backend to update ticket in database
    const url = "http://localhost:3000/tickets";
    try {
      axios.patch(`${url}/${ticketId}`, newTicket);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Navbar />

      <button onClick={() => setShowCreateModal(true)}>Create Ticket</button>
      {showCreateModal && (
        <CreateTicketModal
          onCreate={handleCreateTicket}
          onCancel={() => setShowCreateModal(false)}
        />
      )}
      <div className="tickets-container">
        <div className="tickets-list-container">
          <TicketsList tickets={tickets} handleDelete={handleDelete} />

          {console.log("These are tickets ->", tickets)}
        </div>
        {tickets
          .filter((ticket) => ticket.completionPercentage < 100)
          .map((ticket) => (
            <div key={ticket.id} className="ticket">
              <div className="result-div">
                <h3>{ticket.title}</h3>
                <div className="todos">
                  {ticket.todos.map((todo) => (
                    <div key={todo.id} className="todo">
                      <input
                        type="checkbox"
                        checked={todo.isComplete}
                        onChange={() => handleTodoCheck(ticket.id, todo.id)}
                      />
                      <span className={todo.isComplete ? "complete" : ""}>
                        {todo.text}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="completion-percentage">
                  Completion: {ticket.completionPercentage}%
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
