import { Eye, Edit2, Trash2 } from 'lucide-react';

const RecentBookings = ({ bookings }) => (
  <div className="card p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-base font-semibold text-gray-900">Recent Bookings</h3>
      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
        View All →
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="table-clean">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer</th>
            <th>Route</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>
                <span className="text-sm font-semibold text-gray-900">{booking.id}</span>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {booking.customer.charAt(0)}
                  </div>
                  <span className="text-sm text-gray-900">{booking.customer}</span>
                </div>
              </td>
              <td className="text-sm text-gray-600">{booking.route}</td>
              <td className="text-sm text-gray-600">{booking.date}</td>
              <td className="text-sm font-semibold text-gray-900">${booking.amount}</td>
              <td>
                <span className={`${booking.status === 'Pending' ? 'status-pending' : 'status-confirmed'}`}>
                  {booking.status}
                </span>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <button className="text-blue-600 hover:text-blue-700" title="View">
                    <Eye size={16} />
                  </button>
                  <button className="text-gray-600 hover:text-gray-700" title="Edit">
                    <Edit2 size={16} />
                  </button>
                  <button className="text-red-600 hover:text-red-700" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentBookings;