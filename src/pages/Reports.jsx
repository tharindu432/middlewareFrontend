import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { motion } from 'framer-motion';
import Loader from '../components/Common/Loader';
import { TrendingUp, Calendar, DollarSign } from 'lucide-react';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const [sales, bookings, financial] = await Promise.all([
          api.getSalesReport(),
          api.getBookingsReport(),
          api.getFinancialReport(),
        ]);
        setReports([
          { type: 'Sales', data: sales.data },
          { type: 'Bookings', data: bookings.data },
          { type: 'Financial', data: financial.data },
        ]);
      } catch (error) {
        console.error('Reports fetch failed:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) return <Loader />;

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((report, index) => (
          <motion.div
            key={report.type}
            className="summary-card flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
              {report.type === 'Sales' ? (
                <TrendingUp size={32} className="text-white" />
              ) : report.type === 'Bookings' ? (
                <Calendar size={32} className="text-white" />
              ) : (
                <DollarSign size={32} className="text-white" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{report.type}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-2">
              ${report.data.total || report.data.count * 100 || 0}
            </p>
            <p className="text-sm text-gray-600">Updated: {new Date().toLocaleDateString()}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Reports;