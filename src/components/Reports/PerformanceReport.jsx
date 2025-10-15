import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const PerformanceReport = () => {
  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const response = await api.getPerformanceReport({ date: '2025-10-14' });
        setPerformance(response.data.items || []);
      } catch (error) {
        console.error('Performance report fetch failed:', error);
      }
    };
    fetchPerformance();
  }, []);

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Performance Report</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">ID</th>
            <th className="py-2">Score</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {performance.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{item.id}</td>
              <td className="py-2">{item.score}%</td>
              <td className="py-2">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PerformanceReport;