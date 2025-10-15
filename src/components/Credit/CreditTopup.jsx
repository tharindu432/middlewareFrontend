import { useState } from 'react';
import { api } from '../../services/api';

const CreditTopup = () => {
  const [amount, setAmount] = useState('');

  const handleTopup = async (e) => {
    e.preventDefault();
    try {
      await api.topupCredit({ amount });
      alert('Credit topped up successfully!');
    } catch (error) {
      console.error('Credit topup failed:', error);
    }
  };

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Top Up Credit</h2>
      <form onSubmit={handleTopup} className="space-y-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="btn btn-primary">Top Up</button>
      </form>
    </div>
  );
};

export default CreditTopup;