import React, { useState } from "react";
import { Link } from "react-router-dom";

const TicketManagement = () => {
  const [activeTickets, setActiveTickets] = useState([]);
  const [completedTickets, setCompletedTickets] = useState([]);

  // function to add a new ticket to the active tickets list
  const addTicket = (ticket) => {
    setActiveTickets((prevActiveTickets) => [...prevActiveTickets, ticket]);
  };

  // function to mark a ticket as complete and move it to the completed tickets list
  const markTicketComplete = (ticket) => {
    setActiveTickets((prevActiveTickets) =>
      prevActiveTickets.filter((t) => t.id !== ticket.id)
    );
    setCompletedTickets((prevCompletedTickets) => [
      ...prevCompletedTickets,
      ticket,
    ]);
  };

  return (
    <div>
      <h1>Active Tickets</h1>
      <div>
        {activeTickets.map((ticket) => (
          <div key={ticket.id}>
            <h2>{ticket.title}</h2>
            <button onClick={() => markTicketComplete(ticket)}>
              Mark as Complete
            </button>
            <Link to={`/tickets/${ticket.id}`}>View Details</Link>
          </div>
        ))}
      </div>
      <h1>Completed Tickets</h1>
      <div>
        {completedTickets.map((ticket) => (
          <div key={ticket.id}>
            <h2>{ticket.title}</h2>
            <Link to={`/tickets/${ticket.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketManagement;
