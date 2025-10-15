import { useState } from 'react';
import { api } from '../../services/api';

const BookingReconfirm = () => {
  const [bookingId, setBookingId] = useState('');

  const handleReconfirm = async (e) => {
    e.preventDefault();
    try {
      await api.reconfirmBooking(bookingId);
      alert('Booking reconfirmed successfully!');
    } catch (error) {
      console.error('Booking reconfirmation failed:', error);
    }
  };

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Reconfirm Booking</h2>
      <form onSubmit={handleReconfirm} className="space-y-4">
        <input
          type="text"
          placeholder="Booking ID"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="btn btn-primary">Reconfirm</button>
      </form>
    </div>
  );
};

export default BookingReconfirm;