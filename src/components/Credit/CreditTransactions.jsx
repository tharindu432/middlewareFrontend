import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const CreditTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.getCreditTransactions();
        setTransactions(response.data);
      } catch (error) {
        console.error('Credit transactions fetch failed:', error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Credit Transactions</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">ID</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{transaction.id}</td>
              <td className="py-2">${transaction.amount}</td>
              <td className="py-2">{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreditTransactions;