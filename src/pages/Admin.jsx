import { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/Common/PageLayout';
import { Shield, Users, CheckCircle, Clock, Activity, Eye, UserCheck, UserX } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const [pendingApprovals] = useState([
    { id: 1, name: 'Travel Pro Agency', email: 'info@travelpro.com', date: '2024-08-15', type: 'New Agent' },
    { id: 2, name: 'Global Tours', email: 'contact@globaltours.com', date: '2024-08-14', type: 'New Agent' },
  ]);

  const [systemLogs] = useState([
    { id: 1, action: 'User Login', user: 'admin@fitsair.com', timestamp: '2024-08-15 10:30:00', status: 'Success' },
    { id: 2, action: 'Agent Approved', user: 'admin@fitsair.com', timestamp: '2024-08-15 09:15:00', status: 'Success' },
    { id: 3, action: 'Failed Login Attempt', user: 'unknown@test.com', timestamp: '2024-08-15 08:45:00', status: 'Failed' },
  ]);

  const stats = [
    { label: 'Total Users', value: '156', icon: Users, color: 'bg-blue-600' },
    { label: 'Active Agents', value: '42', icon: CheckCircle, color: 'bg-green-600' },
    { label: 'Pending Approvals', value: pendingApprovals.length, icon: Clock, color: 'bg-yellow-600' },
    { label: 'System Health', value: '98%', icon: Activity, color: 'bg-purple-600' },
  ];

  return (
    <PageLayout
      title="Admin Dashboard"
      subtitle="Manage users, agents, and system settings"
      actions={
        <div className="flex items-center gap-2">
          <motion.button
            className="btn btn-outline flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Activity size={18} />
            <span>System Logs</span>
          </motion.button>
          <motion.button
            className="btn btn-primary flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Shield size={18} />
            <span>Security Settings</span>
          </motion.button>
        </div>
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

      {/* Tabs */}
      <motion.div
        className="card p-2 mb-6 inline-flex rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {['overview', 'approvals', 'logs'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-lg font-medium capitalize transition-all ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* Pending Approvals */}
      {activeTab === 'approvals' && (
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="card-header">
            <h3 className="card-title">Pending Agent Approvals</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="table-clean">
              <thead>
                <tr>
                  <th>Agent Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Submitted Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingApprovals.map((approval) => (
                  <tr key={approval.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {approval.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{approval.name}</span>
                      </div>
                    </td>
                    <td className="text-gray-600">{approval.email}</td>
                    <td>
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                        {approval.type}
                      </span>
                    </td>
                    <td className="text-gray-600">{approval.date}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="View">
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 text-green-600 hover:bg-green-50 rounded" title="Approve">
                          <UserCheck size={16} />
                        </button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Reject">
                          <UserX size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* System Logs */}
      {activeTab === 'logs' && (
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="card-header">
            <h3 className="card-title">Recent System Activity</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="table-clean">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>User</th>
                  <th>Timestamp</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {systemLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="font-medium text-gray-900">{log.action}</td>
                    <td className="text-gray-600">{log.user}</td>
                    <td className="text-gray-600">{log.timestamp}</td>
                    <td>
                      <span className={log.status === 'Success' ? 'status-confirmed' : 'status-cancelled'}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="card-header">
              <h3 className="card-title">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Approve Pending Agents', count: pendingApprovals.length, color: 'text-yellow-600' },
                { label: 'Review System Logs', count: systemLogs.length, color: 'text-blue-600' },
                { label: 'Manage User Roles', count: 5, color: 'text-purple-600' },
                { label: 'System Backups', count: 3, color: 'text-green-600' },
              ].map((action) => (
                <button
                  key={action.label}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="font-medium text-gray-900">{action.label}</span>
                  <span className={`font-bold ${action.color}`}>{action.count}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="card-header">
              <h3 className="card-title">System Status</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: 'API Server', status: 'Operational', color: 'bg-green-500' },
                { label: 'Database', status: 'Operational', color: 'bg-green-500' },
                { label: 'Payment Gateway', status: 'Operational', color: 'bg-green-500' },
                { label: 'Email Service', status: 'Degraded', color: 'bg-yellow-500' },
              ].map((service) => (
                <div key={service.label} className="flex items-center justify-between">
                  <span className="text-gray-900 font-medium">{service.label}</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${service.color}`}></div>
                    <span className="text-sm text-gray-600">{service.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </PageLayout>
  );
};

export default Admin;