import React, { useState, useEffect } from "react";
import TicketItem from "./TicketItem";

const Ticket = () => {
  const [completedTickets, setCompletedTickets] = useState([]);
  const [activeTickets, setActiveTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:3000/tickets";
      const response = await fetch(url);
      const data = await response.json();
      setCompletedTickets(data.completedTickets);
      setActiveTickets(data.activeTickets);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Completed Tickets</h2>
      <ul>
        {completedTickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </ul>
      <h2>Active Tickets</h2>
      <ul>
        {activeTickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </ul>
    </div>
  );
};

export default Ticket;
