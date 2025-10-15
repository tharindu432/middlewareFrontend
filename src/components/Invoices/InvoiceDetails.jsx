import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';

const InvoiceDetails = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.getInvoiceDetails(id);
        setInvoice(response.data);
      } catch (error) {
        console.error('Invoice details fetch failed:', error);
      }
    };
    fetchDetails();
  }, [id]);

  if (!invoice) return <div className="card">Loading...</div>;

  return (
    <div className="card mt-6">
      <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
      <p>Amount: ${invoice.amount}</p>
      <p>Date: {invoice.date}</p>
      <p>Status: {invoice.status}</p>
    </div>
  );
};

export default InvoiceDetails;