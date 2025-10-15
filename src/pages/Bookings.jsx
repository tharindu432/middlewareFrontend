import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Loader from '../components/Common/Loader';
import { Plus, ClipboardList, CheckCircle, Clock, XCircle, Eye, Edit2, Plane } from 'lucide-react';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data
  const dummyBookings = [
    { id: 'BK12346', customer: 'Bob Williams', route: 'SFO - ORD', date: '2024-08-06', amount: 280, status: 'Pending', email: 'bob@example.com', phone: '+1234567890' },
    { id: 'BK12345', customer: 'Alice Johnson', route: 'JFK - LAX', date: '2024-08-05', amount: 350, status: 'Confirmed', email: 'alice@example.com', phone: '+1234567891' },
    { id: 'BK12344', customer: 'Charlie Brown', route: 'LAX - MIA', date: '2024-08-04', amount: 420, status: 'Confirmed', email: 'charlie@example.com', phone: '+1234567892' },
    { id: 'BK12343', customer: 'Diana Prince', route: 'ORD - SEA', date: '2024-08-03', amount: 315, status: 'Cancelled', email: 'diana@example.com', phone: '+1234567893' },
    { id: 'BK12342', customer: 'Ethan Hunt', route: 'MIA - JFK', date: '2024-08-02', amount: 390, status: 'Confirmed', email: 'ethan@example.com', phone: '+1234567894' },
    { id: 'BK12341', customer: 'Fiona Gallagher', route: 'SEA - LAX', date: '2024-08-01', amount: 245, status: 'Pending', email: 'fiona@example.com', phone: '+1234567895' },
  ];

  useEffect(() => {
    setBookings(dummyBookings);
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.route.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <Loader />;

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bookings Management</h1>
          <p className="text-gray-600">Manage all your flight bookings</p>
        </div>
        <motion.button
          className="btn btn-primary flex items-center gap-2 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={18} />
          <span>New Booking</span>
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="glass-card-light p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Bookings</label>
            <input
              type="text"
              placeholder="Search by ID, customer, or route..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field-light"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field-light"
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Bookings', value: bookings.length, icon: ClipboardList, color: 'blue' },
          { label: 'Confirmed', value: bookings.filter(b => b.status === 'Confirmed').length, icon: CheckCircle, color: 'green' },
          { label: 'Pending', value: bookings.filter(b => b.status === 'Pending').length, icon: Clock, color: 'yellow' },
          { label: 'Cancelled', value: bookings.filter(b => b.status === 'Cancelled').length, icon: XCircle, color: 'red' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="glass-card-light p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon size={36} className="text-gray-400" strokeWidth={1.5} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bookings Table */}
      <motion.div
        className="glass-card-light p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Route</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredBookings.map((booking, index) => (
                <motion.tr
                  key={booking.id}
                  className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.005 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-blue-600">{booking.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {booking.customer.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.customer}</div>
                        <div className="text-xs text-gray-500">{booking.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Plane size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-700 font-medium">{booking.route}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{booking.date}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-900">${booking.amount}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex ${
                      booking.status === 'Pending' ? 'status-pending' :
                      booking.status === 'Confirmed' ? 'status-confirmed' :
                      'status-cancelled'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <motion.button
                        className="text-blue-600 hover:text-blue-700 cursor-pointer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        title="View Details"
                      >
                        <Eye size={16} />
                      </motion.button>
                      <motion.button
                        className="text-green-600 hover:text-green-700 cursor-pointer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </motion.button>
                      <motion.button
                        className="text-red-600 hover:text-red-700 cursor-pointer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        title="Cancel"
                      >
                        <XCircle size={16} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredBookings.length}</span> bookings
          </p>
          <div className="flex gap-2">
            <button className="btn btn-outline px-4 py-2 text-sm shadow-sm">Previous</button>
            <button className="btn btn-primary px-4 py-2 text-sm shadow-md">Next</button>
          </div>
        </div>
      </motion.div>

      {/* Empty State */}
      {filteredBookings.length === 0 && (
        <motion.div
          className="glass-card-light p-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ClipboardList size={64} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Bookings Found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Bookings;