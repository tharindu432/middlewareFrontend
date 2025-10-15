import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const AgentManagement = () => {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [createData, setCreateData] = useState({ name: '', email: '', password: '', phone: '', role: 'AGENT_MANAGER' });

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await api.getAgents();
        setAgents(response.data);
      } catch (error) {
        console.error('Agent management fetch failed:', error);
      }
    };
    fetchAgents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.deleteAgent(id);
      setAgents(agents.filter(agent => agent.id !== id));
      alert('Agent deleted successfully!');
    } catch (error) {
      console.error('Agent delete failed:', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.createAgent(createData);
      // Refresh list after creation
      const response = await api.getAgents();
      setAgents(response.data);
      setCreateData({ name: '', email: '', password: '', phone: '', role: 'AGENT_MANAGER' });
      alert('Agent created successfully!');
    } catch (error) {
      console.error('Agent create failed:', error);
      alert(error?.response?.data?.message || 'Failed to create agent');
    }
  };

  return (
    <>
      <div className="card mb-6">
        <h2 className="text-xl font-bold mb-4">Create Agent</h2>
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
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">Create Agent</button>
          </div>
        </form>
      </div>

      <div className="card mb-6">
        <h2 className="text-xl font-bold mb-4">Agent Management</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{agent.id}</td>
              <td className="py-2">{agent.name}</td>
              <td className="py-2">{agent.email}</td>
              <td className="py-2">
                <button onClick={() => setSelectedAgent(agent)} className="btn btn-primary mr-2">Update</button>
                <button onClick={() => handleDelete(agent.id)} className="btn bg-red-600 hover:bg-red-700 text-white">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedAgent && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Update Agent</h3>
          {/* Update form can be expanded here */}
        </div>
      )}
    </div>
    </>
  );
};

export default AgentManagement;