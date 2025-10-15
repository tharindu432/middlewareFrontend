import { useState } from 'react';
import { api } from '../../services/api';

const InvoiceDownload = () => {
  const [invoiceId, setInvoiceId] = useState('');

  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      const response = await api.downloadInvoice(invoiceId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice_${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Invoice download failed:', error);
    }
  };

  return (
    <div className="card mt-6">
      <h2 className="text-xl font-bold mb-4">Download Invoice</h2>
      <form onSubmit={handleDownload} className="space-y-4">
        <input
          type="text"
          placeholder="Invoice ID"
          value={invoiceId}
          onChange={(e) => setInvoiceId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="btn btn-primary">Download</button>
      </form>
    </div>
  );
};

export default InvoiceDownload;