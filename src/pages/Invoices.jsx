import { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/Common/PageLayout';
import { Plus, FileText, CheckCircle, Clock, Download, Eye, Search } from 'lucide-react';

const Invoices = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [invoices] = useState([
    { id: 'INV-001', customer: 'John Doe', amount: 1250, date: '2024-08-15', dueDate: '2024-09-15', status: 'Paid' },
    { id: 'INV-002', customer: 'Jane Smith', amount: 890, date: '2024-08-14', dueDate: '2024-09-14', status: 'Pending' },
    { id: 'INV-003', customer: 'Bob Johnson', amount: 2100, date: '2024-08-13', dueDate: '2024-09-13', status: 'Paid' },
    { id: 'INV-004', customer: 'Alice Brown', amount: 675, date: '2024-08-12', dueDate: '2024-09-12', status: 'Overdue' },
  ]);

  const stats = [
    { label: 'Total Invoices', value: invoices.length, icon: FileText, color: 'bg-blue-600' },
    { label: 'Paid', value: invoices.filter(i => i.status === 'Paid').length, icon: CheckCircle, color: 'bg-green-600' },
    { label: 'Pending', value: invoices.filter(i => i.status === 'Pending').length, icon: Clock, color: 'bg-yellow-600' },
    { label: 'Total Amount', value: `$${invoices.reduce((sum, i) => sum + i.amount, 0)}`, icon: FileText, color: 'bg-purple-600' },
  ];

  const filteredInvoices = invoices.filter(invoice =>
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout
      title="Invoice Management"
      subtitle="Create and manage customer invoices"
      actions={
        <motion.button
          className="btn btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={18} />
          <span>Create Invoice</span>
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
            placeholder="Search invoices by ID or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </motion.div>

      {/* Invoice Table */}
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
                <th>Invoice ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>
                    <span className="font-semibold text-blue-600">{invoice.id}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {invoice.customer.charAt(0)}
                      </div>
                      <span className="text-gray-900">{invoice.customer}</span>
                    </div>
                  </td>
                  <td className="font-bold text-gray-900">${invoice.amount}</td>
                  <td className="text-gray-600">{invoice.date}</td>
                  <td className="text-gray-600">{invoice.dueDate}</td>
                  <td>
                    <span className={
                      invoice.status === 'Paid' ? 'status-confirmed' :
                      invoice.status === 'Pending' ? 'status-pending' :
                      'status-cancelled'
                    }>
                      {invoice.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="View">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 text-green-600 hover:bg-green-50 rounded" title="Download">
                        <Download size={16} />
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

export default Invoices;