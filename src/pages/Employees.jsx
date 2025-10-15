import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/Common/PageLayout';
import { Plus, Users, CheckCircle, XCircle, Search } from 'lucide-react';
import EmployeeActions from '../components/Employees/EmployeeActions';
import EmployeeForm from '../components/Employees/EmployeeForm';
import EmployeeList from '../components/Employees/EmployeeList';
import EmployeeDeactivate from '../components/Employees/EmployeeDeactivate';
import EmployeeResetPassword from '../components/Employees/EmployeeResetPassword';
import { api } from '../services/api';

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.getEmployees();
      const list = Array.isArray(res.data) ? res.data : (res.data?.items || []);
      setEmployees(list);
    } catch (e) {
      console.error('Failed to load employees', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const stats = [
    { label: 'Total Employees', value: employees.length, icon: Users, color: 'bg-blue-600' },
    { label: 'Active', value: employees.filter(e => (e.status || (e.isActive ? 'Active' : 'Inactive')) === 'Active').length, icon: CheckCircle, color: 'bg-green-600' },
    { label: 'Inactive', value: employees.filter(e => (e.status || (e.isActive ? 'Active' : 'Inactive')) === 'Inactive').length, icon: XCircle, color: 'bg-red-600' },
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
      actions={<EmployeeActions onChanged={load} />}
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

      {/* Employee List Only */}
      <motion.div
        className="card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <EmployeeList searchQuery={searchQuery} />
      </motion.div>
    </PageLayout>
  );
};

export default Employees;