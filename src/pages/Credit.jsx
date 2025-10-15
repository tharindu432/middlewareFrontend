import {motion} from "framer-motion";
import { useState } from 'react';
import { CreditCard, Zap, BarChart3 } from 'lucide-react';

const Credit = () => {
  const [amount, setAmount] = useState('');

  const transactions = [
    { id: 1, type: 'Top-up', amount: 5000, date: '2024-08-15', status: 'Completed', method: 'Credit Card' },
    { id: 2, type: 'Usage', amount: -350, date: '2024-08-14', status: 'Completed', method: 'Booking' },
    { id: 3, type: 'Usage', amount: -280, date: '2024-08-13', status: 'Completed', method: 'Booking' },
    { id: 4, type: 'Top-up', amount: 3000, date: '2024-08-12', status: 'Completed', method: 'Bank Transfer' },
    { id: 5, type: 'Refund', amount: 420, date: '2024-08-11', status: 'Completed', method: 'Booking Cancellation' },
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
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Credit Management</h1>
        <p className="text-gray-600">Manage your credit balance and transactions</p>
      </motion.div>

      {/* Credit Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Balance Card */}
        <motion.div
          className="lg:col-span-2 relative overflow-hidden rounded-3xl p-8 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-white/80 text-sm mb-1">Available Credit</p>
                <h2 className="text-5xl font-bold text-white">$50,000</h2>
              </div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <CreditCard size={32} className="text-white" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-white/60 text-xs mb-1">Used This Month</p>
                <p className="text-white text-lg font-semibold">$12,450</p>
              </div>
              <div>
                <p className="text-white/60 text-xs mb-1">Credit Limit</p>
                <p className="text-white text-lg font-semibold">$100,000</p>
              </div>
              <div>
                <p className="text-white/60 text-xs mb-1">Next Billing</p>
                <p className="text-white text-lg font-semibold">Aug 31</p>
              </div>
            </div>

            <div className="flex gap-3">
              <motion.button
                className="btn bg-white text-purple-600 hover:bg-gray-100 flex-1 shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Top Up Credit
              </motion.button>
              <motion.button
                className="btn bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Details
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Quick Top-up */}
        <motion.div
          className="glass-card-light p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap size={20} className="text-blue-600" />
            Quick Top-up
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-field-light"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[1000, 2500, 5000, 10000].map((preset) => (
                <motion.button
                  key={preset}
                  onClick={() => setAmount(preset.toString())}
                  className="p-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors cursor-pointer shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ${preset.toLocaleString()}
                </motion.button>
              ))}
            </div>
            <motion.button
              className="btn btn-primary w-full shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add Credit →
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Transaction History */}
      <motion.div
        className="glass-card-light p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 size={24} className="text-blue-600" />
            Transaction History
          </h3>
          <motion.button
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            View All →
          </motion.button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Method</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {transactions.map((transaction, index) => (
                <motion.tr
                  key={transaction.id}
                  className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      transaction.type === 'Top-up' ? 'bg-green-100 text-green-700' :
                      transaction.type === 'Refund' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{transaction.method}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-bold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="status-confirmed">{transaction.status}</span>
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

export default Credit;