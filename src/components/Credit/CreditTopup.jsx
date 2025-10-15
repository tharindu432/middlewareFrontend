import { useState } from 'react';
import { api } from '../../services/api';

const CreditTopup = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('BANK_TRANSFER');
  const [referenceNumber, setReferenceNumber] = useState('');

  const handleTopup = async (e) => {
    e.preventDefault();
    try {
      await api.topupCredit({ amount: Number(amount), paymentMethod, referenceNumber });
      alert('Credit topped up successfully!');
      setAmount('');
      setReferenceNumber('');
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
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="BANK_TRANSFER">Bank Transfer</option>
          <option value="CREDIT_CARD">Credit Card</option>
        </select>
        <input
          type="text"
          placeholder="Reference Number"
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="btn btn-primary">Top Up</button>
      </form>
    </div>
  );
};

export default CreditTopup;