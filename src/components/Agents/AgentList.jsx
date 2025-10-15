import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const AgentList = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await api.getAgents();
        setAgents(response.data);
      } catch (error) {
        console.error('Agent list fetch failed:', error);
      }
    };
    fetchAgents();
  }, []);

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Agent List</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{agent.id}</td>
              <td className="py-2">{agent.name}</td>
              <td className="py-2">{agent.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentList;