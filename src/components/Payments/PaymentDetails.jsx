import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';

const PaymentDetails = () => {
  const { id } = useParams();
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.getPaymentDetails(id);
        setPayment(response.data);
      } catch (error) {
        console.error('Payment details fetch failed:', error);
      }
    };
    fetchDetails();
  }, [id]);

  if (!payment) return <div className="card">Loading...</div>;

  return (
    <div className="card mt-6">
      <h2 className="text-xl font-bold mb-4">Payment Details</h2>
      <p>Amount: ${payment.amount}</p>
      <p>Date: {payment.date}</p>
      <p>Method: {payment.method}</p>
    </div>
  );
};

export default PaymentDetails;