import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useToast } from '../Common/Toast';

const BookingList = () => {
  const toast = useToast();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.searchBookings({});
        setBookings(response.data);
      } catch (error) {
        const msg = error?.response?.data?.message || 'Failed to load bookings';
        toast.error(msg);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Booking List</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">ID</th>
            <th className="py-2">Customer</th>
            <th className="py-2">Route</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{booking.id}</td>
              <td className="py-2">{booking.contactEmail}</td>
              <td className="py-2">{booking.route}</td>
              <td className="py-2">{booking.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default BookingList;