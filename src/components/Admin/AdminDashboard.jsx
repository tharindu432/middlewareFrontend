import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState({ agents: 0, approvals: 0, logs: 0 });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [agents, dashboardRes, logs] = await Promise.all([
          api.getAgents(),
          api.getAdminDashboard(),
          api.getAdminLogs(),
        ]);
        const pending = dashboardRes?.data?.pendingApprovals || dashboardRes?.data?.approvals || 0;
        setDashboard({
          agents: agents.data.length || 0,
          approvals: Array.isArray(pending) ? pending.length : Number(pending) || 0,
          logs: logs.data.length || 0,
        });
      } catch (error) {
        console.error('Admin dashboard fetch failed:', error);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded">Agents: {dashboard.agents}</div>
        <div className="p-4 border rounded">Approvals: {dashboard.approvals}</div>
        <div className="p-4 border rounded">Logs: {dashboard.logs}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;