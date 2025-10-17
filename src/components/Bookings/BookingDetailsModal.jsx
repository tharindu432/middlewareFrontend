import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const BookingDetailsModal = ({ open, onClose, bookingId }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!open || !bookingId) return;
      setLoading(true);
      try {
        const res = await api.getBooking(bookingId);
        setDetails(res.data || res);
      } catch (e) {
        console.error('Load booking details failed', e);
      } finally { setLoading(false); }
    };
    load();
  }, [open, bookingId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
        {loading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : details ? (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Booking ID</p>
                <p className="font-semibold">{details.id || details.bookingId}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className="font-semibold">{details.status || '—'}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Customer Email</p>
                <p className="font-semibold">{details.contactEmail || details.contact?.email || '—'}</p>
              </div>
              <div>
                <p className="text-gray-500">Route</p>
                <p className="font-semibold">{details.route || `${details.origin || ''} - ${details.destination || ''}`}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-500">Passengers</p>
              <ul className="list-disc pl-5">
                {(details.passengers || []).map((p, i) => (
                  <li key={i}>{p.firstName} {p.lastName}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No details found</p>
        )}
      </div>
    </div>
  );
};

export default BookingDetailsModal;
