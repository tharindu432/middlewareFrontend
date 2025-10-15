import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const CreditHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.getCreditHistory();
        setHistory(response.data);
      } catch (error) {
        console.error('Credit history fetch failed:', error);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Credit History</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">ID</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
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

export default CreditHistory;