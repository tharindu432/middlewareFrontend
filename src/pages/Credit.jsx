import {motion} from "framer-motion";
import { useEffect, useState } from 'react';
import { CreditCard, Zap, BarChart3 } from 'lucide-react';
import CreditBalance from '../components/Credit/CreditBalance';
import CreditTransactions from '../components/Credit/CreditTransactions';
import CreditTopup from '../components/Credit/CreditTopup';
import CreditHistory from '../components/Credit/CreditHistory';
import { api } from '../services/api';

const Credit = () => {
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [quickLoading, setQuickLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.getCreditBalance();
        setBalance(res?.data?.data ?? res?.data?.balance ?? 0);
      } catch (e) {
        console.error('Failed to load balance', e);
      }
    };
    load();
  }, []);

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
                <h2 className="text-5xl font-bold text-white">${Number(balance).toLocaleString()}</h2>
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
              disabled={quickLoading || !amount}
              onClick={async () => { try { setQuickLoading(true); await api.topupCredit({ amount: Number(amount) }); setAmount(''); const res = await api.getCreditBalance(); setBalance(res?.data?.data ?? res?.data?.balance ?? 0); } catch (e) { alert('Topup failed'); } finally { setQuickLoading(false);} }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {quickLoading ? 'Processing...' : 'Add Credit →'}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <CreditTransactions />
        <CreditHistory />
      </div>

      {/* Legacy demo table replaced by widgets above */}
      <motion.div
        className="glass-card-light p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <CreditBalance />
      </motion.div>
    </motion.div>
  );
};

export default Credit;