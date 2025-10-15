import { motion } from 'framer-motion';
import { useState } from 'react';
import { Ticket } from 'lucide-react';
import TicketList from '../components/Tickets/TicketList';
import TicketIssue from '../components/Tickets/TicketIssue';
import TicketVoid from '../components/Tickets/TicketVoid';
import TicketRefund from '../components/Tickets/TicketRefund';

const Tickets = () => {
  const [activeTab, setActiveTab] = useState('all');

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

      {/* Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <TicketIssue />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TicketVoid />
          <TicketRefund />
        </div>
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
      <TicketList />
    </motion.div>
  );
};

export default Tickets;