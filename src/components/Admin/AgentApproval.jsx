import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const AgentApproval = () => {
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        // Assuming approvals list is part of admin dashboard or a dedicated endpoint.
        // If you have a backend endpoint, replace with that directly.
        const dashboard = await api.getAdminDashboard();
        const list = dashboard?.data?.approvals || [];
        setApprovals(list);
      } catch (error) {
        console.error('Agent approvals fetch failed:', error);
      }
    };
    fetchApprovals();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.updateAgentAdmin(id, { status: 'approved' });
      setApprovals(approvals.filter(approval => approval.id !== id));
      alert('Agent approved successfully!');
    } catch (error) {
      console.error('Agent approval failed:', error);
    }
  };

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Agent Approvals</h2>
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
          {approvals.map((approval) => (
            <tr key={approval.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{approval.id}</td>
              <td className="py-2">{approval.name}</td>
              <td className="py-2">{approval.email}</td>
              <td className="py-2">
                <button onClick={() => handleApprove(approval.id)} className="btn btn-primary">Approve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentApproval;