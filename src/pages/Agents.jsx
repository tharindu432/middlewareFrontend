import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Plus, Users, CheckCircle, Clock, DollarSign, Mail, Phone, Edit2, Star } from 'lucide-react';
import { api } from '../services/api';

const Agents = () => {
  const role = localStorage.getItem('role') || 'ADMIN';
  const [showCreate, setShowCreate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createData, setCreateData] = useState({ name: '', email: '', password: '', phone: '', role: (localStorage.getItem('role') || 'ADMIN') === 'ADMIN' ? 'AGENT_MANAGER' : 'AGENT_USER' });
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = role === 'ADMIN' ? await api.getAgents() : await api.getAgentUsers();
        setAgents(res.data || []);
      } catch (err) {
        console.error('Failed to load agents:', err);
      }
    };
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (role === 'ADMIN') {
        await api.createAgent(createData);
      } else {
        await api.createAgentUser({ ...createData, role: 'AGENT_USER' });
      }
      const res = role === 'ADMIN' ? await api.getAgents() : await api.getAgentUsers();
      setAgents(res.data || []);
      alert('Created successfully');
      setShowCreate(false);
      setCreateData({ name: '', email: '', password: '', phone: '', role: role === 'ADMIN' ? 'AGENT_MANAGER' : 'AGENT_USER' });
    } catch (error) {
      console.error('Create agent failed:', error);
      alert(error?.response?.data?.message || 'Failed to create agent');
    } finally {
      setIsSubmitting(false);
    }
  };

  // const dummyAgents = [
  //   { id: 1, name: 'Travel Pro Agency', email: 'info@travelpro.com', phone: '+1234567890', status: 'Active', bookings: 145, revenue: 45000, rating: 4.8 },
  //   { id: 2, name: 'Global Tours', email: 'contact@globaltours.com', phone: '+1234567891', status: 'Active', bookings: 98, revenue: 32000, rating: 4.5 },
  //   { id: 3, name: 'Sky Travelers', email: 'hello@skytravelers.com', phone: '+1234567892', status: 'Pending', bookings: 12, revenue: 5000, rating: 4.2 },
  //   { id: 4, name: 'Adventure Seekers', email: 'info@adventure.com', phone: '+1234567893', status: 'Inactive', bookings: 67, revenue: 18000, rating: 4.6 },
  // ];

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{role === 'ADMIN' ? 'Agent Management' : 'My Users'}</h1>
          <p className="text-gray-600">Manage travel agents and partners</p>
        </div>
        <motion.button
          className="btn btn-primary flex items-center gap-2 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreate(true)}
        >
          <Plus size={18} />
          <span>{role === 'ADMIN' ? 'Add Agent' : 'Add User'}</span>
        </motion.button>
      </motion.div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Agents', value: agents.length, icon: Users, color: 'bg-blue-600' },
          { label: 'Active', value: agents.filter(a => (a.status || (a.isActive ? 'Active' : 'Inactive')) === 'Active').length, icon: CheckCircle, color: 'bg-green-600' },
          { label: 'Pending', value: agents.filter(a => a.status === 'Pending').length, icon: Clock, color: 'bg-yellow-600' },
          { label: 'Total Revenue', value: '$100K', icon: DollarSign, color: 'bg-purple-600' },
        ].map((stat, index) => (
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

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            className="glass-card-light p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            {/* Agent Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {(agent.name || agent.companyName || `${agent.firstName || ''} ${agent.lastName || ''}`.trim() || 'A').charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{agent.name || agent.companyName || `${agent.firstName || ''} ${agent.lastName || ''}`.trim() || 'Agent'}</h3>
                <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: Math.floor(agent.rating ?? 4) }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">{agent.rating ?? 4}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                ((agent.status ?? (agent.isActive ? 'Active' : 'Inactive')) === 'Active') ? 'bg-green-100 text-green-700' :
                ((agent.status ?? (agent.isActive ? 'Active' : 'Inactive')) === 'Pending') ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {agent.status ?? (agent.isActive ? 'Active' : 'Inactive') ?? 'Active'}
              </span>
            </div>

            {/* Agent Details */}
            <div className="space-y-2 mb-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>{agent.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>{agent.phone || '-'}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs text-gray-600">Bookings</p>
                <p className="text-lg font-bold text-gray-900">{agent.bookings ?? 0}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Revenue</p>
                <p className="text-lg font-bold text-gray-900">${Number(agent.revenue ?? 0).toLocaleString()}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <motion.button
                className="btn btn-primary flex-1 text-sm py-2 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Profile
              </motion.button>
              <motion.button
                className="btn btn-outline px-4 py-2 text-sm shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit2 size={16} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {showCreate && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="card w-full max-w-lg p-6 animate-slide-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Agent</h3>
              <button className="btn btn-ghost" onClick={() => setShowCreate(false)}>Close</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Agency Name"
                  value={createData.name}
                  onChange={(e) => setCreateData({ ...createData, name: e.target.value })}
                  className="input-field"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={createData.email}
                  onChange={(e) => setCreateData({ ...createData, email: e.target.value })}
                  className="input-field"
                  required
                />
                <input
                  type="password"
                  placeholder="Temporary Password"
                  value={createData.password}
                  onChange={(e) => setCreateData({ ...createData, password: e.target.value })}
                  className="input-field"
                  required
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={createData.phone}
                  onChange={(e) => setCreateData({ ...createData, phone: e.target.value })}
                  className="input-field"
                />
                {role === 'ADMIN' && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    value={createData.role}
                    onChange={(e) => setCreateData({ ...createData, role: e.target.value })}
                    className="input-field"
                  >
                    <option value="AGENT_MANAGER">AGENT_MANAGER</option>
                    <option value="AGENT_USER">AGENT_USER</option>
                  </select>
                </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" className="btn btn-outline" onClick={() => setShowCreate(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Agents;