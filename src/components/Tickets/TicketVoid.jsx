import { useState } from 'react';
import { api } from '../../services/api';

const TicketVoid = () => {
  const [ticketId, setTicketId] = useState('');

  const handleVoid = async (e) => {
    e.preventDefault();
    try {
      await api.voidTicket(ticketId);
      alert('Ticket voided successfully!');
    } catch (error) {
      console.error('Ticket void failed:', error);
    }
  };

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Void Ticket</h2>
      <form onSubmit={handleVoid} className="space-y-4">
        <input
          type="text"
          placeholder="Ticket ID"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="btn btn-primary">Void</button>
      </form>
    </div>
  );
};

export default TicketVoid;