import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const SalesReport = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await api.getSalesReport({ date: '2025-10-14' });
        setSales(response.data.items || []);
      } catch (error) {
        console.error('Sales report fetch failed:', error);
      }
    };
    fetchSales();
  }, []);

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Sales Report</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">ID</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{sale.id}</td>
              <td className="py-2">${sale.amount}</td>
              <td className="py-2">{sale.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;