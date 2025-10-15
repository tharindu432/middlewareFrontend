import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const CreditBalance = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await api.getCreditBalance();
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Credit balance fetch failed:', error);
      }
    };
    fetchBalance();
  }, []);

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Credit Balance</h2>
      <p className="text-2xl font-bold">${balance}</p>
    </div>
  );
};

export default CreditBalance;