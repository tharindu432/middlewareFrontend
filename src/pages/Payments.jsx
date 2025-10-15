import { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/Common/PageLayout';
import { Plus, DollarSign, CheckCircle, Clock, XCircle, Search } from 'lucide-react';

const Payments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [payments] = useState([
    { id: 'PAY001', customer: 'John Doe', amount: 350, date: '2024-08-15', method: 'Credit Card', status: 'Completed' },
    { id: 'PAY002', customer: 'Jane Smith', amount: 280, date: '2024-08-14', method: 'Bank Transfer', status: 'Completed' },
    { id: 'PAY003', customer: 'Bob Johnson', amount: 420, date: '2024-08-13', method: 'PayPal', status: 'Pending' },
    { id: 'PAY004', customer: 'Alice Brown', amount: 315, date: '2024-08-12', method: 'Credit Card', status: 'Failed' },
  ]);

  const stats = [
    { label: 'Total Payments', value: `$${payments.reduce((sum, p) => sum + p.amount, 0)}`, icon: DollarSign, color: 'bg-blue-600' },
    { label: 'Completed', value: payments.filter(p => p.status === 'Completed').length, icon: CheckCircle, color: 'bg-green-600' },
    { label: 'Pending', value: payments.filter(p => p.status === 'Pending').length, icon: Clock, color: 'bg-yellow-600' },
    { label: 'Failed', value: payments.filter(p => p.status === 'Failed').length, icon: XCircle, color: 'bg-red-600' },
  ];

  const filteredPayments = payments.filter(payment =>
    payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.method.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout
      title="Payment Management"
      subtitle="Track and manage all payment transactions"
      actions={
        <motion.button
          className="btn btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={18} />
          <span>New Payment</span>
        </motion.button>
      }
    >
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
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

      {/* Search */}
      <motion.div
        className="card p-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search payments by ID, customer, or method..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </motion.div>

      {/* Payment Table */}
      <motion.div
        className="card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="overflow-x-auto">
          <table className="table-clean">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Method</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>
                    <span className="font-semibold text-blue-600">{payment.id}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {payment.customer.charAt(0)}
                      </div>
                      <span className="text-gray-900">{payment.customer}</span>
                    </div>
                  </td>
                  <td className="font-bold text-gray-900">${payment.amount}</td>
                  <td className="text-gray-600">{payment.date}</td>
                  <td>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                      {payment.method}
                    </span>
                  </td>
                  <td>
                    <span className={
                      payment.status === 'Completed' ? 'status-confirmed' :
                      payment.status === 'Pending' ? 'status-pending' :
                      'status-cancelled'
                    }>
                      {payment.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 font-medium text-sm">
                        Receipt
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Payments;