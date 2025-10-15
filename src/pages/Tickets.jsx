import { motion } from 'framer-motion';
import { useState } from 'react';
import { Ticket, CheckCircle, Clock, XCircle, Eye, Download, X } from 'lucide-react';

const Tickets = () => {
  const [activeTab, setActiveTab] = useState('all');

  const dummyTickets = [
    { id: 'TKT001', passenger: 'John Doe', flight: 'FA101 - JFK to LAX', pnr: 'ABC123', date: '2024-08-15', status: 'Issued', price: 350 },
    { id: 'TKT002', passenger: 'Jane Smith', flight: 'SW202 - SFO to ORD', pnr: 'DEF456', date: '2024-08-16', status: 'Pending', price: 280 },
    { id: 'TKT003', passenger: 'Bob Johnson', flight: 'FA303 - LAX to MIA', pnr: 'GHI789', date: '2024-08-17', status: 'Void', price: 420 },
    { id: 'TKT004', passenger: 'Alice Brown', flight: 'CJ404 - ORD to SEA', pnr: 'JKL012', date: '2024-08-18', status: 'Refunded', price: 315 },
  ];

  const stats = [
    { label: 'Total Tickets', value: dummyTickets.length, icon: Ticket, color: 'bg-blue-600' },
    { label: 'Issued', value: dummyTickets.filter(t => t.status === 'Issued').length, icon: CheckCircle, color: 'bg-green-600' },
    { label: 'Pending', value: dummyTickets.filter(t => t.status === 'Pending').length, icon: Clock, color: 'bg-yellow-600' },
    { label: 'Void/Refunded', value: dummyTickets.filter(t => t.status === 'Void' || t.status === 'Refunded').length, icon: XCircle, color: 'bg-red-600' },
  ];

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ticket Management</h1>
          <p className="text-gray-600">Issue, void, and refund flight tickets</p>
        </div>
        <motion.button
          className="btn btn-primary flex items-center gap-2 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Ticket size={18} />
          <span>Issue Ticket</span>
        </motion.button>
      </motion.div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="glass-card-light p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center shadow-md`}>
                <stat.icon className="text-white" size={24} strokeWidth={2} />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">{stat.label}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <motion.div
        className="glass-card-light p-2 mb-8 inline-flex rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {['all', 'issued', 'pending', 'void'].map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab}
          </motion.button>
        ))}
      </motion.div>

      {/* Tickets List */}
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
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Ticket ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Passenger</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Flight</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">PNR</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {dummyTickets.map((ticket, index) => (
                <motion.tr
                  key={ticket.id}
                  className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-blue-600">{ticket.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {ticket.passenger.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{ticket.passenger}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ticket.flight}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">{ticket.pnr}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ticket.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">${ticket.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      ticket.status === 'Issued' ? 'bg-green-100 text-green-700' :
                      ticket.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      ticket.status === 'Void' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <motion.button
                        className="text-blue-600 hover:text-blue-700 cursor-pointer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        title="View"
                      >
                        <Eye size={16} />
                      </motion.button>
                      <motion.button
                        className="text-green-600 hover:text-green-700 cursor-pointer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        title="Download"
                      >
                        <Download size={16} />
                      </motion.button>
                      <motion.button
                        className="text-red-600 hover:text-red-700 cursor-pointer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        title="Void"
                      >
                        <X size={16} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Tickets;