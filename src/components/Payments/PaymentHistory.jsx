import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const PaymentHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.getPaymentHistory();
        setHistory(response.data);
      } catch (error) {
        console.error('Payment history fetch failed:', error);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Payment History</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">ID</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((payment) => (
            <tr key={payment.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{payment.id}</td>
              <td className="py-2">${payment.amount}</td>
              <td className="py-2">{payment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;