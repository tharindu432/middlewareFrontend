import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.getAdminLogs();
        setLogs(response.data);
      } catch (error) {
        console.error('Admin logs fetch failed:', error);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Admin Logs</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">ID</th>
            <th className="py-2">Action</th>
            <th className="py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{log.id}</td>
              <td className="py-2">{log.action}</td>
              <td className="py-2">{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLogs;