import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await api.getInvoices();
        setInvoices(response.data);
      } catch (error) {
        console.error('Invoice list fetch failed:', error);
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Invoice List</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">ID</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{invoice.id}</td>
              <td className="py-2">${invoice.amount}</td>
              <td className="py-2">{invoice.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;