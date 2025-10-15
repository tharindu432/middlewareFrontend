import { useState } from 'react';
import { api } from '../../services/api';

const TicketRefund = () => {
  const [ticketId, setTicketId] = useState('');

  const handleRefund = async (e) => {
    e.preventDefault();
    try {
      await api.refundTicket(ticketId);
      alert('Ticket refunded successfully!');
    } catch (error) {
      console.error('Ticket refund failed:', error);
    }
  };

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Refund Ticket</h2>
      <form onSubmit={handleRefund} className="space-y-4">
        <input
          type="text"
          placeholder="Ticket ID"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="btn btn-primary">Refund</button>
      </form>
    </div>
  );
};

export default TicketRefund;