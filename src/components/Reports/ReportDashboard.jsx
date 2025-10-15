import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const ReportDashboard = () => {
  const [reports, setReports] = useState({ sales: 0, bookings: 0, financial: 0, performance: 0 });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [sales, bookings, financial, performance] = await Promise.all([
          api.getSalesReport({ date: '2025-10-14' }),
          api.getBookingsReport({ date: '2025-10-14' }),
          api.getFinancialReport({ date: '2025-10-14' }),
          api.getPerformanceReport({ date: '2025-10-14' }),
        ]);
        setReports({
          sales: sales.data.total || 0,
          bookings: bookings.data.count || 0,
          financial: financial.data.total || 0,
          performance: performance.data.score || 0,
        });
      } catch (error) {
        console.error('Report dashboard fetch failed:', error);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Report Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 border rounded">Sales: ${reports.sales}</div>
        <div className="p-4 border rounded">Bookings: {reports.bookings}</div>
        <div className="p-4 border rounded">Financial: ${reports.financial}</div>
        <div className="p-4 border rounded">Performance: {reports.performance}%</div>
      </div>
    </div>
  );
};

export default ReportDashboard;