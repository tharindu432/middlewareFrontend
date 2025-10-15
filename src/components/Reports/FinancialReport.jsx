import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const FinancialReport = () => {
  const [financials, setFinancials] = useState([]);

  useEffect(() => {
    const fetchFinancials = async () => {
      try {
        const response = await api.getFinancialReport({ date: '2025-10-14' });
        setFinancials(response.data.items || []);
      } catch (error) {
        console.error('Financial report fetch failed:', error);
      }
    };
    fetchFinancials();
  }, []);

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Financial Report</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">ID</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {financials.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{item.id}</td>
              <td className="py-2">${item.amount}</td>
              <td className="py-2">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialReport;