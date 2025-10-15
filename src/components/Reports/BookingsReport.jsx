import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const BookingsReport = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.getBookingsReport({ date: '2025-10-14' });
        setBookings(response.data.items || []);
      } catch (error) {
        console.error('Bookings report fetch failed:', error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Bookings Report</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">ID</th>
            <th className="py-2">Customer</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{booking.id}</td>
              <td className="py-2">{booking.customer}</td>
              <td className="py-2">{booking.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsReport;