import { useState } from 'react';
import { api } from '../../services/api';

const TicketIssue = () => {
  const [formData, setFormData] = useState({ bookingId: '', passengerDetails: '' });

  const handleIssue = async (e) => {
    e.preventDefault();
    try {
      await api.issueTicket({ ...formData, bookingId });
      alert('Ticket issued successfully!');
    } catch (error) {
      console.error('Ticket issue failed:', error);
    }
  };

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Issue Ticket</h2>
      <form onSubmit={handleIssue} className="space-y-4">
        <input
          type="text"
          placeholder="Booking ID"
          value={formData.bookingId}
          onChange={(e) => setFormData({ ...formData, bookingId: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Passenger Details"
          value={formData.passengerDetails}
          onChange={(e) => setFormData({ ...formData, passengerDetails: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="btn btn-primary">Issue</button>
      </form>
    </div>
  );
};

export default TicketIssue;