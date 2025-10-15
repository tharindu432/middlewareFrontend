import { useState } from 'react';
import { api } from '../../services/api';

const BookingCancel = () => {
  const [bookingId, setBookingId] = useState('');

  const handleCancel = async (e) => {
    e.preventDefault();
    try {
      await api.cancelBooking(bookingId);
      alert('Booking cancelled successfully!');
    } catch (error) {
      console.error('Booking cancellation failed:', error);
    }
  };

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Cancel Booking</h2>
      <form onSubmit={handleCancel} className="space-y-4">
        <input
          type="text"
          placeholder="Booking ID"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="btn btn-primary">Cancel</button>
      </form>
    </div>
  );
};

export default BookingCancel;