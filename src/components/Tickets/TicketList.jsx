import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.searchTickets({});
        setTickets(response.data);
      } catch (error) {
        console.error('Ticket list fetch failed:', error);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Ticket List</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">ID</th>
            <th className="py-2">Booking ID</th>
            <th className="py-2">Passenger</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{ticket.id}</td>
              <td className="py-2">{ticket.bookingId}</td>
              <td className="py-2">{ticket.passengerName}</td>
              <td className="py-2">{ticket.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;