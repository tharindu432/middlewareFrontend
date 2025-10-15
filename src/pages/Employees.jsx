import { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/Common/PageLayout';
import { Plus, Users, CheckCircle, XCircle, Search } from 'lucide-react';

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [employees] = useState([
    { id: 1, name: 'John Doe', email: 'john@fitsair.com', role: 'Manager', status: 'Active', department: 'Operations' },
    { id: 2, name: 'Jane Smith', email: 'jane@fitsair.com', role: 'Agent', status: 'Active', department: 'Sales' },
    { id: 3, name: 'Bob Johnson', email: 'bob@fitsair.com', role: 'Support', status: 'Inactive', department: 'Customer Service' },
    { id: 4, name: 'Alice Brown', email: 'alice@fitsair.com', role: 'Developer', status: 'Active', department: 'IT' },
  ]);

  const stats = [
    { label: 'Total Employees', value: employees.length, icon: Users, color: 'bg-blue-600' },
    { label: 'Active', value: employees.filter(e => e.status === 'Active').length, icon: CheckCircle, color: 'bg-green-600' },
    { label: 'Inactive', value: employees.filter(e => e.status === 'Inactive').length, icon: XCircle, color: 'bg-red-600' },
  ];

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout
      title="Employee Management"
      subtitle="Manage your team members and their roles"
      actions={
        <motion.button
          className="btn btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={18} />
          <span>Add Employee</span>
        </motion.button>
      }
    >
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
        transition={{ delay: 0.3 }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search employees by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </motion.div>

      {/* Employee Table */}
      <motion.div
        className="card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="overflow-x-auto">
          <table className="table-clean">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {employee.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{employee.name}</span>
                    </div>
                  </td>
                  <td className="text-gray-600">{employee.email}</td>
                  <td>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                      {employee.role}
                    </span>
                  </td>
                  <td className="text-gray-600">{employee.department}</td>
                  <td>
                    <span className={employee.status === 'Active' ? 'status-confirmed' : 'status-cancelled'}>
                      {employee.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                        Remove
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

export default Employees;