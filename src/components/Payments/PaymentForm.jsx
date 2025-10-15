import { useState } from 'react';
import { api } from '../../services/api';

const PaymentForm = () => {
  const [formData, setFormData] = useState({ amount: '', method: 'credit_card' });

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      await api.makePayment(formData);
      alert('Payment processed successfully!');
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Make Payment</h2>
      <form onSubmit={handlePayment} className="space-y-4">
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={formData.method}
          onChange={(e) => setFormData({ ...formData, method: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="credit_card">Credit Card</option>
          <option value="bank_transfer">Bank Transfer</option>
        </select>
        <button type="submit" className="btn btn-primary">Pay</button>
      </form>
    </div>
  );
};

export default PaymentForm;