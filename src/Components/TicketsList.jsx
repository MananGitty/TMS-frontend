import React, { useState, useEffect } from "react";
import TicketItem from "./TicketItem";
import { Link } from "react-router-dom";

const TicketsList = () => {
  const [completedTickets, setCompletedTickets] = useState([]);
  const [activeTickets, setActiveTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/tickets");
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
          <li key={ticket._id}>
            <TicketItem ticket={ticket} />
          </li>
        ))}
      </ul>
      <h2>Active Tickets</h2>
      <ul>
        {activeTickets.map((ticket) => (
          <li key={ticket._id}>
            <TicketItem ticket={ticket} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketsList;
